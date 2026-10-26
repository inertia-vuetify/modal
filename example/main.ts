import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createInertiaApp } from '@inertiajs/vue3'
import { createApp, type DefineComponent } from 'vue'
import { createVuetify } from 'vuetify'
import { renderApp } from '../src'
import { initialPage, server } from './server'

const pages = import.meta.glob<DefineComponent>('./pages/*.vue', { eager: true, import: 'default' })

createInertiaApp({
    page: await initialPage(),
    http: server,
    resolve: (name) => pages[`./pages/${name}.vue`],
    setup({ el, App, props, plugin }) {
        createApp({ render: renderApp(App, props) })
            .use(plugin)
            .use(createVuetify({ theme: { defaultTheme: 'system' } }))
            .mount(el)
    },
})
