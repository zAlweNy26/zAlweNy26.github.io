<script setup lang="ts">
import type { VNode } from 'vue'

const props = withDefaults(defineProps<{
  duration?: number
  delay?: number
  blur?: number
  yOffset?: number
}>(), {
  duration: 0.5,
  delay: 0.25,
  blur: 20,
  yOffset: 20,
})

const slots = useSlots()

const children = ref<VNode[]>([])

onMounted(() => {
  watchEffect(() => {
    children.value = slots.default ? slots.default() : []
  })
})

function getInitial() {
  return {
    opacity: 0,
    filter: `blur(${props.blur}px)`,
    y: props.yOffset,
  }
}

function getAnimate() {
  return {
    opacity: 1,
    filter: `blur(0px)`,
    y: 0,
  }
}
</script>

<template>
  <div>
    <Motion v-for="(child, index) in children" :key="index" as="div" :initial="getInitial()"
            :while-in-view="getAnimate()" :transition="{
              duration: props.duration,
              ease: 'easeInOut',
              delay: props.delay * index,
            }">
      <component :is="child" />
    </Motion>
  </div>
</template>
