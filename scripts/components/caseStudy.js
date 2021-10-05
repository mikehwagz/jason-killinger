import choozy from 'choozy'
import { qsa, rect } from 'martha'
import { component } from 'picoapp'

export default component((node, ctx) => {
  const { hero } = choozy(node)
  const header = qsa('[data-scroll-padding-top]').slice(-1)[0]
  const theme = hero.dataset.theme

  let last = null

  ctx.on('resize', () => {
    header.rect = rect(header)
    hero.rect = rect(hero)
  })

  ctx.on('tick', ({ scroll }) => {
    if (scroll.target <= hero.rect.height - header.rect.height * 0.5) {
      if (last !== theme) {
        ctx.emit('header:theme', null, theme)
        last = theme
      }
    } else {
      if (last !== null) {
        ctx.emit('header:theme', null, null)
        last = null
      }
    }
  })

  return () => {
    ctx.emit('header:theme', null, null)
  }
})
