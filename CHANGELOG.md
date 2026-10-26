# Changelog

## [3.0.2](https://github.com/inertia-vuetify/modal/compare/v3.0.1...v3.0.2) (2026-10-26)


### Documentation

* **example:** make example a static demo site ([e4b3346](https://github.com/inertia-vuetify/modal/commit/e4b334689f0818f37982c46143063f487f3378f0))

## [3.0.1](https://github.com/inertia-vuetify/modal/compare/v3.0.0...v3.0.1) (2026-10-23)


### Bug Fixes

* render ModalBtn text and icon props without a slot ([efab753](https://github.com/inertia-vuetify/modal/commit/efab753dac783a6827d421aa0c0e5ba8e4ef5636))
* render ModalBtn text and icon props without a slot ([bcb028d](https://github.com/inertia-vuetify/modal/commit/bcb028d94a6b3d74c22cbfbf01168679d28fbf20)), closes [#12](https://github.com/inertia-vuetify/modal/issues/12)

## [3.0.0](https://github.com/inertia-vuetify/modal/compare/v2.1.0...v3.0.0) (2026-10-22)


### ⚠ BREAKING CHANGES

* the package is renamed to @inertia-vuetify/modal and no longer depends on @inertiaui/modal-vue. Install it, uninstall @gigerit/inertia-modal-vuetify and @inertiaui/modal-vue, and import everything from @inertia-vuetify/modal. @inertiajs/core ^3 is a new peer dependency, useNativeDialog is gone, and centered modals go fullscreen below the sm breakpoint (fullscreen: false opts out).
* requires vuetify ^4.2.0. Package is ESM-only; the CommonJS build could not be required anyway. max-width tokens use upstream's Tailwind widths (2xl 672px, md 448px). The modal close button overlays the top-right corner instead of taking its own row.

### Features

* add bottom sheets via slideover position bottom ([3d4ea55](https://github.com/inertia-vuetify/modal/commit/3d4ea559209d77461ee7ec129e306b2f09f0cb3f))
* add card layout with title and actions slots ([3d4ea55](https://github.com/inertia-vuetify/modal/commit/3d4ea559209d77461ee7ec129e306b2f09f0cb3f))
* add ModalBtn, a Vuetify button that opens modals ([3d4ea55](https://github.com/inertia-vuetify/modal/commit/3d4ea559209d77461ee7ec129e306b2f09f0cb3f))
* grow centered modals from the element that opened them ([3d4ea55](https://github.com/inertia-vuetify/modal/commit/3d4ea559209d77461ee7ec129e306b2f09f0cb3f))
* guard closing with before-close and requestClose ([3d4ea55](https://github.com/inertia-vuetify/modal/commit/3d4ea559209d77461ee7ec129e306b2f09f0cb3f))
* open centered modals fullscreen on small screens ([3d4ea55](https://github.com/inertia-vuetify/modal/commit/3d4ea559209d77461ee7ec129e306b2f09f0cb3f))
* own the modal runtime as @inertia-vuetify/modal ([3d4ea55](https://github.com/inertia-vuetify/modal/commit/3d4ea559209d77461ee7ec129e306b2f09f0cb3f))
* pass v-dialog and v-card props with dialog-props and card-props ([3d4ea55](https://github.com/inertia-vuetify/modal/commit/3d4ea559209d77461ee7ec129e306b2f09f0cb3f))
* rebuild Vuetify presentation layer ([24fd501](https://github.com/inertia-vuetify/modal/commit/24fd5017d5cd015ca5aeda678802e8f1f12da027))
* style all modals through InertiaModal Vuetify defaults ([3d4ea55](https://github.com/inertia-vuetify/modal/commit/3d4ea559209d77461ee7ec129e306b2f09f0cb3f))


### Bug Fixes

* close modals when a submission redirects back ([3d4ea55](https://github.com/inertia-vuetify/modal/commit/3d4ea559209d77461ee7ec129e306b2f09f0cb3f))
* **deps:** refresh compatible frontend security graphs ([9a4f841](https://github.com/inertia-vuetify/modal/commit/9a4f841eff08f311c078c1fbe568de81d300e368))
* **deps:** refresh frontend dependency graphs ([07def39](https://github.com/inertia-vuetify/modal/commit/07def395c8ca4241a2173dc29c1a65b18c8dbbe2))
* keep covered modals open when clicking a nested modal ([3d4ea55](https://github.com/inertia-vuetify/modal/commit/3d4ea559209d77461ee7ec129e306b2f09f0cb3f))
* keep the stack intact when reopening a closing local modal ([3d4ea55](https://github.com/inertia-vuetify/modal/commit/3d4ea559209d77461ee7ec129e306b2f09f0cb3f))
* leave modifier clicks on ModalLink to the browser ([3d4ea55](https://github.com/inertia-vuetify/modal/commit/3d4ea559209d77461ee7ec129e306b2f09f0cb3f))
* open modal visits when the Inertia progress bar is off ([3d4ea55](https://github.com/inertia-vuetify/modal/commit/3d4ea559209d77461ee7ec129e306b2f09f0cb3f))
* restore the URL after closing a prefetched navigate modal ([3d4ea55](https://github.com/inertia-vuetify/modal/commit/3d4ea559209d77461ee7ec129e306b2f09f0cb3f))
* stop leaking a request interceptor per SSR render ([3d4ea55](https://github.com/inertia-vuetify/modal/commit/3d4ea559209d77461ee7ec129e306b2f09f0cb3f))


### Documentation

* **agents:** sync agent guidance with rebuilt adapter ([f4b6b0b](https://github.com/inertia-vuetify/modal/commit/f4b6b0be3d9b8c4889233d23b689733968735831))
* **agents:** update guidance for the owned runtime ([3fc9695](https://github.com/inertia-vuetify/modal/commit/3fc9695f9391ce37ccbfa9af2181bc78150d550d))
* document the standalone runtime and rename ([ee6ae65](https://github.com/inertia-vuetify/modal/commit/ee6ae654dd235b2cc3e411d9f0779f5268d813f3))
* drop React examples and document Vuetify setup ([bc8bccd](https://github.com/inertia-vuetify/modal/commit/bc8bccdded1cedf8aaf78f8e515bfd32cb26b30c))


### Miscellaneous Chores

* **demo-app:** upgrade to Laravel 13 and Inertia 3 ([95428fe](https://github.com/inertia-vuetify/modal/commit/95428fee63be6d1e86f60502bf49b73f8982e409))
* **example:** port the example to TypeScript ([41eefa4](https://github.com/inertia-vuetify/modal/commit/41eefa41ab11333f9debd9fcccd199c2fcad0528))
* **example:** rebuild as local modal playground ([3abc920](https://github.com/inertia-vuetify/modal/commit/3abc92010629d4becaae53ba0a0924b97e4a21c5))

## [2.1.0](https://github.com/gigerIT/inertia-modal-vuetify/compare/v2.0.0...v2.1.0) (2026-07-02)


### Features

* add modal accessibility lifecycle ([9ce1993](https://github.com/gigerIT/inertia-modal-vuetify/commit/9ce19932e02113cd307ddd499b77d4b826d5b570))
* add package type declarations ([2fa398a](https://github.com/gigerIT/inertia-modal-vuetify/commit/2fa398a5baca447bef7e96936d560b523b0c74d2))
* expose upstream modal v3 helpers ([ee6768a](https://github.com/gigerIT/inertia-modal-vuetify/commit/ee6768af2dc36c11de987e1d6dead855ff37d82c))
* support outside click close config ([c6b92fa](https://github.com/gigerIT/inertia-modal-vuetify/commit/c6b92fa73e1dd42271905a7fd48e56ab31fa73aa))

## [2.0.0](https://github.com/gigerIT/inertia-modal-vuetify/compare/v1.2.0...v2.0.0) (2026-07-02)


### ⚠ BREAKING CHANGES

* vuetify peer dependency now requires ^4.0.0 and vue requires ^3.5.0.

### Features

* support Vuetify 4 ([7ac209a](https://github.com/gigerIT/inertia-modal-vuetify/commit/7ac209ae873c6037ace74138175644f2d620d8c4))

## [1.2.0](https://github.com/gigerIT/inertia-modal-vuetify/compare/v1.1.2...v1.2.0) (2025-11-12)


### Features

* change readme to trigger release for previous commit ([ccb0f25](https://github.com/gigerIT/inertia-modal-vuetify/commit/ccb0f2522def4c6deb8e5e4d8a267212f6bd5e2d))

## [1.1.2](https://github.com/gigerIT/inertia-modal-vuetify/compare/v1.1.1...v1.1.2) (2025-10-31)


### Bug Fixes

* update modal styles for consistent height and min-height ([08fbcd3](https://github.com/gigerIT/inertia-modal-vuetify/commit/08fbcd3d8f82a0fd0c663589683a856c40cd9164))

## [1.1.1](https://github.com/gigerIT/inertia-modal-vuetify/compare/v1.1.0...v1.1.1) (2025-10-31)


### Bug Fixes

* correctly position close button on the right side ([139d961](https://github.com/gigerIT/inertia-modal-vuetify/commit/139d96135b37763d5e7aa8df3d2d31b92e06808a))

## [1.1.0](https://github.com/gigerIT/inertia-modal-vuetify/compare/v1.0.0...v1.1.0) (2025-10-31)


### Features

* **demo-app:** update dependencies, add test page, and enhance app structure ([ad5de20](https://github.com/gigerIT/inertia-modal-vuetify/commit/ad5de200d6faf7aa85020a383585d5287cfb7d91))
* integrate Vuetify and update app layout ([6ed9417](https://github.com/gigerIT/inertia-modal-vuetify/commit/6ed9417dbb9f920286f7da86b09637d3f616e2d1))


### Bug Fixes

* v-dialog height ([a1486a4](https://github.com/gigerIT/inertia-modal-vuetify/commit/a1486a4e052e5e01c3469864b766e0c4783802b1))

## 1.0.0 (2025-10-31)


### Features

* initial implementation ([0616b90](https://github.com/gigerIT/inertia-modal-vuetify/commit/0616b90636edd443d9981db274274f0ecac39d83))
