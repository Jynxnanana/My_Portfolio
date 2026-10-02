<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const isVisible = ref(false)
const isHovering = ref(false)
const isClicking = ref(false)

const dotRef = ref<HTMLDivElement | null>(null)
const ringRef = ref<HTMLDivElement | null>(null)

let mouseX = -100
let mouseY = -100
let ringX = -100
let ringY = -100
let ringScale = 1
let targetScale = 1
let animId: number

onMounted(() => {
  // Disable completely on touch devices or fine pointer absent
  if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
    return
  }

  const onMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX
    mouseY = e.clientY
    if (!isVisible.value) isVisible.value = true

    if (dotRef.value) {
      dotRef.value.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
    }
  }

  const onMouseDown = () => {
    isClicking.value = true
    targetScale = 0.8
  }

  const onMouseUp = () => {
    isClicking.value = false
    targetScale = isHovering.value ? 1.6 : 1
  }

  const onMouseOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null
    if (!target) return

    const interactiveEl = target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer')
    if (interactiveEl) {
      isHovering.value = true
      targetScale = 1.6
    } else {
      isHovering.value = false
      targetScale = 1
    }
  }

  const onMouseLeave = () => {
    isVisible.value = false
  }

  const onMouseEnter = () => {
    isVisible.value = true
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('mousedown', onMouseDown, { passive: true })
  window.addEventListener('mouseup', onMouseUp, { passive: true })
  window.addEventListener('mouseover', onMouseOver, { passive: true })
  document.addEventListener('mouseleave', onMouseLeave)
  document.addEventListener('mouseenter', onMouseEnter)

  const loop = () => {
    // Smooth lerp
    ringX += (mouseX - ringX) * 0.18
    ringY += (mouseY - ringY) * 0.18
    ringScale += (targetScale - ringScale) * 0.2

    if (ringRef.value) {
      ringRef.value.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`
    }

    animId = requestAnimationFrame(loop)
  }
  loop()

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mousedown', onMouseDown)
    window.removeEventListener('mouseup', onMouseUp)
    window.removeEventListener('mouseover', onMouseOver)
    document.removeEventListener('mouseleave', onMouseLeave)
    document.removeEventListener('mouseenter', onMouseEnter)
    cancelAnimationFrame(animId)
  })
})
</script>

<template>
  <div
    v-show="isVisible"
    class="custom-cursor-container pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none"
    aria-hidden="true"
  >
    <!-- Center Dot -->
    <div
      ref="dotRef"
      class="cursor-dot pointer-events-none fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--cyan-bright)] shadow-[0_0_6px_var(--cyan-bright)] will-change-transform"
      :class="{ 'opacity-0': isHovering }"
    ></div>

    <!-- Outer Follower Ring -->
    <div
      ref="ringRef"
      class="cursor-ring pointer-events-none fixed top-0 left-0 w-9 h-9 rounded-full border border-[var(--cyan-bright)]/70 bg-[var(--cyan-bright)]/10 will-change-transform"
      :class="{
        'border-[var(--gold)] bg-[var(--gold)]/20 shadow-[0_0_12px_rgba(244,179,46,0.3)]': isHovering
      }"
    ></div>
  </div>
</template>

<style scoped>
.custom-cursor-container {
  pointer-events: none !important;
  user-select: none !important;
}
.cursor-dot, .cursor-ring {
  pointer-events: none !important;
  backface-visibility: hidden;
  transition: opacity 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}
</style>
