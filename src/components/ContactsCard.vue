<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { email, company } = defineProps<{
    email: string | null
    company: string | null
}>()

const contacts = [
    {
        icon: 'ph:envelope-bold',
        text: 'Email',
        value: email ?? 'danynic20@gmail.com'
    },
    {
        icon: 'ph:buildings-fill',
        text: 'Organization',
        value: company ?? 'None'
    },
    {
        icon: 'simple-icons:github',
        text: 'GitHub',
        value: 'zAlweNy26'
    },
    {
        icon: 'simple-icons:twitter',
        text: 'Twitter',
        value: 'zAlweNy26'
    },
    {
        icon: 'simple-icons:linkedin',
        text: 'LinkedIn',
        value: 'daniele-nicosia'
    },
    {
        icon: 'simple-icons:discord',
        text: 'Discord',
        value: 'alwe'
    }
]
</script>

<template>
    <div class="flex flex-col gap-4 justify-center items-center p-4 bg-base-200 rounded-2xl">
        <div v-for="contact in contacts" class="flex w-full gap-2 justify-between">
            <div class="flex gap-2 items-center">
                <Icon :icon="contact.icon" class="w-4 h-4" />
                <span>{{ contact.text }} :</span>
            </div>
            <p class="font-medium">
                {{ contact.value }}
            </p>
        </div>
    </div>
</template>
