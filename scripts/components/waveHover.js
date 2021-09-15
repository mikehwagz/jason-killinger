import { component } from 'picoapp'
import choozy from 'choozy'
import { rect } from 'martha'
import hover from '../lib/hover'
import gsap from 'gsap'

export default component((node, ctx) => {
  let { wrap, canvas } = choozy(node)
  let c2d = canvas.getContext('2d')
  let tl = gsap.timeline({ paused: true })

  let lineWidth = 8
  let speed = 4
  let frequency = 0.14

  let offHover = hover(
    node,
    () => {
      tl.clear()
        .to(wrap, {
          opacity: 1,
          duration: 0.5,
          ease: 'cubic',
        })
        .restart()
    },
    () => {
      tl.clear()
        .to(wrap, {
          opacity: 0,
          duration: 0.5,
          ease: 'cubic',
        })
        .restart()
    },
  )

  ctx.on('tick', ({ time }) => {
    let { width, height } = c2d.canvas

    let mid = height / 2
    let amp = -height / 2 + lineWidth * 2

    c2d.clearRect(0, 0, width, height)
    c2d.beginPath()

    for (let i = 0; i < width - lineWidth * 2; i++) {
      c2d.lineTo(
        lineWidth + i,
        mid + amp * Math.sin(i * frequency + time * speed),
      )
    }

    c2d.strokeStyle = getComputedStyle(node.closest('header')).color
    c2d.lineCap = 'round'
    c2d.lineWidth = lineWidth
    c2d.stroke()
  })

  let ro = new ResizeObserver((entries) => {
    for (let entry of entries) {
      if (entry?.devicePixelContentBoxSize?.[0]) {
        const { inlineSize, blockSize } = entry.devicePixelContentBoxSize[0]
        canvas.width = inlineSize
        canvas.height = blockSize
      }
    }
  })

  ro.observe(canvas)

  return () => {
    ro.unobserve(canvas)
    offHover()
  }
})
