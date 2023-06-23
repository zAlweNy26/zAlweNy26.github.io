<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
    description: string
    avatar: string
    hireable: boolean
    followers: number
    following: number
    location: string
}>()

const isDark = useDark({
    storageKey: 'currentTheme',
    selector: 'html',
    disableTransition: false,
    attribute: 'data-theme',
    valueDark: 'dark',
    valueLight: 'light'
})

const toggleDark = useToggle(isDark)
</script>

<template>
    <div class="text-center relative flex flex-col gap-4 justify-center items-center p-4 bg-base-200 rounded-2xl">
        <button class="absolute duration-0 top-2 right-2 btn-sm rounded-xl swap btn-ghost btn-square btn" @click="toggleDark()">
            <input v-model="isDark" type="checkbox" class="modal-toggle">
            <Icon icon="heroicons:sun-solid" class="swap-on h-6 w-6" />
            <Icon icon="heroicons:moon-solid" class="swap-off h-6 w-6" />
        </button>
        <div class="avatar p-1.5">
            <div class="rounded-full shadow-lg shadow-primary w-32 outline-primary outline outline-4 outline-offset-2">
                <img src="/me.png" />
            </div>
        </div>
        <div class="flex flex-col justify-center items-center">
            <p v-if="hireable" class="font-bold text-success">#OpenToWork</p>
            <h1 class="text-2xl font-bold">Daniele Nicosia</h1>
            <p class="text-xs text-neutral-focus flex gap-2">
                <span>{{ followers }} followers</span>
                <Icon icon="ph:users-three-fill" class="h-4 w-4" />
                <span>following {{ following }}</span>
            </p>
        </div>
        <p class="font-semibold font-mono text-base">
            <span>⚡</span>
            {{ description }}
            <span>⚡</span>
        </p>
        <a class="btn btn-sm btn-primary" target="_blank" href="/Daniele_Nicosia_CV.pdf">Download Resume</a>
        <p class="font-medium">
            Currently based in
            <span class="text-primary">{{ location }}</span>
        </p>
    </div>
</template>
