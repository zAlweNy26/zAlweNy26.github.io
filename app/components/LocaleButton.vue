<script setup lang="ts">
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const other = computed(() => locales.value.find(l => l.code !== locale.value)!)
</script>

<template>
  <!-- A real link (not a toggle) so the other language is crawlable and gets prerendered -->
  <UTooltip arrow :text="t('actions.switchLanguage')">
    <!-- locale=false: Nuxt UI links localize `to` into the current language, which would turn "/" back into "/it" -->
    <UButton :to="switchLocalePath(other.code)" :locale="false" :hreflang="other.language" :lang="other.language"
             :aria-label="t('actions.switchLanguage')" :label="other.code.toUpperCase()"
             class="fixed bottom-4 md:top-4 md:bottom-auto left-16 rounded-full z-50 print:hidden font-semibold"
             size="lg" color="neutral" variant="subtle" square />
  </UTooltip>
</template>
