// Background particles. Inlined into the HTML right after <body> (see nuxt.config.ts) so they start
// with the first paint instead of waiting for Vue: plain JS, no imports, nothing from the app.
(() => {
  const QUANTITY = 100
  const STATICITY = 50 // higher = particles react less to the cursor
  const EASE = 50 // higher = particles follow the cursor more slowly

  const canvas = document.createElement('canvas')
  canvas.id = 'particles'
  canvas.setAttribute('aria-hidden', 'true')
  document.body.prepend(canvas)
  const context = canvas.getContext('2d')

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const mouse = { x: 0, y: 0 }
  let circles = []
  let width = 0
  let height = 0
  let dpr = 1
  let frame = 0

  // Nuxt color-mode puts the `dark` class on <html> before the first paint, and toggles it with the theme
  const rgb = () => document.documentElement.classList.contains('dark') ? '255, 255, 255' : '23, 23, 23'

  function createCircle() {
    return {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
      translateX: 0,
      translateY: 0,
      size: Math.floor(Math.random() * 2) + 1,
      alpha: 0,
      targetAlpha: Number.parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      magnetism: 0.1 + Math.random() * 4,
    }
  }

  function drawCircle(circle, color) {
    context.translate(circle.translateX, circle.translateY)
    context.beginPath()
    context.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI)
    context.fillStyle = `rgba(${color}, ${circle.alpha})`
    context.fill()
    context.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  /** 0 at the edge, 1 once a particle is 20px inside, so particles fade out near the borders */
  function edgeFade(circle) {
    const closestEdge = Math.min(
      circle.x + circle.translateX - circle.size,
      width - circle.x - circle.translateX - circle.size,
      circle.y + circle.translateY - circle.size,
      height - circle.y - circle.translateY - circle.size,
    )
    return Math.max(closestEdge / 20, 0)
  }

  function render() {
    const color = rgb()
    context.clearRect(0, 0, width, height)
    for (const circle of circles) drawCircle(circle, color)
  }

  function tick() {
    circles = circles.map((circle) => {
      const fade = edgeFade(circle)
      circle.alpha = fade > 1 ? Math.min(circle.alpha + 0.02, circle.targetAlpha) : circle.targetAlpha * fade
      circle.x += circle.dx
      circle.y += circle.dy
      circle.translateX += (mouse.x / (STATICITY / circle.magnetism) - circle.translateX) / EASE
      circle.translateY += (mouse.y / (STATICITY / circle.magnetism) - circle.translateY) / EASE
      // A particle that drifted off screen is replaced by a fresh one
      const outside = circle.x < -circle.size || circle.x > width + circle.size
        || circle.y < -circle.size || circle.y > height + circle.size
      return outside ? createCircle() : circle
    })
    render()
    frame = requestAnimationFrame(tick)
  }

  function start() {
    cancelAnimationFrame(frame)
    dpr = window.devicePixelRatio || 1
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    context.setTransform(dpr, 0, 0, dpr, 0, 0)
    // The initial particles are visible right away (only respawned ones fade in), so the first frame isn't empty
    circles = Array.from({ length: QUANTITY }, () => {
      const circle = createCircle()
      circle.alpha = circle.targetAlpha
      return circle
    })
    if (reducedMotion.matches) {
      // Drawn once and never moving
      render()
    }
    else
      tick()
  }

  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX - width / 2
    mouse.y = e.clientY - height / 2
  }, { passive: true })

  let resizeTimer
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(start, 150)
  }, { passive: true })

  reducedMotion.addEventListener('change', start)

  // Static particles have to be redrawn in the new colour when the theme changes
  new MutationObserver(() => reducedMotion.matches && render())
    .observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  start()
})()
