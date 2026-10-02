<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { skills, projects } from './data/portfolio'
import AmbientBackground from './components/AmbientBackground.vue'
import CustomCursor from './components/CustomCursor.vue'
import ScrollProgressBar from './components/ScrollProgressBar.vue'
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Skills from './components/Skills.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import CommandPalette from './components/CommandPalette.vue'

const theme = ref<'light' | 'dark'>('dark')
const commandPaletteOpen = ref(false)
const toastMessage = ref<string | null>(null)
const localTime = ref('')

let revealObserver: IntersectionObserver
let clockInterval: any

const applyTheme = () => {
  document.documentElement.dataset.theme = theme.value
  document.documentElement.style.setProperty('color-scheme', theme.value)
}

const showToast = (msg: string) => {
  toastMessage.value = msg
  setTimeout(() => { toastMessage.value = null }, 3000)
}

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  applyTheme()
  localStorage.setItem('portfolio-theme', theme.value)
  showToast(theme.value === 'dark' ? '🌙 Dark mode activated' : '☀️ Light mode activated')
}

const updateTime = () => {
  localTime.value = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).format(new Date())
}

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('rubenpunojr6@gmail.com')
    showToast('✨ Copied rubenpunojr6@gmail.com to clipboard!')
  } catch (err) {
    showToast('rubenpunojr6@gmail.com')
  }
}

// Update the spotlight and subtle 3D tilt only for the card under the pointer.
const handleCardMouseMove = (e: MouseEvent) => {
  const target = e.target as HTMLElement | null
  const card = target?.closest('.spotlight-card') as HTMLElement | null
  if (card) {
    const rect = card.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
    card.style.setProperty('--tilt-x', `${-y * 7}deg`)
    card.style.setProperty('--tilt-y', `${x * 7}deg`)
  }
}

const handleCardMouseOut = (e: MouseEvent) => {
  const target = e.target as HTMLElement | null
  const card = target?.closest('.spotlight-card') as HTMLElement | null
  const nextTarget = e.relatedTarget as Node | null
  if (card && (!nextTarget || !card.contains(nextTarget))) {
    card.style.setProperty('--tilt-x', '0deg')
    card.style.setProperty('--tilt-y', '0deg')
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    commandPaletteOpen.value = !commandPaletteOpen.value
  }
  if (e.key === 'Escape') commandPaletteOpen.value = false
}

onMounted(() => {
  theme.value = (localStorage.getItem('portfolio-theme') as 'light' | 'dark') || 'dark'
  applyTheme()
  updateTime()
  clockInterval = setInterval(updateTime, 1000)

  window.addEventListener('mousemove', handleCardMouseMove, { passive: true })
  window.addEventListener('mouseout', handleCardMouseOut)
  window.addEventListener('keydown', handleKeydown)

  const revealItems = document.querySelectorAll('.reveal')
  document.documentElement.classList.add('reveal-enabled')
  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'))
    return
  }

  revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })

  revealItems.forEach((item, index) => {
    (item as HTMLElement).style.setProperty('--reveal-delay', `${(index % 4) * 60}ms`)
    revealObserver.observe(item)
  })
})

onUnmounted(() => {
  revealObserver?.disconnect()
  clearInterval(clockInterval)
  window.removeEventListener('mousemove', handleCardMouseMove)
  window.removeEventListener('mouseout', handleCardMouseOut)
  window.removeEventListener('keydown', handleKeydown)
  document.documentElement.classList.remove('reveal-enabled')
})
</script>

<template>
  <div class="site-shell min-h-screen relative selection:bg-[var(--cyan)] selection:text-white">
    <!-- Ambient Particle Constellation & Glow Orbs -->
    <AmbientBackground />

    <!-- Custom Cursor Follower (Strict pointer-events-none) -->
    <CustomCursor />

    <Header
      :theme="theme"
      @toggle-theme="toggleTheme"
      @open-command-palette="commandPaletteOpen = true"
    />
    <ScrollProgressBar />

    <main class="relative z-10 pt-[80px]">
      <Hero @copy-email="copyEmail" />
      <About :local-time="localTime" />
      <Skills :skills="skills" />
      <Projects :projects="projects" />
      <Contact @show-toast="showToast" />
    </main>

    <footer class="site-footer relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16 border-t border-[var(--line)]">
      <a class="wordmark flex items-center gap-1.5 font-bold text-sm tracking-tight hover:opacity-80 transition-opacity" href="#home">
        <div class="flex items-center justify-center w-6 h-6 rounded-md bg-[var(--surface-raised)] border border-[var(--line)]">
          <span class="text-[var(--cyan-bright)] text-[10px] font-mono font-bold">R</span>
        </div>
        <span class="text-white/80">Puno<span class="text-[var(--gold)]">_</span></span>
      </a>
      <p class="text-xs text-[var(--muted)] font-mono">© {{ new Date().getFullYear() }} Ruben Puno · Designed & Built with Vue 3 + TypeScript</p>
      <a class="text-xs text-[var(--muted)] hover:text-[var(--cyan-bright)] transition-colors font-mono" href="#home">Back to top ↑</a>
    </footer>

    <CommandPalette
      :is-open="commandPaletteOpen"
      @close="commandPaletteOpen = false"
      @toggle-theme="toggleTheme"
      @copy-email="copyEmail"
    />

    <div v-if="toastMessage" class="fixed bottom-6 right-6 z-50 bg-[var(--surface-raised)] border border-[var(--cyan)] text-[var(--text)] text-sm px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-up">
      {{ toastMessage }}
    </div>
  </div>
</template>
