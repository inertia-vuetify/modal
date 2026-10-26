<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { Modal, ModalBtn } from '../../src'
import type { User } from '../server'

const props = defineProps<{ user?: User }>()

const form = useForm({
    name: props.user?.name ?? '',
    email: props.user?.email ?? '',
    role: props.user?.role ?? 'Viewer',
})

function submit() {
    if (props.user) {
        form.put(`/users/${props.user.id}`)
    } else {
        form.post('/users')
    }
}

function confirmDiscard() {
    return !form.isDirty || confirm('Discard your changes?')
}
</script>

<template>
    <Modal :title="user ? 'Edit user' : 'New user'" :slideover="!!user" :before-close="confirmDiscard">
        <v-form id="user-form" @submit.prevent="submit">
            <v-text-field v-model="form.name" label="Name" :error-messages="form.errors.name" />
            <v-text-field v-model="form.email" label="Email" type="email" :error-messages="form.errors.email" />
            <v-text-field v-model="form.role" label="Role" readonly>
                <template #append-inner>
                    <ModalBtn href="/roles" variant="text" size="small" @picked="(role: string) => (form.role = role)">Change</ModalBtn>
                </template>
            </v-text-field>
        </v-form>

        <template #actions="{ requestClose }">
            <v-btn variant="text" @click="requestClose">Cancel</v-btn>
            <v-btn type="submit" form="user-form" color="primary" :loading="form.processing">Save</v-btn>
        </template>
    </Modal>
</template>
