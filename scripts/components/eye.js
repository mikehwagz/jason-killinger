import { component } from 'picoapp'
import choozy from 'choozy'
import { round, lerp, map } from 'martha'
import gsap from 'gsap'

export default component((node, ctx) => {
  let { iris, pupil } = choozy(node)

  let x = 0
  let y = 0

  ctx.on('tick', ({ mx, my, ww, wh }) => {
    x = round(lerp(x, map(mx, 0, ww, 0, 1), 0.17), 100)
    y = round(lerp(y, map(my, 0, wh, 0, 1), 0.17), 100)

    gsap.set([iris, pupil], {
      x: x * 3,
      y: y * 3 - 1.5,
    })
  })
})
