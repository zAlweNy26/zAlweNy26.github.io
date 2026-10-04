<script setup lang="ts">
const props = withDefaults(defineProps<{
  gradientSize?: number
  gradientOpacity?: number
}>(),
{
  gradientSize: 50,
  gradientOpacity: 0.75,
})

const offscreen = -props.gradientSize * 10
const mouseX = ref(offscreen)
const mouseY = ref(offscreen)
const rotateX = ref(0)
const rotateY = ref(0)

function handleMouseMove(e: MouseEvent) {
  const { left, top, width, height } = (e.currentTarget as HTMLElement).getBoundingClientRect()
  mouseX.value = e.clientX - left
  mouseY.value = e.clientY - top
  rotateX.value = (e.clientX - left - width / 2) / 25
  rotateY.value = (e.clientY - top - height / 2) / 25
}

function handleFocus(e: FocusEvent) {
  // Keyboard focus has no pointer position: light up the card from its center, without tilting it
  const { width, height } = (e.currentTarget as HTMLElement).getBoundingClientRect()
  mouseX.value = width / 2
  mouseY.value = height / 2
}

function handleLeave() {
  mouseX.value = offscreen
  mouseY.value = offscreen
  rotateX.value = 0
  rotateY.value = 0
}

const isTilted = computed(() => rotateX.value !== 0 || rotateY.value !== 0)

const cardStyle = computed(() => ({
  transform: `perspective(1000px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) translateZ(${isTilted.value ? 50 : 0}px)`,
}))

const backgroundStyle = computed(() => `radial-gradient(
  circle at ${mouseX.value}px ${mouseY.value}px,
  rgba(127, 127, 127, 0.5) 0%,
  rgba(0, 0, 0, 0) 70%
)`)
</script>

<template>
  <UCard variant="soft" :style="cardStyle"
         class="relative print:bg-neutral-200 perspective-distant overflow-hidden transition-all transform-3d size-full duration-200 ease-linear"
         @mousemove="handleMouseMove" @mouseleave="handleLeave" @focusin="handleFocus" @focusout="handleLeave">
    <slot />
    <div class="pointer-events-none absolute inset-0 rounded-xl"
         :style="{ background: backgroundStyle, opacity: gradientOpacity }" />
  </UCard>
</template>
