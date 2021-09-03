import choozy from 'choozy'
import { rect } from 'martha'
import { component } from 'picoapp'

export default component((node, ctx) => {
  const { hero } = choozy(node)
  const theme = hero.dataset.theme
  const defaultTheme = 'black'

  let last = null

  ctx.on('resize', () => {
    hero.rect = rect(hero)
  })

  ctx.on('tick', ({ scroll }) => {
    if (scroll.target <= hero.rect.height) {
      if (last !== theme) {
        ctx.emit('header:theme', null, theme)
        last = theme
      }
    } else {
      if (last !== defaultTheme) {
        ctx.emit('header:theme', null, defaultTheme)
        last = defaultTheme
      }
    }
  })
})
