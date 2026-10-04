<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { triggerConfetti } from '../utils/confetti'

const emit = defineEmits<{
  (e: 'showToast', message: string): void
}>()

const form = ref({ name: '', email: '', message: '' })
const isSubmitting = ref(false)

// FormSubmit.co — free, no account needed.
// IMPORTANT: On the first submission, a confirmation email will be sent to rubenpunojr6@gmail.com.
// Just click the confirmation link in that email to activate, and all future messages will go straight to your inbox.
const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/rubenpunojr6@gmail.com'

const handleSubmit = async (e: Event) => {
  if (!form.value.name || !form.value.email || !form.value.message) {
    emit('showToast', '⚠️ Please fill in all fields.')
    return
  }
  isSubmitting.value = true

  try {
    const response = await fetch(FORMSUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: form.value.name,
        email: form.value.email,
        message: form.value.message,
        _subject: `New Portfolio Message from ${form.value.name}`,
        _captcha: 'false',
        _template: 'table'
      })
    })

    const data = await response.json()

    if (response.ok && data.success === 'true') {
      const btn = (e.target as HTMLElement).querySelector('button[type="submit"]') as HTMLElement
      const rect = btn?.getBoundingClientRect()
      if (rect) triggerConfetti(rect.left + rect.width / 2, rect.top)
      emit('showToast', '🚀 Message sent! Thanks for reaching out.')
      form.value = { name: '', email: '', message: '' }
    } else {
      emit('showToast', '❌ Something went wrong. Please try again later.')
    }
  } catch (error) {
    emit('showToast', '❌ No internet connection or server error. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section id="contact" class="contact-section relative z-10 mx-auto px-6 py-24 max-w-[1240px]">
    <div class="reveal mb-14 border-b border-[var(--line)] pb-4">
      <p class="text-[var(--gold)] font-mono text-[10px] uppercase tracking-widest mb-3">04 / Start A Conversation</p>
      <h2 class="text-3xl sm:text-5xl font-bold tracking-tighter">Let's build <span>together.</span></h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div class="reveal flex flex-col justify-between">
        <div>
          <h3 class="text-2xl sm:text-3xl font-bold mb-4">Have an ambitious project in mind?</h3>
          <p class="text-[var(--muted)] leading-relaxed mb-8">
            Whether you need a full-scale Vue application, a scalable design system, or performance consulting, I'm always open to discussing new opportunities.
          </p>

          <div class="space-y-4">
            <div class="flex items-center gap-4 text-sm p-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--cyan)] transition-all">
              <span class="w-10 h-10 rounded-full border border-[var(--line)] bg-[var(--bg)] flex items-center justify-center text-lg">✉️</span>
              <div>
                <div class="text-[10px] uppercase font-mono text-[var(--muted)]">Direct Email</div>
                <span class="font-mono text-[var(--cyan-bright)] text-sm">rubenpunojr6@gmail.com</span>
              </div>
            </div>

            <div class="flex items-center gap-4 text-sm p-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
              <span class="w-10 h-10 rounded-full border border-[var(--line)] bg-[var(--bg)] flex items-center justify-center text-lg">📍</span>
              <div>
                <div class="text-[10px] uppercase font-mono text-[var(--muted)]">Location</div>
                <span class="text-[var(--text)] text-sm">Tarlac, Philippines</span>
              </div>
            </div>

            <!-- Social Links -->
            <div class="pt-2">
              <div class="text-[10px] uppercase font-mono text-[var(--muted)] mb-3">Connect with me</div>
              <div class="flex items-center gap-3">
                <a
                  href="https://github.com/Jynxnanana"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--cyan)] hover:bg-[var(--cyan)]/10 hover:scale-105 active:scale-95 transition-all text-sm font-medium"
                >
                  <Icon icon="mdi:github" class="w-5 h-5 text-[var(--muted)] group-hover:text-[var(--cyan-bright)] transition-colors" />
                  <span class="text-[var(--text)] group-hover:text-[var(--cyan-bright)] transition-colors">GitHub</span>
                </a>
                <a
                  href="https://www.facebook.com/ruben.puno.56"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--cyan)] hover:bg-[var(--cyan)]/10 hover:scale-105 active:scale-95 transition-all text-sm font-medium"
                >
                  <Icon icon="mdi:facebook" class="w-5 h-5 text-[var(--muted)] group-hover:text-[var(--cyan-bright)] transition-colors" />
                  <span class="text-[var(--text)] group-hover:text-[var(--cyan-bright)] transition-colors">Facebook</span>
                </a>
                <a
                  href="https://www.tiktok.com/@vibe.coder.pro.max?lang=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--cyan)] hover:bg-[var(--cyan)]/10 hover:scale-105 active:scale-95 transition-all text-sm font-medium"
                >
                  <Icon icon="ic:baseline-tiktok" class="w-5 h-5 text-[var(--muted)] group-hover:text-[var(--cyan-bright)] transition-colors" />
                  <span class="text-[var(--text)] group-hover:text-[var(--cyan-bright)] transition-colors">TikTok</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="reveal spotlight-card p-8 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-2xl">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-xs font-mono uppercase text-[var(--muted)] mb-2">Your Name</label>
            <input v-model="form.name" type="text" placeholder="Jane Doe" class="w-full bg-[var(--bg)] border border-[var(--line)] rounded-xl px-4 py-3 text-sm focus:border-[var(--cyan)] outline-none transition-colors" />
          </div>
          <div>
            <label class="block text-xs font-mono uppercase text-[var(--muted)] mb-2">Your Email</label>
            <input v-model="form.email" type="email" placeholder="jane@example.com" class="w-full bg-[var(--bg)] border border-[var(--line)] rounded-xl px-4 py-3 text-sm focus:border-[var(--cyan)] outline-none transition-colors" />
          </div>
          <div>
            <label class="block text-xs font-mono uppercase text-[var(--muted)] mb-2">Message</label>
            <textarea v-model="form.message" rows="4" placeholder="Tell me about your project..." class="w-full bg-[var(--bg)] border border-[var(--line)] rounded-xl px-4 py-3 text-sm focus:border-[var(--cyan)] outline-none resize-none transition-colors"></textarea>
          </div>
          <button type="submit" :disabled="isSubmitting" class="w-full primary-button py-3.5 rounded-xl font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all">
            {{ isSubmitting ? 'Sending...' : 'Send Message 🚀' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
