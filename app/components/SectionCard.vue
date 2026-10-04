<script setup lang="ts">
defineProps<{
  title: string
  /** Classes for the card body, usually the layout of the items */
  bodyClass?: string
}>()
</script>

<template>
  <UCard as="section" variant="subtle" class="print:bg-transparent" :ui="{ body: bodyClass }">
    <template #header>
      <h2 class="text-xl md:text-2xl font-bold text-highlighted leading-loose">
        {{ title }}
      </h2>
    </template>
    <slot />
  </UCard>
</template>
