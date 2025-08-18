<script setup lang="ts">
const props = withDefaults(defineProps<{
  gradientSize?: number
  gradientOpacity?: number
}>(),
{
  gradientSize: 50,
  gradientOpacity: 0.75,
})

const containerRef = useTemplateRef('container')
const mouseX = ref(-props.gradientSize * 10)
const mouseY = ref(-props.gradientSize * 10)

function handleMouseMove(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement
  const { left, top, width, height } = target.getBoundingClientRect()
  mouseX.value = e.clientX - left
  mouseY.value = e.clientY - top
  const x = (e.clientX - left - width / 2) / 25
  const y = (e.clientY - top - height / 2) / 25
  if (!containerRef.value) return
  containerRef.value.$el.style.transform = `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) translateZ(50px)`
}

function handleMouseLeave() {
  mouseX.value = -props.gradientSize * 10
  mouseY.value = -props.gradientSize * 10
  if (!containerRef.value) return
  containerRef.value.$el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`
}

onMounted(() => {
  mouseX.value = -props.gradientSize * 10
  mouseY.value = -props.gradientSize * 10
})

const backgroundStyle = computed(() => {
  return `radial-gradient(
    circle at ${mouseX.value}px ${mouseY.value}px,
    rgba(127, 127, 127, 0.5) 0%,
    rgba(0, 0, 0, 0) 70%
  )`
})
</script>

<template>
  <UCard ref="container" variant="soft"
         class="relative print:bg-neutral-200 perspective-distant overflow-hidden transition-all transform-3d size-full duration-200 ease-linear"
         @mousemove="handleMouseMove" @mouseleave="handleMouseLeave" @focusin="handleMouseMove" @focusout="handleMouseLeave">
    <slot />
    <div
      class="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      :style="{
        background: backgroundStyle,
        opacity: gradientOpacity,
      }" />
  </UCard>
</template>
