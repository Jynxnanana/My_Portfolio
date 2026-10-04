<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

defineProps<{ theme: 'dark' | 'light' }>()

const emit = defineEmits<{
  (e: 'toggleTheme'): void
  (e: 'openCommandPalette'): void
}>()

const activeSection = ref('home')
const mobileMenuOpen = ref(false)

const handleScroll = () => {
  const sections = ['home', 'about', 'skills', 'projects', 'contact']
  const scrollPosition = window.scrollY + 200

  for (const section of sections) {
    const el = document.getElementById(section)
    if (el) {
      const top = el.offsetTop
      const height = el.offsetHeight
      if (scrollPosition >= top && scrollPosition < top + height) {
        activeSection.value = section
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div 
    class="site-header-wrapper fixed top-0 left-0 right-0 z-50 flex justify-center w-full backdrop-blur-xl bg-[var(--bg)]/85 border-b border-[var(--line)] transition-all duration-300 hover:border-[var(--cyan)]/40 hover:shadow-[0_4px_30px_rgba(6,188,226,0.08)]"
  >
    <header 
      class="site-header relative w-full max-w-[1440px] flex items-center justify-between px-6 py-4 sm:px-10 lg:px-16"
    >
      
      <!-- Wordmark with neon brackets expansion -->
    <a
      class="wordmark group/logo flex items-center gap-2 font-display font-bold tracking-tight transition-all duration-500 hover:scale-105"
      href="#home"
    >
      <div class="flex items-center justify-center w-[34px] h-[34px] rounded-xl bg-[var(--surface-raised)] border border-[var(--line)] group-hover/logo:border-[var(--cyan)] transition-colors shadow-inner group-hover/logo:shadow-[0_0_15px_rgba(6,188,226,0.25)]">
        <span class="text-[var(--cyan-bright)] text-sm font-mono font-bold transition-transform duration-300 group-hover/logo:scale-110 group-hover/logo:-rotate-6">R</span>
      </div>
      <span class="text-[18px] text-[var(--text)]/95 group-hover/logo:text-[var(--text)] transition-colors duration-300">Puno<span class="text-[var(--gold)] animate-pulse">_</span></span>
    </a>
    
    <!-- Desktop Nav Links -->
    <div class="hidden lg:flex items-center gap-6">
      <nav class="desktop-nav flex items-center gap-1.5 p-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)]/90 backdrop-blur-md shadow-inner transition-all duration-300 hover:border-[var(--cyan)]/50 hover:shadow-[0_0_20px_rgba(6,188,226,0.12)]">
        <a
          v-for="item in ['About', 'Skills', 'Projects', 'Contact']"
          :key="item"
          :href="`#${item.toLowerCase()}`"
          class="nav-link px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-1.5 hover:-translate-y-0.5"
          :class="activeSection === item.toLowerCase() 
            ? 'bg-[var(--cyan)] text-black font-bold shadow-md shadow-cyan-500/30' 
            : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-raised)]/90'"
        >
          <span v-if="activeSection === item.toLowerCase()" class="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
          {{ item }}
        </a>
      </nav>

      <!-- Command Palette Button -->
      <button
        class="group/cmd flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-raised)] hover:border-[var(--cyan)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(35,211,240,0.25)] cursor-pointer"
        @click="emit('openCommandPalette')"
      >
        <span class="text-[11px] font-mono text-[var(--muted)] group-hover/cmd:text-[var(--text)]">Search / </span>
        <span class="px-1.5 py-0.5 rounded shadow-sm bg-[var(--surface-raised)] border border-[var(--line)] text-[10px] font-mono text-[var(--cyan-bright)] group-hover/cmd:border-[var(--cyan)] group-hover/cmd:scale-110 transition-all">⌘K</span>
      </button>

      <!-- Theme Toggle Button -->
      <button
        class="group/theme relative p-2.5 rounded-full border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--gold)] hover:bg-[var(--surface-raised)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_18px_rgba(244,179,46,0.3)] cursor-pointer"
        @click="emit('toggleTheme')"
        aria-label="Toggle theme"
      >
        <span class="block text-base transition-transform duration-500 group-hover/theme:rotate-[180deg] group-hover/theme:scale-110">
          {{ theme === 'dark' ? '☀️' : '🌙' }}
        </span>
      </button>
    </div>

    <!-- Mobile Menu Buttons -->
    <div class="flex items-center gap-2.5 lg:hidden">
      <button
        @click="emit('toggleTheme')"
        class="p-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-sm"
      >
        {{ theme === 'dark' ? '☀️' : '🌙' }}
      </button>
      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="p-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-sm font-mono"
      >
        {{ mobileMenuOpen ? '✕' : '☰' }}
      </button>
    </div>

    <!-- Mobile Drawer -->
    <div
      v-if="mobileMenuOpen"
      class="fixed inset-x-4 top-20 z-50 p-6 rounded-3xl border border-[var(--line)] bg-[var(--surface)]/95 backdrop-blur-2xl shadow-2xl lg:hidden animate-slide-down"
    >
      <nav class="flex flex-col gap-3 text-center">
        <a
          v-for="item in ['Home', 'About', 'Skills', 'Projects', 'Contact']"
          :key="item"
          :href="`#${item.toLowerCase()}`"
          @click="mobileMenuOpen = false"
          class="py-2.5 text-base font-semibold border-b border-[var(--line)]/50 hover:text-[var(--cyan-bright)] transition-colors"
        >
          {{ item }}
        </a>
      </nav>
      </div>
    </header>
  </div>
</template>

<style scoped>
</style>
