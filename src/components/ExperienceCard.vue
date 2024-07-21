<script setup lang="ts">
const experiences = [
    {
        time: 'April 2023 - Present',
        position: 'Core Contributor',
        company: 'Cheshire Cat AI'
    },
    {
        time: 'October 2023 - Present',
        position: 'IT Consultant',
        company: 'Cheshire Cat AI'
    },
    {
        time: 'November 2023 - Present',
        position: 'Junior Front-End Developer',
        company: 'SMarT - Strategy Marketing Technology'
    },
    {
        time: 'June 2024 - Present',
        position: 'Univerity Internship (200h)',
        company: 'SMarT - Strategy Marketing Technology'
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
