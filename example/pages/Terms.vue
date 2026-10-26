<script setup lang="ts">
import { Modal } from '../../src'

const sections = ['Acceptance', 'Accounts', 'Content', 'Privacy', 'Payments', 'Cancellation', 'Liability', 'Changes']
</script>

<template>
    <Modal title="Terms of service" max-width="lg">
        <section v-for="(section, n) in sections" :key="section" class="mb-6">
            <h3 class="text-title-medium mb-2">{{ n + 1 }}. {{ section }}</h3>
            <p v-for="p in 2" :key="p" class="mb-2">
                By using the service you agree to these terms. We may update them from time to time and will let you know when we do. If you
                do not agree, please stop using the service and contact us so we can close your account.
            </p>
        </section>

        <template #actions="{ close }">
            <v-btn variant="text" @click="close">Decline</v-btn>
            <v-btn color="primary" @click="close">Accept</v-btn>
        </template>
    </Modal>
</template>
