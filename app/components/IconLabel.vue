<script setup lang="ts">
defineProps<{
  icon: string
  to?: string
}>()
</script>

<template>
  <UButton v-if="to" :icon :to target="_blank" external variant="link" color="neutral" size="md"
           class="p-0 gap-2 text-highlighted hover:text-primary" :ui="{ leadingIcon: 'size-5' }">
    <slot />
  </UButton>
  <span v-else class="inline-flex text-highlighted items-center gap-2">
    <UIcon :name="icon" class="size-5" />
    <slot />
  </span>
</template>
