<script setup lang="ts">
const {
  name = 'Daniele Nicosia',
  role = 'Lead Frontend Developer',
  summary = '',
  domain = 'danyalwe.me',
} = defineProps<{
  name?: string
  role?: string
  summary?: string
  domain?: string
}>()
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between p-20 bg-neutral-950 text-white"
       style="font-family: 'Space Grotesk', sans-serif">
    <div class="flex items-center justify-between">
      <div class="flex flex-col">
        <div class="text-[80px] font-bold leading-tight">
          {{ name }}
        </div>
        <div class="text-[40px] text-green-400 font-medium mt-2">
          {{ role }}
        </div>
      </div>
      <img src="/me_jojo.webp" alt="" width="240" height="240" class="rounded-full" style="border: 6px solid #4ade80">
    </div>
    <div class="text-[30px] text-neutral-300 leading-snug" style="max-width: 900px">
      {{ summary }}
    </div>
    <div class="flex items-center text-[28px] text-neutral-400">
      <div class="w-4 h-4 rounded-full bg-green-400 mr-4" />
      {{ domain }}
    </div>
  </div>
</template>
