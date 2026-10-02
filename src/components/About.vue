<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineProps<{ localTime: string }>()
const activeTab = ref<'dev' | 'phil'>('dev')
const copied = ref(false)
const years = ref(0)
const score = ref(0)

const runCounters = () => {
  let y = 0
  const yT = setInterval(() => { y++; years.value = y; if (y >= 3) clearInterval(yT) }, 120)
  let s = 0
  const sT = setInterval(() => { s += 3; if (s > 99) s = 99; score.value = s; if (s >= 99) clearInterval(sT) }, 30)
}

const copySnippet = async () => {
  const code = activeTab.value === 'dev'
    ? `const dev = {\n  name: 'Ruben Puno',\n  role: '3rd Year CS Student',\n  stack: ['Vue 3', 'React', 'PHP', 'Python', 'Node']\n}`
    : `export const phil = {\n  perf: 'Sub-second LCP',\n  a11y: 'Non-negotiable'\n}`
  try {
    await navigator.clipboard.writeText(code)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (e) {}
}

onMounted(() => {
  const el = document.getElementById('about')
  if (el && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { runCounters(); obs.disconnect() }
    }, { threshold: 0.15 })
    obs.observe(el)
  } else { years.value = 3; score.value = 99 }
})
</script>

<template>
  <section id="about" class="about-section relative z-10 mx-auto px-6 py-24 max-w-[1240px]">
    <div class="reveal mb-14 border-b border-[var(--line)] pb-4">
      <p class="text-[var(--gold)] font-mono text-[10px] uppercase tracking-widest mb-3">01 / A Little About Me</p>
      <h2 class="text-3xl sm:text-5xl font-bold tracking-tighter">Thoughtful by <span>design.</span></h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="spotlight-card reveal p-8 rounded-3xl border border-[var(--line)] bg-[var(--surface)] flex flex-col justify-between hover:shadow-[0_0_30px_rgba(6,188,226,0.12)] transition-all">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--cyan)]/30 bg-[var(--cyan)]/10 text-[var(--cyan-bright)] text-xs font-mono mb-6">
            <span>✨</span> Frontend Craft
          </div>
          <h3 class="text-2xl sm:text-3xl font-bold tracking-tight mb-4">CS Student & Developer</h3>
          <p class="text-[var(--muted)] leading-relaxed mb-6">
            I specialize in crafting high-impact full-stack web applications with rich interactivity and rock-solid architectural foundations utilizing my diverse tech stack.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-[var(--line)]">
          <div class="p-4 rounded-2xl bg-[var(--bg)]/60 border border-[var(--line)]/60 hover:scale-105 transition-transform">
            <div class="text-3xl sm:text-4xl font-extrabold text-[var(--cyan-bright)] flex items-baseline">
              <span>{{ years }}</span><span class="text-xl text-[var(--gold)] ml-0.5">+</span>
            </div>
            <div class="text-xs text-[var(--muted)] font-mono mt-1">Years Building Products</div>
          </div>
          <div class="p-4 rounded-2xl bg-[var(--bg)]/60 border border-[var(--line)]/60 hover:scale-105 transition-transform">
            <div class="text-3xl sm:text-4xl font-extrabold text-[var(--gold)] flex items-baseline">
              <span>{{ score }}</span><span class="text-xl text-[var(--cyan-bright)] ml-0.5">%</span>
            </div>
            <div class="text-xs text-[var(--muted)] font-mono mt-1">Lighthouse Score</div>
          </div>
        </div>
      </div>

      <div class="spotlight-card reveal rounded-3xl border border-[var(--line)] bg-[#020509] overflow-hidden flex flex-col hover:border-[var(--cyan)]/60 transition-all shadow-2xl">
        <div class="flex items-center justify-between px-5 py-3 border-b border-[var(--line)]/60 bg-[#060b13]">
          <div class="flex items-center gap-2">
            <div class="flex gap-1.5 mr-2">
              <div class="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
            </div>
            <div class="flex gap-1">
              <button @click="activeTab = 'dev'" class="px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer" :class="activeTab === 'dev' ? 'bg-[#0f172a] text-[var(--cyan-bright)] border border-cyan-500/40 font-semibold' : 'text-[var(--muted)] hover:text-white'">Developer.vue</button>
              <button @click="activeTab = 'phil'" class="px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer" :class="activeTab === 'phil' ? 'bg-[#0f172a] text-[var(--cyan-bright)] border border-cyan-500/40 font-semibold' : 'text-[var(--muted)] hover:text-white'">Philosophy.ts</button>
            </div>
          </div>
          <button @click="copySnippet" class="text-[11px] font-mono text-[var(--muted)] hover:text-white px-2.5 py-1 rounded border border-[var(--line)]/60 bg-[#090f1a] hover:border-[var(--cyan)] transition-all cursor-pointer">{{ copied ? '✓ Copied' : '📋 Copy' }}</button>
        </div>

        <div class="p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-white/90 min-h-[190px]">
          <template v-if="activeTab === 'dev'">
            <span class="text-[#c678dd]">const</span> <span class="text-[#e5c07b]">engineer</span> = {<br/>
            &nbsp;&nbsp;name: <span class="text-[#98c379]">'Ruben Puno'</span>,<br/>
            &nbsp;&nbsp;role: <span class="text-[#98c379]">'3rd Year CS Student'</span>,<br/>
            &nbsp;&nbsp;stack: [<span class="text-[#98c379]">'Vue 3'</span>, <span class="text-[#98c379]">'React'</span>, <span class="text-[#98c379]">'PHP'</span>, <span class="text-[#98c379]">'Python'</span>]<br/>
            }
          </template>
          <template v-else>
            <span class="text-[#c678dd]">export const</span> <span class="text-[#e5c07b]">philosophy</span> = {<br/>
            &nbsp;&nbsp;accessibility: <span class="text-[#98c379]">'Non-negotiable'</span>,<br/>
            &nbsp;&nbsp;performance: <span class="text-[#98c379]">'Sub-second LCP & lightweight bundles'</span><br/>
            }
          </template>
        </div>

        <div class="mt-auto px-6 py-4 border-t border-[var(--line)]/40 bg-[#050811] flex items-center justify-between text-xs text-[var(--muted)] font-mono">
          <span class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-[var(--green)] animate-ping"></span>Tarlac, PH (UTC+8)</span>
          <span class="text-[var(--cyan-bright)] font-semibold">{{ localTime }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
