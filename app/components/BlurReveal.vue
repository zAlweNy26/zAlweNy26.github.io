<script setup lang="ts">
import type { VNode } from 'vue'
import { Comment, Fragment } from 'vue'

const props = withDefaults(defineProps<{
  duration?: number
  delay?: number
  blur?: number
  yOffset?: number
  /** Children past this index don't wait any longer, so items revealed on scroll appear right away */
  maxStagger?: number
}>(), {
  duration: 0.5,
  delay: 0.25,
  blur: 20,
  yOffset: 20,
  maxStagger: 2,
})

defineSlots<{ default: () => VNode[] }>()

/** Unwrap v-for fragments and drop v-if placeholders so each real child gets its own stagger step */
function flatten(nodes: VNode[]): VNode[] {
  return nodes.flatMap((node) => {
    if (node.type === Comment) return []
    if (node.type === Fragment && Array.isArray(node.children)) return flatten(node.children as VNode[])
    return [node]
  })
}

const initial = computed(() => ({ opacity: 0, filter: `blur(${props.blur}px)`, y: props.yOffset }))
const animate = { opacity: 1, filter: 'blur(0px)', y: 0 }
</script>

<template>
  <div>
    <Motion v-for="(child, index) in flatten($slots.default?.() ?? [])" :key="child.key ?? index" as="div"
            class="reveal" :initial :while-in-view="animate" :in-view-options="{ once: true }" :transition="{
              duration: props.duration,
              ease: 'easeInOut',
              delay: props.delay * Math.min(index, props.maxStagger),
            }">
      <component :is="child" />
    </Motion>
  </div>
</template>

<style scoped>
@media print {
  /* Sections never scrolled into view would otherwise print invisible */
  .reveal {
    opacity: 1 !important;
    filter: none !important;
    transform: none !important;
  }
}
</style>
