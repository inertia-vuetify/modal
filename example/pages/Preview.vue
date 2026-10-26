<script setup lang="ts">
import { Modal, ModalBtn } from '../../src'

const keys = ['slideover', 'position', 'maxWidth', 'fullscreen', 'closeExplicitly', 'closeOnClickOutside'] as const
</script>

<template>
    <Modal v-slot="{ config, index }">
        <h2 class="text-headline-small mb-4">Modal {{ index + 1 }}</h2>

        <v-table density="compact">
            <tbody>
                <tr v-for="key in keys" :key="key">
                    <td>{{ key }}</td>
                    <td>{{ config[key] }}</td>
                </tr>
            </tbody>
        </v-table>

        <div class="d-flex justify-end mt-4">
            <ModalBtn href="/preview" variant="tonal">Open another</ModalBtn>
        </div>
    </Modal>
</template>
