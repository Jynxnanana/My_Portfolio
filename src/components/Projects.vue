<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { Project } from '../types/portfolio'
import nfaPreview from '../assets/nfa-lab-preview.svg'
import bsedPortalPreview from '../assets/chcc-bsed-portal-preview.svg'

defineProps<{ projects: Project[] }>()
const selectedProject = ref<Project | null>(null)

// 3D Parallax state
const parallaxX = ref(0)
const parallaxY = ref(0)

const handleMouseMove = (e: MouseEvent) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2
  const y = (e.clientY / window.innerHeight - 0.5) * 2
  parallaxX.value = x
  parallaxY.value = y
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <section 
    id="projects" 
    class="projects-section relative z-10 mx-auto px-6 py-24 max-w-[1240px]"
    style="perspective: 1200px;"
  >
    <div 
      class="reveal mb-14 border-b border-[var(--line)] pb-4 projects-3d-container"
      :style="{
        transform: `perspective(1200px) rotateX(${-parallaxY * 1.5}deg) rotateY(${parallaxX * 1.5}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out'
      }"
    >
      <p class="text-[var(--gold)] font-mono text-[10px] uppercase tracking-widest mb-3" style="transform: translateZ(20px)">03 / Selected Works</p>
      <h2 class="text-3xl sm:text-5xl font-bold tracking-tighter" style="transform: translateZ(30px)">Case <span>Studies.</span></h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <article
        v-for="(project, index) in projects"
        :key="project.number"
        class="project-card reveal group relative spotlight-card btn-3d rounded-3xl border border-[var(--line)] bg-[var(--surface)] overflow-hidden cursor-pointer hover:shadow-[0_0_35px_rgba(6,188,226,0.12)] hover:-translate-y-1.5 transition-all duration-300"
        :style="{ 
          transform: `translateZ(${index % 2 === 0 ? 20 : 40}px) rotateX(${parallaxY * -2}deg) rotateY(${parallaxX * 2}deg)`,
          transition: 'transform 0.2s ease-out, box-shadow 0.3s ease'
        }"
        @click="selectedProject = project"
      >
        <div class="w-full h-[260px] bg-[var(--bg-raised)] overflow-hidden flex items-center justify-center border-b border-[var(--line)]" :class="['01', '02'].includes(project.number) ? 'p-0' : 'p-6'">
          <img v-if="project.number === '01'" :src="nfaPreview" alt="CHCCI NFA Lab automata builder workspace preview" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
          <img v-else-if="project.number === '02'" :src="bsedPortalPreview" alt="CHCC BSED student portal login page preview" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
          <div v-else-if="project.theme === 'goodside'" class="w-[85%] h-[75%] bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-5 flex flex-col justify-between group-hover:scale-105 transition-all duration-500">
            <div class="flex justify-between text-emerald-300 text-xs font-mono"><span class="uppercase">{{ project.name }} ✳</span><span>APP</span></div>
            <div class="text-emerald-100 font-serif text-xl">Streamlining lab ops.</div>
            <div class="bg-emerald-500/20 text-emerald-200 text-[11px] p-1.5 rounded w-fit">✓ Vercel Live Environment</div>
          </div>

          <div v-else-if="project.theme === 'sonder'" class="w-[85%] h-[75%] bg-amber-950/40 border border-amber-500/30 rounded-2xl p-5 flex flex-col justify-between group-hover:scale-105 transition-all duration-500">
            <div class="flex justify-between text-amber-300 text-xs font-mono"><span class="uppercase">{{ project.name }} ®</span><span>ACADEMIC</span></div>
            <div class="text-amber-100 font-serif text-xl">Student & Faculty Dashboard.</div>
            <div class="text-amber-400 text-xs font-mono">SECURE SYSTEM ↗</div>
          </div>

          <div v-else-if="project.theme === 'morrow'" class="w-[85%] h-[75%] bg-slate-900/60 border border-slate-500/30 rounded-2xl p-5 flex flex-col justify-between group-hover:scale-105 transition-all duration-500">
            <div class="flex justify-between text-slate-300 text-xs font-mono"><span class="uppercase">{{ project.name }}</span><span>FLUTTER</span></div>
            <div class="text-slate-100 font-serif text-xl">Mobile Finance App.</div>
            <div class="text-slate-400 text-xs font-mono">DART COMPILED ↗</div>
          </div>

          <div v-else class="w-[85%] h-[75%] bg-cyan-950/40 border border-cyan-500/30 rounded-2xl p-5 flex flex-col justify-between group-hover:scale-105 transition-all duration-500">
            <div class="flex justify-between text-cyan-300 text-xs font-mono"><span class="uppercase">{{ project.name }}</span><span class="animate-pulse">● LIVE</span></div>
            <div class="text-cyan-100 font-mono text-lg font-bold">Velocity +45%</div>
            <div class="text-cyan-400 text-xs font-mono">CI/CD 99.8%</div>
          </div>
        </div>

        <div class="p-6 bg-[var(--surface)]">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-3">
              <span class="text-[var(--muted)] font-mono text-xs">{{ project.number }}</span>
              <h3 class="text-xl font-bold tracking-tight">{{ project.name }}</h3>
            </div>
            <span class="text-[var(--cyan-bright)] group-hover:translate-x-1 transition-transform">↗</span>
          </div>
          <p class="text-[var(--cyan-bright)] text-xs mb-4">{{ project.tagline }}</p>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in project.services" :key="tag" class="px-2.5 py-0.5 rounded-full border border-[var(--line)] bg-[var(--bg)] text-[var(--muted)] font-mono text-[10px]">{{ tag }}</span>
          </div>
        </div>
      </article>
    </div>

    <!-- Modal -->
    <div v-if="selectedProject" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-slide-up" @click.self="selectedProject = null">
      <div class="animate-modal-pop w-full max-w-lg bg-[var(--surface)] border border-[var(--line)] rounded-3xl p-6 sm:p-8 shadow-2xl relative modal-3d">
        <button class="absolute top-6 right-6 text-[var(--muted)] hover:text-white text-lg p-2" @click="selectedProject = null">✕</button>
        <div class="flex items-center gap-3 mb-2">
          <span class="text-xs font-mono text-[var(--gold)]">{{ selectedProject.number }}</span>
          <h3 class="text-2xl font-bold">{{ selectedProject.name }}</h3>
        </div>
        <p class="text-sm text-[var(--cyan-bright)] mb-4">{{ selectedProject.tagline }}</p>
        <p class="text-xs text-[var(--muted)] leading-relaxed mb-6">{{ selectedProject.summary }}</p>
        <div class="bg-[var(--bg)] p-3.5 rounded-xl border border-[var(--line)] mb-6">
          <div class="text-[10px] font-mono text-[var(--muted)] uppercase">Key Metric Impact</div>
          <div class="text-base font-bold text-[var(--green)]">{{ selectedProject.impact }}</div>
        </div>
        <div class="flex gap-4">
          <a v-if="selectedProject.demoUrl" :href="selectedProject.demoUrl" target="_blank" class="primary-button btn-3d px-5 py-2.5 rounded-xl font-semibold text-xs">View Live System ↗</a>
          <button @click="selectedProject = null" class="secondary-button btn-3d px-5 py-2.5 rounded-xl font-semibold border border-[var(--line)] text-xs">Close</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-3d-container {
  will-change: transform;
}
.modal-3d {
  transform-style: preserve-3d;
  transform: perspective(1000px) rotateX(5deg);
}
</style>
