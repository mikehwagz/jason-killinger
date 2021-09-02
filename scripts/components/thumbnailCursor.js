import { component } from 'picoapp'
import { rect } from 'martha'
import gsap from 'gsap'

export default component((node, ctx) => {
  const thumb = node.parentNode
  node.remove()
  thumb.closest('[data-router-view]').append(node)

  ctx.on('resize', () => {
    gsap.set(node, { x: 0, y: 0 })
    node.rect = rect(node)
  })

  ctx.on('tick', ({ ww, mx, my, scroll }) => {
    thumb.rect = rect(thumb)

    const autoAlpha =
      mx > thumb.rect.left &&
      mx < thumb.rect.right &&
      my > thumb.rect.top &&
      my < thumb.rect.bottom
        ? 1
        : 0

    if (ww >= 768) {
      gsap.set(node, {
        x: mx,
        y: my + scroll.target,
        autoAlpha,
      })
    }

    gsap.set(thumb, {
      cursor: autoAlpha ? 'none' : 'auto',
    })
  })

  return () => {}
})
