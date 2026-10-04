<script setup lang="ts">
import type { VNode } from 'vue'
import { Comment, Fragment } from 'vue'

const props = withDefaults(defineProps<{
  /** Seconds */
  duration?: number
  /** Seconds between each of the first children */
  delay?: number
  blur?: number
  yOffset?: number
  /** The first `maxStagger + 1` children animate on load, the rest as they scroll into view */
  maxStagger?: number
}>(), {
  duration: 0.4,
  delay: 0.12,
  blur: 8,
  yOffset: 16,
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

// Pure CSS, so the prerendered HTML animates on first paint instead of waiting for hydration
const style = computed(() => ({
  '--reveal-duration': `${props.duration}s`,
  '--reveal-blur': `${props.blur}px`,
  '--reveal-y': `${props.yOffset}px`,
}))
</script>

<template>
  <div :style>
    <div v-for="(child, index) in flatten($slots.default?.() ?? [])" :key="child.key ?? index"
         :class="index <= maxStagger ? 'reveal-load' : 'reveal-scroll'"
         :style="{ '--reveal-delay': `${props.delay * Math.min(index, maxStagger)}s` }">
      <component :is="child" />
    </div>
  </div>
</template>

<style scoped>
@keyframes reveal {
  from {
    opacity: 0;
    filter: blur(var(--reveal-blur));
    translate: 0 var(--reveal-y);
  }
}

.reveal-load {
  animation: reveal var(--reveal-duration) ease-out var(--reveal-delay) both;
}

@supports (animation-timeline: view()) {
  .reveal-scroll {
    animation: reveal linear both;
    animation-timeline: view();
    /* Capped at the element height so short items at the very bottom of the page can still finish */
    animation-range: entry 0 entry min(200px, 100%);
  }
}

@media (prefers-reduced-motion: reduce), print {
  .reveal-load,
  .reveal-scroll {
    animation: none;
  }
}
</style>
