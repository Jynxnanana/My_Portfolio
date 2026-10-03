<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { Skill, SkillCategory } from '../types/portfolio'

const props = defineProps<{ skills: Skill[] }>()
const activeFilter = ref<SkillCategory>('all')

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
</script>

<template>
  <section id="skills" class="skills-section relative z-10 mx-auto px-6 py-24 max-w-[1240px]">
    <div class="reveal mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--line)] pb-4">
      <div>
        <p class="text-[var(--gold)] font-mono text-[10px] uppercase tracking-widest mb-3">02 / Technical Toolkit</p>
        <h2 class="text-3xl sm:text-5xl font-bold tracking-tighter">Selected <span>proficiencies.</span></h2>
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="cat in categories"
          :key="cat.value"
          @click="activeFilter = cat.value"
          class="px-4 py-2 rounded-full text-xs font-mono transition-all duration-300"
          :class="activeFilter === cat.value ? 'bg-[var(--cyan)] text-black font-bold shadow-lg shadow-cyan-500/20 scale-105' : 'bg-[var(--surface)] text-[var(--muted)] hover:text-white border border-[var(--line)]'"
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
        v-for="skill in filteredSkills"
        :key="skill.name"
        class="skill-card spotlight-card p-6 rounded-2xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--cyan)] hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(6,188,226,0.1)] transition-all duration-300 flex flex-col justify-between"
      >
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="text-3xl p-2 rounded-xl bg-[var(--bg)] border border-[var(--line)]"><Icon :icon="skill.icon" /></span>
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
.skill-list-enter-active,
.skill-list-leave-active {
  transition: all 0.35s ease;
}
.skill-list-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.95);
}
.skill-list-leave-to {
  opacity: 0;
  transform: scale(0.92);
}
</style>
