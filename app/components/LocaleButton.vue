<script setup lang="ts">
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const other = computed(() => locales.value.find(l => l.code !== locale.value)!)

const flags: Record<Locale, string> = {
  en: 'i-circle-flags-gb',
  it: 'i-circle-flags-it',
}
</script>

<template>
  <!-- A real link (not a toggle) so the other language is crawlable and gets prerendered -->
  <UTooltip arrow :text="t('actions.switchLanguage')">
    <!-- locale=false: Nuxt UI links localize `to` into the current language, which would turn "/" back into "/it" -->
    <UButton :to="switchLocalePath(other.code)" :locale="false" :hreflang="other.language" :lang="other.language"
             :aria-label="t('actions.switchLanguage')" :icon="flags[locale as Locale]"
             class="fixed top-4 right-4 rounded-full z-50 p-2 print:hidden" :ui="{ leadingIcon: 'size-6' }"
             size="lg" color="neutral" variant="subtle" square />
  </UTooltip>
</template>
