<script setup lang="ts">
defineProps<{
    name: string
    url: string
    description: string
    image: string
}>()
</script>

<template>
    <a :href="url" target="_blank"
        class="flex flex-col gap-2 items-center p-4 hover:cursor-pointer transition-all bg-base-300 rounded-xl shadow-md shadow-primary hover:shadow-base-200">
        <p class="font-semibold text-lg">{{ name }}</p>
        <img :src="image" class="rounded-full w-20 h-20" />
        <p class="text-center">{{ description }}</p>
    </a>
</template>
