<script setup lang="ts">
import { en, it } from '@nuxt/ui/locale'

const { locale } = useI18n()
const uiLocales = { en, it }

// <html lang>, hreflang alternates and og:locale for the current language
const localeHead = useLocaleHead()
useHead(() => ({
  htmlAttrs: { lang: localeHead.value.htmlAttrs?.lang },
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    ...(localeHead.value.link ?? []),
  ],
  meta: localeHead.value.meta ?? [],
}))

function handlePrint() {
  window.print()
}
</script>

<template>
  <UApp :tooltip="{ delayDuration: 300 }" :locale="uiLocales[locale as Locale]">
    <NuxtPage />
    <ThemeButton />
    <LocaleButton />
    <UTooltip arrow :text="$t('actions.print')">
      <UButton class="fixed bottom-4 right-4 rounded-full print:hidden z-50" size="lg" square icon="i-hugeicons-printer"
               :aria-label="$t('actions.print')" @click="handlePrint" />
    </UTooltip>
  </UApp>
</template>
