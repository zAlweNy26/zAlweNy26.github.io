<script setup lang="ts">
const today = new Date()
const birthDate = new Date("2001/02/20")
let age = today.getFullYear() - birthDate.getFullYear()
const m = today.getMonth() - birthDate.getMonth()
if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--
</script>

<template>
    <div class="flex flex-col gap-2 justify-center p-4 bg-base-200 rounded-2xl">
        <p class="text-xl font-semibold">About me</p>
        <p>
            I'm <span class="font-semibold">{{ age }}</span> years old based in 
            <span id="sicily">Sicily</span>, 
            <span id="italy">Italy</span>.
            I first discovered the magical world of programming at the age of 12.
            Obviously the first programs I did were nothing special, (Visual Basic in my ❤️)
            but it was thanks to my consistency that I understood that programming 
            was something else, something more powerful than this.
        </p>
    </div>
</template>
