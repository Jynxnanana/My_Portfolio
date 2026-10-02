<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number
let mouseX = -1000
let mouseY = -1000

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseAlpha: number
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let width = (canvas.width = window.innerWidth)
  let height = (canvas.height = window.innerHeight)

  const handleResize = () => {
    if (!canvas) return
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
  }
  window.addEventListener('resize', handleResize)

  const handleMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX
    mouseY = e.clientY
  }
  window.addEventListener('mousemove', handleMouseMove)

  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 65)
  const particles: Particle[] = []

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.5 + 0.75,
      baseAlpha: Math.random() * 0.4 + 0.15
    })
  }

  const render = () => {
    ctx.clearRect(0, 0, width, height)

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy

      if (p.x < 0) p.x = width
      if (p.x > width) p.x = 0
      if (p.y < 0) p.y = height
      if (p.y > height) p.y = 0

      // Mouse gentle repulsion
      const dx = mouseX - p.x
      const dy = mouseY - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 120) {
        p.x -= (dx / dist) * 0.8
        p.y -= (dy / dist) * 0.8
      }

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(35, 211, 240, ${p.baseAlpha})`
      ctx.fill()

      // Connect close particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const pjDx = p.x - p2.x
        const pjDy = p.y - p2.y
        const pDist = Math.sqrt(pjDx * pjDx + pjDy * pjDy)

        if (pDist < 110) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.strokeStyle = `rgba(35, 211, 240, ${0.12 * (1 - pDist / 110)})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }
    }

    animationId = requestAnimationFrame(render)
  }

  render()

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('mousemove', handleMouseMove)
    cancelAnimationFrame(animationId)
  })
})
</script>

<template>
  <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <!-- Glowing Ambient Mesh Gradient Orbs -->
    <div class="ambient-orb orb-1"></div>
    <div class="ambient-orb orb-2"></div>
    <div class="ambient-orb orb-3"></div>
    <!-- Interactive Canvas Constellation -->
    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full opacity-60"></canvas>
  </div>
</template>

<style scoped>
.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.22;
  pointer-events: none;
  transition: opacity 0.5s ease;
}

:root[data-theme='light'] .ambient-orb {
  opacity: 0.12;
  filter: blur(80px);
}

.orb-1 {
  top: 5%;
  left: 15%;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, #06bce2, #0284c7);
  animation: orb-float 18s ease-in-out infinite alternate;
}

.orb-2 {
  top: 45%;
  right: 10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #f4b32e, #ea580c);
  animation: orb-float 22s ease-in-out infinite alternate-reverse;
}

.orb-3 {
  bottom: 10%;
  left: 25%;
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, #18c77a, #0d9488);
  animation: orb-float 20s ease-in-out infinite alternate;
}

@keyframes orb-float {
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(40px, -35px) scale(1.08); }
  100% { transform: translate(-30px, 45px) scale(0.95); }
}
</style>
