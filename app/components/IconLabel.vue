<script setup lang="ts">
/** An icon followed by a label; renders as an external link when `to` is set. */
defineProps<{
  icon: string
  to?: string
}>()
</script>

<template>
  <ULink v-if="to" external :to target="_blank" class="group inline-flex text-highlighted items-center gap-2">
    <UIcon :name="icon" class="size-5" />
    <span class="group-hover:text-primary transition-colors"><slot /></span>
  </ULink>
  <span v-else class="inline-flex text-highlighted items-center gap-2">
    <UIcon :name="icon" class="size-5" />
    <slot />
  </span>
</template>
