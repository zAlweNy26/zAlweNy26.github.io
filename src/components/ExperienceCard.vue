<script setup lang="ts">
const experiences = [
    {
        time: 'April 2023 - Present',
        position: 'Core Contributor',
        company: 'Cheshire Cat Admin GUI'
    }
]
</script>

<template>
    <div class="flex flex-col gap-2 justify-center p-4 bg-base-200 rounded-2xl">
        <p class="text-xl font-semibold">Experience</p>
        <div class="timeline text-xs">
            <div v-for="exp in experiences.reverse()">
                <p>{{ exp.time }}</p>
                <p>{{ exp.position }}</p>
                <p>{{ exp.company }}</p>
            </div>
        </div>
    </div>
</template>
