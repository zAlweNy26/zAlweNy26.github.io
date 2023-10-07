<script setup lang="ts">
const techStack: [number, string][] = [
    [1, 'JavaScript'],
    [2, 'Flutter'],
    [2, 'Dart'],
    [1, 'Node.js'],
    [1, 'MySQL'],
    [3, 'Python'],
    [2, 'React'],
    [1, 'CSS'],
    [3, 'C'],
    [3, 'C++'],
    [2, 'C#'],
    [1, 'Vue'],
    [2, 'Java'],
    [1, 'HTML'],
    [2, 'Astro'],
    [3, 'Svelte'],
    [2, 'Kotlin'],
    [1, 'Tailwind'],
    [2, 'TypeScript'],
    [2, 'Git'],
]
</script>

<template>
    <div class="flex flex-col gap-2 justify-center p-4 bg-base-200 rounded-2xl">
        <p class="text-xl font-semibold">Tech Stack</p>
        <div class="flex flex-wrap gap-2 justify-center">
            <div v-for="([level, skill]) in techStack" class="badge badge-sm font-medium text-base-100"
                :class="{ 
                    'badge-success': level === 1,
                    'badge-warning': level === 2,
                    'badge-error': level === 3,
                }">
                {{ skill }}
            </div>
        </div>
    </div>
</template>
