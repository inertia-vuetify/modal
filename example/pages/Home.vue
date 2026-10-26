<script setup lang="ts">
import { useTheme } from 'vuetify'
import { VListItem } from 'vuetify/components/VList'
import { ModalBtn, ModalLink } from '../../src'
import ContactForm from '../components/ContactForm.vue'
import type { User } from '../server'

defineProps<{ users: User[] }>()

const theme = useTheme()

const sections = {
    Variants: [
        { label: 'Modal' },
        { label: 'Top', position: 'top' },
        { label: 'Bottom', position: 'bottom' },
        { label: 'Small', maxWidth: 'sm' },
        { label: 'Wide', maxWidth: '5xl' },
        { label: 'Fullscreen', fullscreen: true },
        { label: 'Slideover', slideover: true },
        { label: 'Slideover left', slideover: true, position: 'left' },
        { label: 'Bottom sheet', slideover: true, position: 'bottom' },
    ],
    Behavior: [
        { label: 'Close explicitly', closeExplicitly: true },
        { label: 'No outside close', closeOnClickOutside: false },
        { label: 'Navigate', navigate: true },
        { label: 'Prefetch', prefetch: true },
        { label: 'Long content', href: '/terms' },
        { label: 'Local', href: '#contact' },
    ],
}
</script>

<template>
    <v-app>
        <v-app-bar title="Inertia Modal Vuetify" flat border="b">
            <template #append>
                <v-btn icon="mdi-github" href="https://github.com/inertia-vuetify/modal" target="_blank" aria-label="GitHub" />
                <v-btn icon="mdi-theme-light-dark" aria-label="Toggle theme" @click="theme.toggle()" />
            </template>
        </v-app-bar>

        <v-main>
            <v-container max-width="1100" class="py-6">
                <v-row>
                    <v-col cols="12" md="7">
                        <v-card title="Users" border flat>
                            <template #append>
                                <ModalBtn href="/stats" icon="mdi-chart-bar" variant="text" aria-label="Stats" />
                                <ModalBtn href="/users/create" color="primary" prepend-icon="mdi-plus">New user</ModalBtn>
                            </template>

                            <v-list lines="two">
                                <ModalLink
                                    v-for="user in users"
                                    :key="user.id"
                                    :as="VListItem"
                                    :href="`/users/${user.id}/edit`"
                                    :title="user.name"
                                    :subtitle="`${user.role} · ${user.email}`"
                                    prepend-icon="mdi-account-circle"
                                    navigate
                                />
                            </v-list>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="5">
                        <v-card v-for="(links, title) in sections" :key="title" :title border flat class="mb-6">
                            <v-card-text class="d-flex flex-wrap ga-2">
                                <ModalBtn v-for="{ label, ...link } in links" :key="label" href="/preview" v-bind="link" variant="tonal">
                                    {{ label }}
                                </ModalBtn>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>

        <ContactForm />
    </v-app>
</template>
