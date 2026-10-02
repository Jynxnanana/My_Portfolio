<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'toggleTheme'): void
  (e: 'copyEmail'): void
}>()

const query = ref('')

const commands = [
  { id: 'email', label: 'Copy Email Address', icon: '📋', action: () => emit('copyEmail') },
  { id: 'theme', label: 'Toggle Light/Dark Theme', icon: '🌓', action: () => emit('toggleTheme') },
  { id: 'projects', label: 'Explore Projects', icon: '📁', action: () => { window.location.hash = '#projects'; emit('close') } },
  { id: 'skills', label: 'Inspect Skills Toolkit', icon: '⚡', action: () => { window.location.hash = '#skills'; emit('close') } },
  { id: 'contact', label: 'Get in Touch', icon: '✉️', action: () => { window.location.hash = '#contact'; emit('close') } }
]

const filteredCommands = computed(() => {
  if (!query.value) return commands
  return commands.filter(c => c.label.toLowerCase().includes(query.value.toLowerCase()))
})
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-start justify-center pt-24 pb-8 bg-black/60 backdrop-blur-sm px-4" @click.self="emit('close')">
    <div class="w-full max-w-xl bg-[var(--bg-raised)] border border-[var(--line)] rounded-2xl shadow-2xl overflow-hidden text-left animate-slide-down">
      <div class="p-4 border-b border-[var(--line)] flex items-center gap-3 bg-[var(--bg)]">
        <span class="text-[var(--gold)]">🔍</span>
        <input v-model="query" type="text" placeholder="Type a command or jump to section..." class="w-full bg-transparent text-[var(--text)] text-sm outline-none font-mono" autofocus />
        <kbd class="px-2 py-0.5 bg-[var(--surface)] border border-[var(--line)] rounded text-[10px] text-[var(--muted)] cursor-pointer" @click="emit('close')">ESC</kbd>
      </div>
      <div class="p-2 space-y-1">
        <button
          v-for="cmd in filteredCommands"
          :key="cmd.id"
          @click="cmd.action"
          class="w-full text-left px-4 py-3 rounded-xl hover:bg-[var(--cyan)]/10 hover:text-[var(--cyan-bright)] flex items-center gap-3 text-sm transition-colors text-[var(--text)]"
        >
          <span>{{ cmd.icon }}</span>
          <span>{{ cmd.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
