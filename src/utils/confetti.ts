export function triggerConfetti(originX = window.innerWidth / 2, originY = window.innerHeight / 2) {
  const canvas = document.createElement('canvas')
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100vw'
  canvas.style.height = '100vh'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '99999'
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    document.body.removeChild(canvas)
    return
  }

  const dpr = window.devicePixelRatio || 1
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  ctx.scale(dpr, dpr)

  const colors = ['#06bce2', '#23d3f0', '#f4b32e', '#18c77a', '#ffffff', '#e879f9']
  const particleCount = 60
  const particles: Array<{
    x: number
    y: number
    vx: number
    vy: number
    color: string
    size: number
    alpha: number
    rotation: number
    vRot: number
  }> = []

  for (let i = 0; i < particleCount; i++) {
    const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5)
    const speed = Math.random() * 8 + 4
    particles.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 4,
      alpha: 1,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10
    })
  }

  let animationFrame: number
  const render = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    let active = 0

    particles.forEach((p) => {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.22 // gravity
      p.vx *= 0.98 // drag
      p.rotation += p.vRot
      p.alpha -= 0.016

      if (p.alpha > 0) {
        active++
        ctx.save()
        ctx.globalAlpha = Math.max(0, p.alpha)
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        ctx.restore()
      }
    })

    if (active > 0) {
      animationFrame = requestAnimationFrame(render)
    } else {
      cancelAnimationFrame(animationFrame)
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas)
      }
    }
  }

  render()
}
