<script setup lang="ts">
import { Deferred, Modal } from '../../src'

defineProps<{ total: number; time: string; breakdown?: { role: string; count: number }[] }>()
</script>

<template>
    <Modal title="Stats" max-width="md">
        <div class="text-display-small">{{ total }}</div>
        <div class="text-medium-emphasis">Users at {{ time }}</div>

        <Deferred data="breakdown">
            <template #fallback>
                <v-progress-linear indeterminate class="mt-6" />
            </template>

            <div v-for="{ role, count } in breakdown" :key="role" class="d-flex align-center ga-4 mt-6">
                <span class="w-25">{{ role }}</span>
                <v-progress-linear :model-value="(count / total) * 100" color="primary" height="8" rounded />
                <span>{{ count }}</span>
            </div>
        </Deferred>

        <template #actions="{ reload }">
            <v-btn prepend-icon="mdi-refresh" @click="reload()">Refresh</v-btn>
        </template>
    </Modal>
</template>
