<script setup lang="ts">
const education = [
    {
        time: 'September 2014 - June 2020',
        place: 'ITIS "Leonardo Da Vinci" - Trapani',
        title: 'Secondary School Diploma in Electronic Engineering'
    },
    {
        time: 'October 2020 - Present',
        place: 'University of Palermo',
        title: 'Bachelor\'s Degree in Computer Science'
    },
]
</script>

<template>
    <div class="flex flex-col gap-2 justify-center p-4 bg-base-200 rounded-2xl">
        <p class="text-xl font-semibold">Education</p>
        <div class="timeline text-xs">
            <div v-for="edu in education.reverse()">
                <p>{{ edu.time }}</p>
                <p>{{ edu.title }}</p>
                <p>{{ edu.place }}</p>
            </div>
        </div>
    </div>
</template>
