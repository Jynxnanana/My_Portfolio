<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const scrollProgress = ref(0)

const updateProgress = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  if (docHeight > 0) {
    scrollProgress.value = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100))
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

<template>
  <div class="fixed top-0 left-0 right-0 h-[3px] z-50 bg-transparent pointer-events-none">
    <div
      class="h-full bg-gradient-to-r from-[var(--cyan)] via-[var(--cyan-bright)] to-[var(--gold)] shadow-[0_0_12px_var(--cyan-bright)] transition-all duration-75 ease-out"
      :style="{ width: `${scrollProgress}%` }"
    ></div>
  </div>
</template>
