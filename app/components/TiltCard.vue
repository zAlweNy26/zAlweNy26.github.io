<script setup lang="ts">
/** UPageCard with its spotlight, plus a 3D tilt that follows the cursor and lifts the card towards the viewer. */
const rotateX = ref(0)
const rotateY = ref(0)
const reducedMotion = usePreferredReducedMotion()

function handleMouseMove(e: MouseEvent) {
  if (reducedMotion.value === 'reduce') return
  const { left, top, width, height } = (e.currentTarget as HTMLElement).getBoundingClientRect()
  rotateX.value = (e.clientX - left - width / 2) / 25
  rotateY.value = (e.clientY - top - height / 2) / 25
}

function handleMouseLeave() {
  rotateX.value = 0
  rotateY.value = 0
}

const isTilted = computed(() => rotateX.value !== 0 || rotateY.value !== 0)

// translateZ under perspective(1000px) is what makes the card look ~5% bigger while hovered
const tiltStyle = computed(() => ({
  transform: `perspective(1000px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) translateZ(${isTilted.value ? 50 : 0}px)`,
}))
</script>

<template>
  <UPageCard spotlight :style="tiltStyle" class="transition-transform duration-200 ease-linear transform-3d"
             @mousemove="handleMouseMove" @mouseleave="handleMouseLeave" @focusout="handleMouseLeave">
    <slot />
  </UPageCard>
</template>
