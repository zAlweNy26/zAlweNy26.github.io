<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { languageColor } from '@helpers/utils'

defineProps<{
    name: string
    url: string
    description: string
    stars: number
    forks: number
    watchers: number
    language: string
}>()
</script>

<template>
    <a :href="url" target="_blank"
        class="flex flex-col gap-2 justify-between p-4 hover:cursor-pointer transition-all bg-base-300 rounded-xl shadow-md shadow-primary hover:shadow-base-200">
        <div class="font-semibold text-lg flex items-center gap-1">
            <Icon icon="ph:link-simple-horizontal-bold" class="w-4 h-4" />
            <p>{{ name }}</p>
        </div>
        <p>{{ description }}</p>
        <div class="flex justify-between items-center">
            <div class="flex gap-2">
                <div class="flex items-center gap-1">
                    <Icon icon="ph:star-fill" class="w-4 h-4 text-warning" />
                    <p>{{ stars }}</p>
                </div>
                <div class="flex items-center gap-1">
                    <Icon icon="ph:eye-fill" class="w-4 h-4" />
                    {{ watchers }}
                </div>
                <div class="flex items-center gap-1">
                    <Icon icon="ph:git-fork-bold" class="w-4 h-4" />
                    {{ forks }}
                </div>
            </div>
            <div class="flex gap-1 justify-center items-center">
                <div class="h-3 w-3 rounded-full" :style="`background:${languageColor(language)};`"></div>
                <p class="leading-4">{{ language }}</p>
            </div>
        </div>
    </a>
</template>
