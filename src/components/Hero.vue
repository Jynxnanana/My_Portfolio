<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { triggerConfetti } from '../utils/confetti'

const emit = defineEmits<{ (e: 'copyEmail'): void }>()

const roles = ['3rd Year CS Student', 'Full-Stack Developer', 'Vibe Coder', 'Software Engineer']
const currentRoleText = ref('')
let roleIndex = 0
let charIndex = 0
let isDeleting = false
let typeTimeout: any

const tick = () => {
  const fullText = roles[roleIndex]
  if (isDeleting) {
    charIndex--
    currentRoleText.value = fullText.substring(0, charIndex)
  } else {
    charIndex++
    currentRoleText.value = fullText.substring(0, charIndex)
  }

  let typeSpeed = isDeleting ? 40 : 80
  if (!isDeleting && currentRoleText.value === fullText) {
    typeSpeed = 2200
    isDeleting = true
  } else if (isDeleting && currentRoleText.value === '') {
    isDeleting = false
    roleIndex = (roleIndex + 1) % roles.length
    typeSpeed = 400
  }
  typeTimeout = setTimeout(tick, typeSpeed)
}

const handleCopyEmail = (e: MouseEvent) => {
  triggerConfetti(e.clientX, e.clientY)
  emit('copyEmail')
}

onMounted(() => { tick() })
onUnmounted(() => { clearTimeout(typeTimeout) })
</script>

<template>
  <section id="home" class="hero-section relative z-10 mx-auto flex flex-col items-center justify-center text-center px-6 py-20 sm:py-28 max-w-[960px] min-h-[92vh]">
    
    <!-- Floating Tech Pill 1 -->
    <div class="hidden md:flex absolute -left-4 top-1/4 animate-float-1 items-center gap-2 px-3 py-1.5 rounded-2xl border border-[var(--cyan)]/30 bg-[var(--surface)]/90 backdrop-blur shadow-lg shadow-cyan-500/10 text-xs font-mono text-[var(--cyan-bright)]">
      <span>👨‍💻</span> 3rd Year CS Student
    </div>

    <!-- Floating Tech Pill 2 -->
    <div class="hidden md:flex absolute -right-4 top-1/3 animate-float-2 items-center gap-2 px-3 py-1.5 rounded-2xl border border-[var(--gold)]/30 bg-[var(--surface)]/90 backdrop-blur shadow-lg shadow-amber-500/10 text-xs font-mono text-[var(--gold)]">
      <span>⚛️</span> Vue.js & React
    </div>

    <!-- Floating Tech Pill 3 -->
    <div class="hidden md:flex absolute left-8 bottom-1/4 animate-float-3 items-center gap-2 px-3 py-1.5 rounded-2xl border border-[var(--green)]/30 bg-[var(--surface)]/90 backdrop-blur shadow-lg shadow-emerald-500/10 text-xs font-mono text-[var(--green)]">
      <span>🐘</span> PHP & MySQL Stack
    </div>

    <!-- Status Pill -->
    <div class="reveal inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--cyan)]/40 bg-[var(--cyan)]/10 text-[var(--cyan-bright)] text-xs font-mono font-medium tracking-wide mb-8 shadow-[0_0_20px_rgba(6,188,226,0.15)] hover:scale-105 transition-transform">
      <span class="relative flex h-2 w-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--cyan-bright)] opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-[var(--cyan-bright)]"></span>
      </span>
      ACTIVELY LEARNING & BUILDING
    </div>
    
    <!-- Shimmer Name -->
    <h1 class="hero-name reveal text-[clamp(44px,8.5vw,96px)] font-extrabold tracking-tight leading-[1.05] mb-6">
      RUBEN PUNO<span class="text-[var(--gold)]">.</span>
    </h1>
    
    <!-- Typewriter -->
    <div class="reveal min-h-[42px] flex items-center justify-center text-[clamp(18px,2.8vw,28px)] text-[var(--cyan-bright)] font-semibold mb-6">
      <span>{{ currentRoleText }}</span>
      <span class="role-caret"></span>
    </div>
    
    <p class="hero-intro reveal text-[var(--muted)] text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
      I'm a 3rd Year Computer Science student building fast, resilient, and dynamic applications. Passionate about both frontend aesthetics and robust backend architectures utilizing my diverse tech stack.
    </p>
    
    <div class="hero-actions reveal flex flex-wrap items-center justify-center gap-4 mb-10">
      <a
        href="#projects"
        class="primary-button group inline-flex items-center gap-3 bg-[var(--cyan-bright)] text-[#040e16] px-8 py-4 rounded-2xl font-semibold tracking-wide transition-all shadow-lg hover:shadow-cyan-500/30 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <span>Explore Work</span>
        <span class="group-hover:translate-y-1 transition-transform">↓</span>
      </a>
      <button
        @click="handleCopyEmail"
        class="secondary-button group inline-flex items-center gap-3 bg-[var(--surface)] hover:bg-[var(--surface-raised)] border border-[var(--line)] hover:border-[var(--cyan)] px-8 py-4 rounded-2xl font-semibold transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
      >
        <span>Copy Email</span>
        <span class="group-hover:rotate-12 transition-transform">✨</span>
      </button>
    </div>

    <!-- Social Links -->
    <div class="reveal flex items-center gap-5 mb-16">
      <a href="https://www.facebook.com/ruben.puno.56" target="_blank" rel="noopener noreferrer" class="group flex items-center justify-center w-11 h-11 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--cyan)] hover:bg-[var(--cyan)]/10 hover:scale-110 active:scale-95 transition-all shadow-sm" aria-label="Facebook">
        <Icon icon="mdi:facebook" class="w-5 h-5 text-[var(--muted)] group-hover:text-[var(--cyan-bright)] transition-colors" />
      </a>
      <a href="https://www.tiktok.com/@vibe.coder.pro.max?lang=en" target="_blank" rel="noopener noreferrer" class="group flex items-center justify-center w-11 h-11 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--cyan)] hover:bg-[var(--cyan)]/10 hover:scale-110 active:scale-95 transition-all shadow-sm" aria-label="TikTok">
        <Icon icon="ic:baseline-tiktok" class="w-5 h-5 text-[var(--muted)] group-hover:text-[var(--cyan-bright)] transition-colors" />
      </a>
      <a href="https://github.com/Jynxnanana" target="_blank" rel="noopener noreferrer" class="group flex items-center justify-center w-11 h-11 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--cyan)] hover:bg-[var(--cyan)]/10 hover:scale-110 active:scale-95 transition-all shadow-sm" aria-label="GitHub">
        <Icon icon="mdi:github" class="w-5 h-5 text-[var(--muted)] group-hover:text-[var(--cyan-bright)] transition-colors" />
      </a>
    </div>

    <!-- Animated Scroll Mouse Indicator -->
    <a href="#about" class="reveal inline-flex flex-col items-center gap-2 text-[var(--muted)] hover:text-[var(--cyan-bright)] transition-colors opacity-75 hover:opacity-100">
      <div class="w-5 h-8 rounded-full border-2 border-current flex items-start justify-center p-1">
        <div class="w-1 h-2 rounded-full bg-current animate-mouse-wheel"></div>
      </div>
      <span class="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
    </a>
  </section>
</template>
