import { component } from 'picoapp'
import createEmbla from 'embla-carousel'
import choozy from 'choozy'
import { rect, on } from 'martha'
import gsap from 'gsap'

export default component((node, ctx) => {
  const { carousel, page, cursor } = choozy(node)
  const embla = createEmbla(carousel, { loop: true })
  let action = () => {}

  embla.on('select', () => {
    page.textContent = embla.selectedScrollSnap() + 1
  })

  let offClick = on(node, 'click', () => {
    embla.clickAllowed() && action()
  })

  cursor.remove()
  node.closest('[data-router-view]').append(cursor)

  ctx.on('resize', () => {
    gsap.set(cursor, { x: 0, y: 0 })
    cursor.rect = rect(cursor)
  })

  ctx.on('tick', ({ mx, my, scroll }) => {
    node.rect = rect(node)

    const autoAlpha =
      mx > node.rect.left &&
      mx < node.rect.right &&
      my > node.rect.top &&
      my < node.rect.bottom
        ? 1
        : 0

    const offsetX = mx - node.rect.left
    const rotation = offsetX <= node.rect.width * 0.5 ? -180 : 0

    action = rotation === -180 ? embla.scrollPrev : embla.scrollNext

    gsap.set(cursor, {
      x: mx,
      y: my + scroll.target,
      autoAlpha,
      rotation,
    })

    gsap.set(node, {
      cursor: autoAlpha ? 'none' : 'auto',
    })
  })

  return () => {
    embla.destroy()
    offClick()
  }
})
