# Mirror Map

Where each upstream file lives in this package. Paths on the left are relative
to the `inertiaui/modal` repository.

## Protocol (Laravel package)

| Upstream | Defines | Local counterpart |
| --- | --- | --- |
| `src/Modal.php` | `X-InertiaUI-Modal` / `X-InertiaUI-Modal-Base-Url` headers, the `_inertiaui_modal` prop, the response shape, base-route rendering | `src/modalStack.ts`, `src/ModalRoot.vue`, `ModalResponseData` in `src/types.ts` |
| `src/Redirector.php`, `src/helpers.php` | `back()` to the base URL | `src/ModalRoot.vue` closing logic |
| `src/DispatchBaseUrlRequest.php` | rendering the base route for direct modal URLs | `src/ModalRoot.vue` |
| `src/ModalVisit.php`, `src/ModalConfig.php`, `src/ModalType.php`, `src/ModalPosition.php` | PHP builders for visit options and config keys sent to the frontend | `VisitOptions` and `ModalTypeConfig` in `src/types.ts` |

## Runtime (ported, same file names)

| Upstream | Local |
| --- | --- |
| `vue/src/modalStack.ts` | `src/modalStack.ts`; its types in `src/types.ts`; `renderApp`/`withInertiaModal` in `src/app.ts` |
| `vue/src/inertiauiModal.ts` | exports in `src/index.ts`; `visitModal` in `src/modalStack.ts` |
| `vue/src/ModalRoot.vue`, `ModalRenderer.vue`, `HeadlessModal.vue`, `ModalLink.vue`, `Deferred.vue`, `WhenVisible.vue`, `useModal.ts`, `cache.ts`, `helpers.ts` | same names in `src/` |
| `vue/src/config.ts` | `src/config.ts` (Vuetify defaults, `fullscreen`, max-width and position helpers) |
| `vue/tests/*.test.js` | `tests/unit/*.test.ts` |
| `vue/package.json` dependencies | root `package.json` |

`@inertiaui/vanilla` stays an npm dependency: `src/helpers.ts` re-exports its
helpers and `src/index.ts` exports it as `dialogUtils`.

## Presentation (behavior only)

| Upstream | Local |
| --- | --- |
| `vue/src/Modal.vue` | `src/Modal.vue` (slot props, events, exposed methods) |
| `vue/src/ModalContent.vue`, `vue/src/SlideoverContent.vue` | `src/ModalContent.vue` (one `v-dialog` for both) and `src/transitions.ts` |
| `vue/src/CloseButton.vue` | `src/CloseButton.vue` |
| `vue/src/constants.ts` | `getMaxWidth` in `src/config.ts` (pixel widths for the same tokens) |

`src/ModalBtn.vue` and `src/keys.ts` have no upstream counterpart. The Vuetify
contracts these files keep are the guardrails in `AGENTS.md`.

## Follow-Up For Common Upstream Changes

- Config key: `ModalTypeConfig` in `src/types.ts`, defaults in
  `src/config.ts`, `modalPropNames`, props on `src/ModalLink.vue` and
  `src/HeadlessModal.vue`, the Vuetify rendering in `src/ModalContent.vue`,
  README props table, `docs/configuration.md`.
- Slot prop, event, or exposed method of `HeadlessModal`: pass it through
  `src/Modal.vue`, type it in `src/types.ts`, document it in the README.
- `ModalLink` prop or event: `src/ModalLink.vue`; `ModalBtn` forwards attrs,
  so only its docs change.
- Export: `src/index.ts` and the README API section.
- Protocol: `src/modalStack.ts`, `src/ModalRoot.vue`, `src/types.ts`, a demo
  route, and an e2e test.
- Dependency: root and demo `package.json`, Vite externals, demo
  `resolve.dedupe`.

## Integration Touchpoints

- `tests/browser/*.test.ts` - lifecycle and layout in real Vuetify dialogs.
- `demo-app/routes/web.php`, `demo-app/resources/js/pages/**` - routed modals.
- `demo-app/tests/e2e/modals.spec.ts` - routed flows against the Laravel
  package.
- `demo-app/tests/Feature/ModalRoutesTest.php` - demo routes.
- `demo-app/resources/js/app.ts`, `ssr.ts` - app and SSR setup.
- `example/server.ts` - the static demo's in-browser copy of the Laravel
  package's wire protocol; `example/pages/**`, `example/components/*.vue` -
  its routed and local modals.
