<script setup lang="ts">
import { Modal, useModal } from '../../src'
import type { Role } from '../server'

defineProps<{ roles: Role[] }>()

const modal = useModal()

function pick(role: string) {
    modal?.emit('picked', role)
    modal?.close()
}
</script>

<template>
    <Modal title="Choose a role" max-width="sm">
        <v-list>
            <v-list-item v-for="role in roles" :key="role.name" :title="role.name" :subtitle="role.description" @click="pick(role.name)" />
        </v-list>
    </Modal>
</template>
