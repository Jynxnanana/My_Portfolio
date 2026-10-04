<script setup lang="ts">
import { ref } from 'vue'
import type { Project } from '../types/portfolio'
import nfaPreview from '../assets/nfa-lab-preview.svg'
import bsedPortalPreview from '../assets/chcc-bsed-portal-preview.svg'

defineProps<{ projects: Project[] }>()
const selectedProject = ref<Project | null>(null)

const stopCardOpen = (event: MouseEvent) => event.stopPropagation()

</script>

<template>
  <section id="projects" class="projects-section relative z-10 mx-auto px-6 py-24 max-w-[1240px]">
    <div class="reveal mb-14 border-b border-[var(--line)] pb-4">
      <p class="text-[var(--gold)] font-mono text-[10px] uppercase tracking-widest mb-3">03 / Selected Works</p>
      <h2 class="text-3xl sm:text-5xl font-bold tracking-tighter">Case <span>Studies.</span></h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <article
        v-for="project in projects"
        :key="project.number"
        class="project-card reveal group relative spotlight-card rounded-3xl border border-[var(--line)] bg-[var(--surface)] overflow-hidden cursor-pointer hover:shadow-[0_0_35px_rgba(6,188,226,0.12)] hover:-translate-y-1.5 transition-all duration-300"
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
          <a
            v-if="project.demoUrl"
            :href="project.demoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-xl border border-[var(--line)] bg-[var(--bg)] text-[var(--text)] text-xs font-semibold hover:border-[var(--cyan)] hover:text-[var(--cyan-bright)] transition-colors cursor-pointer"
            @click="stopCardOpen"
          >
            Open live project <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    </div>

    <!-- Modal -->
    <Teleport to="body">
    <div v-if="selectedProject" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-slide-up pointer-events-auto" style="z-index: 2147483647; pointer-events: auto" @click.self="selectedProject = null">
      <div class="animate-modal-pop w-full max-w-lg bg-[var(--surface)] border border-[var(--line)] rounded-3xl p-6 sm:p-8 shadow-2xl relative modal-3d pointer-events-auto" style="pointer-events: auto">
        <button type="button" class="absolute top-6 right-6 z-10 cursor-pointer text-[var(--muted)] hover:text-white text-lg p-2" style="pointer-events: auto" @click.stop="selectedProject = null">✕</button>
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
          <a v-if="selectedProject.demoUrl" :href="selectedProject.demoUrl" target="_blank" rel="noopener noreferrer" class="primary-button relative z-10 cursor-pointer px-5 py-2.5 rounded-xl font-semibold text-xs" style="pointer-events: auto">View Live System ↗</a>
          <button type="button" class="secondary-button relative z-10 cursor-pointer px-5 py-2.5 rounded-xl font-semibold border border-[var(--line)] text-xs" style="pointer-events: auto" @click.stop="selectedProject = null">Close</button>
        </div>
      </div>
    </div>
    </Teleport>
  </section>
</template>

<style scoped>
.modal-3d {
  transform-style: preserve-3d;
  transform: perspective(1000px) rotateX(5deg);
}
</style>
