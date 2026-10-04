<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { Skill, SkillCategory } from '../types/portfolio'

const props = defineProps<{ skills: Skill[] }>()
const activeFilter = ref<SkillCategory>('all')

// 3D Parallax state
const parallaxX = ref(0)
const parallaxY = ref(0)

const categories: { label: string; value: SkillCategory }[] = [
  { label: 'All Stack', value: 'all' },
  { label: 'Frontend & UI', value: 'frontend' },
  { label: 'Backend & DB', value: 'backend' },
  { label: 'Mobile & Apps', value: 'mobile' },
  { label: 'Software & Core', value: 'software' },
  { label: 'Tools', value: 'tools' }
]

const filteredSkills = computed(() => {
  if (activeFilter.value === 'all') return props.skills
  return props.skills.filter(s => s.category === activeFilter.value)
})

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
    id="skills" 
    class="skills-section relative z-10 mx-auto px-6 py-24 max-w-[1240px]"
    style="perspective: 1000px;"
  >
    <div 
      class="reveal mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--line)] pb-4 skills-3d-container"
      :style="{
        transform: `perspective(1000px) rotateX(${-parallaxY * 2}deg) rotateY(${parallaxX * 2}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out'
      }"
    >
      <div style="transform: translateZ(20px)">
        <p class="text-[var(--gold)] font-mono text-[10px] uppercase tracking-widest mb-3">02 / Technical Toolkit</p>
        <h2 class="text-3xl sm:text-5xl font-bold tracking-tighter">Selected <span>proficiencies.</span></h2>
      </div>

      <div class="flex flex-wrap gap-2" style="transform: translateZ(30px)">
        <button
          v-for="cat in categories"
          :key="cat.value"
          @click="activeFilter = cat.value"
          class="btn-3d px-4 py-2 rounded-full text-xs font-mono transition-all duration-300"
          :class="activeFilter === cat.value ? 'bg-[var(--cyan)] text-black font-bold shadow-lg shadow-cyan-500/20 scale-105' : 'bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)] border border-[var(--line)]'"
        >
          {{ cat.label }}
        </button>
      </div>
    </div>

    <TransitionGroup
      tag="div"
      name="skill-list"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <div
        v-for="(skill, index) in filteredSkills"
        :key="skill.name"
        class="skill-card spotlight-card btn-3d p-6 rounded-2xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--cyan)] hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(6,188,226,0.1)] transition-all duration-300 flex flex-col justify-between"
        :style="{ 
          transform: `translateZ(${10 + (index % 4) * 10}px)`,
          transitionDelay: `${index * 50}ms`
        }"
      >
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="text-3xl p-2 rounded-xl bg-[var(--bg)] border border-[var(--line)] icon-3d"><Icon :icon="skill.icon" /></span>
            <span class="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border border-[var(--line)] text-[var(--cyan-bright)] bg-[var(--bg)]">{{ skill.level }}</span>
          </div>
          <h3 class="text-lg font-bold tracking-tight mb-2">{{ skill.name }}</h3>
          <p class="text-xs text-[var(--muted)] leading-relaxed">{{ skill.usage }}</p>
        </div>
      </div>
    </TransitionGroup>
  </section>
</template>

<style scoped>
.skills-3d-container {
  will-change: transform;
}
.skill-list-enter-active,
.skill-list-leave-active {
  transition: all 0.35s ease;
}
.skill-list-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.95) translateZ(-50px);
}
.skill-list-leave-to {
  opacity: 0;
  transform: scale(0.92) translateZ(-50px);
}
.icon-3d {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.skill-card:hover .icon-3d {
  transform: translateZ(20px) scale(1.1) rotateY(15deg);
}
</style>
