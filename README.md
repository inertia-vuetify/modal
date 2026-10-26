# @inertia-vuetify/modal

Open any Inertia.js route in a Vuetify modal, slideover, or bottom sheet without changing your routes or controllers. It works with the [`inertiaui/modal`](https://inertiaui.com/inertia-modal/docs) Laravel package and has the same API as its Vue frontend, [`@inertiaui/modal-vue`](https://github.com/inertiaui/modal), so switching is a matter of changing imports.

Try it in the [live demo](https://modal-ary.pages.dev).

## Features

- ✅ **Drop-in replacement** - Same API as `@inertiaui/modal-vue`, no Tailwind needed
- ✅ **Vuetify 4 styling** - `v-dialog`, `v-card` and your Vuetify theme, icons, locale and defaults
- ✅ **Zero backend configuration** - Works with existing Inertia.js routes
- ✅ **Modals, slideovers and bottom sheets** - Including fullscreen modals on phones
- ✅ **Card layout** - Title and actions that stay in place while the content scrolls
- ✅ **Unsaved-changes guard** - Veto closing with `before-close`
- ✅ **`ModalBtn`** - A Vuetify button that opens a modal and shows a loading state
- ✅ **Nested/stacked modals** - Covered modals are blurred and hidden from assistive technology
- ✅ **TypeScript** - Typed props, slots, events and exposed methods

## Installation

```bash
npm install @inertia-vuetify/modal
# or
bun add @inertia-vuetify/modal
```

### Requirements

This package requires these peer dependencies:

- `vue` ^3.5.0
- `vuetify` ^4.2.0
- `@inertiajs/vue3` ^3.0.0

On the Laravel side, install the [`inertiaui/modal`](https://inertiaui.com/inertia-modal/docs) package (3.x) with Inertia Laravel 3:

```bash
composer require inertiaui/modal
```

The close button uses Vuetify's `$close` icon alias, so it follows whichever icon set you configured (Material Design Icons by default).

The package ships as ESM only and does not need a stylesheet import.

## Quick Start

### 1. Configure Inertia.js

Mount your app with `renderApp`:

```js
import { createInertiaApp } from "@inertiajs/vue3";
import { renderApp } from "@inertia-vuetify/modal";
import { createApp } from "vue";
import { createVuetify } from "vuetify";

createInertiaApp({
  setup({ el, App, props, plugin }) {
    createApp({ render: renderApp(App, props) })
      .use(plugin)
      .use(createVuetify())
      .mount(el);
  },
});
```

### 2. Link to the modal

`ModalBtn` is a Vuetify button that opens a route in a modal. It accepts every `v-btn` and `ModalLink` prop, shows a loading spinner while the modal loads, and still opens a new tab on Ctrl/Cmd-click:

```vue
<script setup>
import { ModalBtn, ModalLink } from "@inertia-vuetify/modal";
</script>

<template>
  <ModalBtn href="/users/create" color="primary">Create User</ModalBtn>

  <!-- Or a plain link -->
  <ModalLink href="/users/create">Create User</ModalLink>
</template>
```

### 3. Wrap the page content with Modal

```vue
<script setup>
import { Modal } from "@inertia-vuetify/modal";
</script>

<template>
  <Modal title="Create User">
    <v-form id="create-user">
      <!-- Form fields -->
    </v-form>

    <template #actions="{ close }">
      <v-btn variant="text" @click="close">Cancel</v-btn>
      <v-btn type="submit" form="create-user" color="primary">Save</v-btn>
    </template>
  </Modal>
</template>
```

With a `title` or `#title` slot and an `#actions` slot, the header and actions stay in place while the content scrolls, and the dialog is labelled by its title. Without them, the content fills the card and the close button floats in the corner.

That's it! No backend changes needed.

## Usage Examples

### Slideovers and bottom sheets

```vue
<ModalBtn href="/settings" slideover>Settings</ModalBtn>
<ModalBtn href="/settings" slideover position="left">Settings</ModalBtn>
<ModalBtn href="/settings" slideover position="bottom">Settings</ModalBtn>
```

### Size, position and fullscreen

```vue
<ModalBtn href="/users/create" max-width="4xl">Create User</ModalBtn>
<ModalBtn href="/users/create" position="top">Create User</ModalBtn>
```

Centered modals turn fullscreen on phones (below Vuetify's `sm` breakpoint). Set `fullscreen` on the `Modal` to change that: `true`, `false`, a breakpoint name (`sm`, `md`, `lg`, `xl`, `xxl`) or pixel width to go fullscreen below, or `'mobile'` to follow your Vuetify `display.mobileBreakpoint`.

```vue
<Modal fullscreen="md">...</Modal>
```

### Unsaved changes

`before-close` runs before the close button, Escape, a backdrop click or `requestClose()` closes the modal. Return `false` (or a promise resolving to `false`) to keep it open; the dialog bounces to show the close was refused. `close()` skips the check, and so does the automatic close after a successful save:

```vue
<script setup>
import { Modal } from "@inertia-vuetify/modal";
import { useForm } from "@inertiajs/vue3";

const form = useForm({ name: "" });

const confirmDiscard = () => !form.isDirty || confirm("Discard your changes?");
</script>

<template>
  <Modal title="Edit" :before-close="confirmDiscard">
    <v-form id="edit" @submit.prevent="form.put('/users/1')">
      <v-text-field v-model="form.name" label="Name" :error-messages="form.errors.name" />
    </v-form>

    <template #actions="{ requestClose }">
      <v-btn variant="text" @click="requestClose">Cancel</v-btn>
      <v-btn type="submit" form="edit" color="primary">Save</v-btn>
    </template>
  </Modal>
</template>
```

When a form submission redirects back to the page under the modal, the modals close by themselves once the request finishes. Events emitted from the submission's `onSuccess` still reach their listeners.

### Local modal (no route required)

```vue
<script setup>
import { Modal, ModalBtn } from "@inertia-vuetify/modal";
</script>

<template>
  <ModalBtn href="#confirm-delete" color="error">Delete Item</ModalBtn>

  <Modal name="confirm-delete" title="Delete item?">
    <p>This cannot be undone.</p>

    <template #actions="{ close }">
      <v-btn variant="text" @click="close">Cancel</v-btn>
      <v-btn color="error" @click="deleteItem">Delete</v-btn>
    </template>
  </Modal>
</template>
```

Components rendered inside a modal can call `useModal()` to get the modal instance, including inside local modals.

### Programmatic usage

```js
import { visitModal } from "@inertia-vuetify/modal";

visitModal("/users/create", {
  config: { maxWidth: "lg", fullscreen: false },
  onClose: () => console.log("Modal closed"),
});
```

## Configuration

### Modal props

| Prop                     | Type                         | Default (modal / slideover) | Description                                                               |
| ------------------------ | ---------------------------- | --------------------------- | ------------------------------------------------------------------------- |
| `close-button`           | Boolean                      | `true`                      | Show the close button                                                     |
| `close-explicitly`       | Boolean                      | `false`                     | Only close via the close button or programmatically                       |
| `close-on-click-outside` | Boolean                      | `true`                      | Close when the backdrop is clicked                                        |
| `max-width`              | String                       | `'2xl'` / `'md'`            | Maximum width, see below                                                  |
| `padding-classes`        | String/Boolean               | `'pa-4 pa-sm-6'`            | Padding classes for the content; `false` removes padding                  |
| `panel-classes`          | String/Boolean               | `''`                        | Extra classes for the content                                             |
| `position`               | String                       | `'center'` / `'right'`      | `top`, `center`, `bottom` for modals; `left`, `right`, `bottom` for slideovers |
| `slideover`              | Boolean                      | `false`                     | Render as a slideover instead of a modal                                  |
| `fullscreen`             | Boolean/String/Number        | `'sm'` / `false`            | Fullscreen always, never, or below a breakpoint or width                  |
| `title`                  | String                       | -                           | Header title; enables the card layout                                     |
| `before-close`           | Function                     | -                           | Return `false` to keep the modal open                                     |
| `dialog-props`           | Object                       | -                           | Extra `v-dialog` props, e.g. `{ scrim: 'primary' }`                       |
| `card-props`             | Object                       | -                           | Extra `v-card` props, e.g. `{ color: 'surface-variant' }`                 |

All props except `title`, `before-close`, `dialog-props` and `card-props` also work on `ModalLink`, `ModalBtn`, in `visitModal`'s `config`, and in `putConfig`. Props set on a link or visit win over the ones on the `Modal`.

`max-width` takes the same tokens as `@inertiaui/modal-vue` (Tailwind's `max-w-*` scale) and maps them to the same widths: `sm` 384px, `md` 448px, `lg` 512px, `xl` 576px, `2xl` 672px, `3xl` 768px, `4xl` 896px, `5xl` 1024px, `6xl` 1152px, `7xl` 1280px. Unknown values fall back to `2xl`.

### Default configuration

```js
import { putConfig } from "@inertia-vuetify/modal";

putConfig({
  modal: {
    maxWidth: "lg",
    fullscreen: "md",
  },
  slideover: {
    position: "left",
  },
});

putConfig("modal.closeButton", false);
```

Keys you leave out keep their defaults. `resetConfig()` restores them.

### Vuetify defaults

Style every modal through Vuetify's [global defaults](https://vuetifyjs.com/en/features/global-configuration/) under the `InertiaModal` key, without touching other dialogs. Content defaults nest under `VDialog`, like Vuetify's own dialogs:

```js
createVuetify({
  defaults: {
    InertiaModal: {
      VDialog: {
        scrim: "primary",
        VCard: { rounded: "xl" },
        VBtn: { variant: "tonal" },
      },
    },
  },
});
```

## API Reference

### `<Modal>`

**Slots:** `default`, `title` and `actions`. Each receives the modal's page props plus `close()`, `requestClose()`, `reload()`, `setOpen(open)`, `emit(event, ...args)`, `getParentModal()`, `getChildModal()`, `isOpen`, `onTopOfStack` and `config`.

**Events:** `@close`, `@focus`, `@blur`, `@success`, `@after-leave`, plus any event emitted from the modal (for example `@user-created`).

**Methods (via ref):** `close()`, `reload()`, `setOpen(open)`, `emit(event, ...args)`, `getParentModal()`, `getChildModal()`, and the `isOpen`, `onTopOfStack`, `config`, `id` and `index` getters.

### `<ModalBtn>`

A `v-btn` rendered by `ModalLink`, with a loading state. Accepts all `v-btn` props and the `ModalLink` props below.

### `<ModalLink>`

Besides the modal props it accepts `href`, `method`, `data`, `headers`, `as`, `navigate`, `prefetch` and `cache-for`, and emits `@start`, `@success`, `@error`, `@close`, `@after-leave`, `@prefetching` and `@prefetched`. Ctrl/Cmd/Shift/Alt-clicks on a link are left to the browser, so they still open a new tab or window.

### Functions

- `useModal()` - The current modal instance
- `visitModal(url, options)` - Open a modal programmatically
- `putConfig(key, value)`, `getConfig(key)`, `resetConfig()` - Default configuration
- `getMaxWidth(token)`, `getDialogLocation(position)` - The width and location mapping this package uses

The package also exports `HeadlessModal`, `ModalRoot`, `Deferred`, `WhenVisible`, `useModalStack`, `prefetch`, `withInertiaModal`, `modalPropNames`, `ModalInstance` and `dialogUtils` with the same API as `@inertiaui/modal-vue`.

## Styling

Modals use your Vuetify theme, so colors, elevation and typography follow it. Use `panel-classes` and `padding-classes` for utility classes, `card-props` and `dialog-props` for one modal, and the `InertiaModal` defaults for all of them.

For further customization, target the `im-` classes: `im-modal-dialog`, `im-modal-wrapper`, `im-modal-title`, `im-modal-content`, `im-modal-actions`, the matching `im-slideover-*` classes, `im-slideover-left`, `im-slideover-bottom` and `im-close-button`. Dialogs are teleported, so use global (unscoped) selectors.

## Server-side rendering

Vuetify components import their own CSS, so let Vite bundle this package and Vuetify for the SSR build, and pass `ssr: true` to Vuetify:

```js
// vite.config.js
export default defineConfig({
  ssr: {
    noExternal: ["vuetify", "@inertia-vuetify/modal"],
  },
});
```

```js
// ssr.js
createSSRApp({ render: renderApp(App, props) })
  .use(plugin)
  .use(createVuetify({ ssr: true }));
```

The base page renders on the server, but the modal itself appears once the app hydrates: Vuetify renders overlays on the client only.

## Migration

### From @inertiaui/modal-vue

1. Replace the imports, everywhere:

   ```js
   // Before
   import { Modal, ModalLink } from "@inertiaui/modal-vue";

   // After
   import { Modal, ModalLink } from "@inertia-vuetify/modal";
   ```

2. Uninstall `@inertiaui/modal-vue`. Importing from both packages would give you two separate modal stacks.

3. Replace Tailwind classes in `padding-classes`, `panel-classes` and `putConfig` with Vuetify utility classes. `useNativeDialog` has no effect.

4. Ensure Vuetify 4.2+ is installed and configured.

### From @gigerit/inertia-modal-vuetify 2.x

- The package is now `@inertia-vuetify/modal`. Uninstall `@gigerit/inertia-modal-vuetify`, install `@inertia-vuetify/modal`, and update your imports.
- Vuetify `^4.2.0` is required, and the package is ESM only.
- The package no longer depends on `@inertiaui/modal-vue`. Import everything from `@inertia-vuetify/modal` and uninstall it.
- `max-width` tokens use the same widths as `@inertiaui/modal-vue` (`2xl` is now 672px instead of 896px).
- Centered modals are fullscreen on phones; pass `fullscreen: false` to `putConfig({ modal: { ... } })` to opt out.
- The close button floats in the top corner, or sits in the header when the modal has a title, instead of taking its own row.
- `ModalLink :as="VBtn"` can become `ModalBtn`.

## Development

```bash
bun install
bunx playwright install chromium-headless-shell   # once, for the browser tests
bun run test        # Vitest: unit tests and real-browser component tests
bun run lint        # oxlint
bun run format      # oxfmt
bun run typecheck   # vue-tsc
bun run build       # Library and type declarations in dist/
bun run dev         # Demo site in example/ at http://localhost:3000, with a backend faked in the browser
```

`demo-app/` is a Laravel 13 app for testing routed modals against the package source, with Playwright end-to-end tests; see [AGENTS.md](AGENTS.md) for its commands.

## Contributing

Contributions are welcome! Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, ...); release-please derives versions and the changelog from them.

## License

MIT

## Credits

The modal runtime (stack, routing, `HeadlessModal`, `ModalLink`, ...) started as a port of [InertiaUI Modal](https://github.com/inertiaui/modal) by Pascal Baljet / Protone Media, which also provides the Laravel package this one works with. See [LICENSE](LICENSE).

## Related Packages

- [InertiaUI Modal](https://inertiaui.com/inertia-modal/docs) - The Laravel package and the original Tailwind frontends
- [Inertia.js](https://inertiajs.com/)
- [Vuetify](https://vuetifyjs.com/)
