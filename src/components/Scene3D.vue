<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number
let cleanupScene: (() => void) | undefined
let mouseX = 0
let mouseY = 0

interface Vec3 { x: number; y: number; z: number }

// Icosahedron vertices
const PHI = (1 + Math.sqrt(5)) / 2

const baseVertices: Vec3[] = [
  { x: -1, y: PHI, z: 0 }, { x: 1, y: PHI, z: 0 },
  { x: -1, y: -PHI, z: 0 }, { x: 1, y: -PHI, z: 0 },
  { x: 0, y: -1, z: PHI }, { x: 0, y: 1, z: PHI },
  { x: 0, y: -1, z: -PHI }, { x: 0, y: 1, z: -PHI },
  { x: PHI, y: 0, z: -1 }, { x: PHI, y: 0, z: 1 },
  { x: -PHI, y: 0, z: -1 }, { x: -PHI, y: 0, z: 1 }
]

const edges: [number, number][] = [
  [0, 1], [0, 5], [0, 7], [0, 10], [0, 11],
  [1, 5], [1, 7], [1, 8], [1, 9],
  [2, 3], [2, 4], [2, 6], [2, 10], [2, 11],
  [3, 4], [3, 6], [3, 8], [3, 9],
  [4, 5], [4, 9], [4, 11],
  [5, 9], [5, 11],
  [6, 7], [6, 8], [6, 10],
  [7, 8], [7, 10],
  [8, 9],
  [10, 11]
]

function rotateY(v: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  return { x: v.x * cos + v.z * sin, y: v.y, z: -v.x * sin + v.z * cos }
}

function rotateX(v: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  return { x: v.x, y: v.y * cos - v.z * sin, z: v.y * sin + v.z * cos }
}

function project(v: Vec3, cx: number, cy: number, scale: number, fov: number): { x: number; y: number; depth: number } {
  const z = v.z + fov
  const factor = fov / z
  return {
    x: cx + v.x * scale * factor,
    y: cy + v.y * scale * factor,
    depth: z
  }
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let width = 0
  let height = 0

  const resize = () => {
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    width = canvas.clientWidth
    height = canvas.clientHeight
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)
  }
  resize()
  window.addEventListener('resize', resize)

  const onMouseMove = (e: MouseEvent) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2
  }
  window.addEventListener('mousemove', onMouseMove, { passive: true })

  let time = 0
  const render = () => {
    time += 0.008
    ctx.clearRect(0, 0, width, height)

    const cx = width / 2
    const cy = height / 2
    const scale = Math.min(width, height) * 0.18
    const fov = 5

    // Mouse-influenced rotation
    const rotXAngle = time * 0.4 + mouseY * 0.3
    const rotYAngle = time * 0.6 + mouseX * 0.5

    const projected = baseVertices.map(v => {
      let rv = rotateX(v, rotXAngle)
      rv = rotateY(rv, rotYAngle)
      return project(rv, cx, cy, scale, fov)
    })

    // Draw edges with depth-based opacity
    edges.forEach(([i, j]) => {
      const a = projected[i]
      const b = projected[j]
      const avgDepth = (a.depth + b.depth) / 2
      const alpha = Math.max(0.08, Math.min(0.55, (avgDepth - 2) / 8))

      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.strokeStyle = `rgba(35, 211, 240, ${alpha})`
      ctx.lineWidth = 1
      ctx.stroke()
    })

    // Draw vertices
    projected.forEach(p => {
      const alpha = Math.max(0.2, Math.min(0.8, (p.depth - 2) / 6))
      const radius = Math.max(1, 3 * (fov / p.depth))
      ctx.beginPath()
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(35, 211, 240, ${alpha})`
      ctx.fill()

      // glow
      ctx.beginPath()
      ctx.arc(p.x, p.y, radius * 2.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(35, 211, 240, ${alpha * 0.15})`
      ctx.fill()
    })

    animationId = requestAnimationFrame(render)
  }

  render()
  cleanupScene = () => {
    window.removeEventListener('resize', resize)
    window.removeEventListener('mousemove', onMouseMove)
    cancelAnimationFrame(animationId)
  }
})

onUnmounted(() => {
  cleanupScene?.()
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="scene3d-canvas absolute inset-0 w-full h-full pointer-events-none opacity-40"
    aria-hidden="true"
  ></canvas>
</template>

<style scoped>
.scene3d-canvas {
  mix-blend-mode: screen;
}
:root[data-theme='light'] .scene3d-canvas {
  opacity: 0.2;
}
</style>
