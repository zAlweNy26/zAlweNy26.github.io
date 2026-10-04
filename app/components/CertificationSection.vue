<script setup lang="ts">
defineProps<{
  certificate: Certification
}>()
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <h3 class="text-base font-semibold text-highlighted">
      {{ certificate.title }}
    </h3>
    <div class="text-toned justify-start flex flex-wrap gap-2 text-sm">
      <IconLabel icon="i-hugeicons-award-01">
        {{ certificate.issuer }}
      </IconLabel>
      <USeparator orientation="vertical" decorative class="h-4" />
      <IconLabel icon="i-hugeicons-calendar-04">
        {{ formatMonthYear(certificate.issueDate) }}
      </IconLabel>
    </div>
    <UButton v-if="certificate.url" variant="subtle" color="neutral" class="text-primary print:hidden"
             :to="certificate.url" target="_blank" external icon="i-hugeicons-link-04" label="View Certificate" />
  </div>
</template>
