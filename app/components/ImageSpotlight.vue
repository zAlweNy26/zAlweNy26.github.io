<script setup lang="ts">
const { spotlightSize = 100 } = defineProps<{
  baseImage: string
  spotlightImage: string
  spotlightSize?: number
  alt?: string
}>()

const mouseX = ref(0), mouseY = ref(0)
const isHovering = ref(false)

// Pointer events also cover touch, so touching the picture reveals the spotlight on phones
function handlePointerMove(e: PointerEvent) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
  isHovering.value = true
}

function handlePointerLeave() {
  isHovering.value = false
}

const currentPath = computed(() => `circle(${spotlightSize / 2}px at ${mouseX.value}px ${mouseY.value}px)`)
const currentOpacity = computed(() => isHovering.value ? 1 : 0)
</script>

<template>
  <!-- Purely decorative interaction: not focusable, the base image carries the alt text -->
  <div class="relative overflow-hidden cursor-none select-none"
       @pointerdown="handlePointerMove" @pointermove="handlePointerMove" @pointerleave="handlePointerLeave" @pointercancel="handlePointerLeave">
    <img :src="baseImage" :alt="alt" width="320" height="320" class="w-full h-full object-cover" draggable="false">
    <img :src="spotlightImage" alt="" aria-hidden="true" width="320" height="320"
         class="absolute spotlight inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out pointer-events-none"
         draggable="false">
  </div>
</template>

<style scoped>
.spotlight {
  clip-path: v-bind(currentPath);
  opacity: v-bind(currentOpacity);
}

@media print {
  .spotlight {
    clip-path: none !important;
    opacity: 1 !important;
  }
}
</style>
