import { component } from 'picoapp'
import ro from '../lib/ro'

export default component((canvas, ctx) => {
  let c2d = canvas.getContext('2d')
  let lineWidth = 8
  let frequency = 0.14
  let speed = 4

  let offResize = ro(canvas, (w, h) => {
    canvas.width = w
    canvas.height = h
  })

  ctx.on('tick', ({ time }) => {
    let { width, height } = canvas
    let mid = height / 2
    let padding = lineWidth * 2
    let amp = mid - padding

    c2d.clearRect(0, 0, width, height)
    c2d.beginPath()

    for (let i = 0; i < width - padding; i++) {
      c2d.lineTo(
        lineWidth + i,
        mid - amp * Math.sin(i * frequency + time * speed),
      )
    }

    c2d.strokeStyle = getComputedStyle(canvas).color
    c2d.lineCap = 'round'
    c2d.lineWidth = lineWidth
    c2d.stroke()
  })

  return () => {
    offResize()
  }
})
