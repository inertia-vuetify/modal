import { HttpCancelledError, type HttpClient, type Page } from '@inertiajs/core'
import { http } from '@inertiajs/vue3'

// Stands in for a Laravel app with the inertiaui/modal package, so the demo runs as a static site.
// Responses mirror what Laravel sends, including the redirects after form submissions.

export interface User {
    id: number
    name: string
    email: string
    role: string
}

export interface Role {
    name: string
    description: string
}

type Props = Record<string, unknown>
type Errors = Record<string, string>

interface Route {
    component: string
    props?: Props
    deferred?: Record<string, () => Promise<unknown>>
    /** Makes it a modal route that renders over this URL when visited directly, like `Inertia::modal()->baseRoute()`. */
    baseUrl?: string
}

const version = '1'
const latency = 300

const roles: Role[] = [
    { name: 'Admin', description: 'Manages users and settings' },
    { name: 'Editor', description: 'Creates and edits content' },
    { name: 'Viewer', description: 'Reads content' },
]

const users: User[] = [
    { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'Admin' },
    { id: 2, name: 'Grace Hopper', email: 'grace@example.com', role: 'Editor' },
    { id: 3, name: 'Alan Turing', email: 'alan@example.com', role: 'Viewer' },
]

const modal = (component: string, props: Props = {}, deferred?: Route['deferred']): Route => ({ component, props, deferred, baseUrl: '/' })

const findUser = (id: number) => users.find((user) => user.id === id)

const pages: Record<string, (id: number) => Route | undefined> = {
    '/': () => ({ component: 'Home', props: { users } }),
    '/users/create': () => modal('UserForm'),
    '/users/{id}/edit': (id) => {
        const user = findUser(id)
        return user && modal('UserForm', { user })
    },
    '/roles': () => modal('PickRole', { roles }),
    '/stats': () =>
        modal(
            'Stats',
            { total: users.length, time: new Date().toLocaleTimeString() },
            {
                breakdown: async () => {
                    await sleep(1000)
                    return roles.map(({ name }) => ({ role: name, count: users.filter((user) => user.role === name).length }))
                },
            },
        ),
    '/preview': () => modal('Preview'),
    '/terms': () => modal('Terms'),
}

const actions: Record<string, (id: number, data: Partial<User>) => Errors> = {
    'POST /users': (_id, data) => saveUser(data),
    'PUT /users/{id}': (id, data) => saveUser(data, findUser(id)),
}

function saveUser(data: Partial<User>, user?: User): Errors {
    const errors: Errors = {}

    if (!data.name?.trim()) {
        errors.name = 'The name field is required.'
    }

    if (!data.email?.trim()) {
        errors.email = 'The email field is required.'
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.email = 'The email field must be a valid email address.'
    } else if (users.some(({ id, email }) => email === data.email && id !== user?.id)) {
        errors.email = 'The email has already been taken.'
    }

    if (!Object.keys(errors).length) {
        const values = { name: data.name!, email: data.email!, role: data.role ?? 'Viewer' }

        if (user) {
            Object.assign(user, values)
        } else {
            users.push({ id: Math.max(0, ...users.map(({ id }) => id)) + 1, ...values })
        }
    }

    return errors
}

function dispatch<T>(table: Record<string, (id: number, data: Partial<User>) => T>, key: string, data: Partial<User> = {}): T | undefined {
    for (const [pattern, handler] of Object.entries(table)) {
        const match = key.match(new RegExp(`^${pattern.replace('{id}', '(\\d+)')}$`))

        if (match) {
            return handler(Number(match[1]), data)
        }
    }
}

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, ms)

        signal?.addEventListener('abort', () => {
            clearTimeout(timeout)
            reject(new HttpCancelledError())
        })
    })
}

async function toPage(route: Route, url: URL, headers: Record<string, string>, errors: Errors) {
    const deferred = route.deferred ?? {}
    const only = headers['x-inertia-partial-component'] === route.component ? headers['x-inertia-partial-data']?.split(',') : undefined
    const props: Props = { errors, ...route.props }

    for (const key of only ?? []) {
        if (deferred[key]) {
            props[key] = await deferred[key]()
        }
    }

    return {
        component: route.component,
        props: only ? Object.fromEntries(Object.entries(props).filter(([key]) => key === 'errors' || only.includes(key))) : props,
        url: url.pathname + url.search,
        version,
        deferredProps: !only && Object.keys(deferred).length ? { default: Object.keys(deferred) } : undefined,
    }
}

async function render(url: URL, headers: Record<string, string>, errors: Errors = {}): Promise<Props> {
    const route = dispatch(pages, url.pathname)

    // Unknown URLs, like a created user's after a reload resets the data, land on the home page.
    if (!route) {
        return render(new URL('/', url), headers, errors)
    }

    const { deferredProps, ...page } = await toPage(route, url, headers, errors)

    if (!route.baseUrl) {
        return { ...page, deferredProps }
    }

    const modalPage = { ...page, meta: deferredProps ? { deferredProps } : {} }

    if (headers['x-inertiaui-modal']) {
        return modalPage
    }

    // Any other visit renders the base page with the modal in a prop, under the modal's URL.
    const header = headers['x-inertiaui-modal-base-url']
    const baseUrl = header && new URL(header).pathname !== url.pathname ? header : new URL(route.baseUrl, url).href
    const base = await render(new URL(baseUrl), headers, errors)

    return { ...base, props: { ...(base.props as Props), _inertiaui_modal: { ...modalPage, id: null, baseUrl } }, url: modalPage.url }
}

async function handle(method: string, url: URL, headers: Record<string, string>, data: unknown): Promise<Props> {
    if (method === 'get') {
        return render(url, headers)
    }

    const errors = dispatch(actions, `${method.toUpperCase()} ${url.pathname}`, data as Partial<User>) ?? {}

    // Laravel redirects failed validation to the previous URL, and back() to the modal's base URL.
    const redirect = Object.keys(errors).length ? location.href : headers['x-inertiaui-modal-base-url'] || location.href

    return render(new URL(redirect), headers, errors)
}

export const server: HttpClient = {
    async request(config) {
        const { method, url, headers = {}, data, signal } = await http.processRequest(config)
        const lowercaseHeaders = Object.fromEntries(Object.entries(headers).map(([key, value]) => [key.toLowerCase(), String(value)]))

        await sleep(latency, signal)
        const page = await handle(method, new URL(url, location.href), lowercaseHeaders, data)

        return http.processResponse({ status: 200, data: JSON.stringify(page), headers: { 'x-inertia': 'true' } })
    },
}

/** The page a full page load would embed in its HTML. */
export async function initialPage(): Promise<Page> {
    return JSON.parse(JSON.stringify(await render(new URL(location.href), {})))
}
