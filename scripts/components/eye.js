import { component } from 'picoapp'
import choozy from 'choozy'
import { round, lerp, map } from 'martha'
import gsap from 'gsap'

export default component((node, ctx) => {
  let { iris, pupil } = choozy(node)

  let x = getMouseX(ctx.getState())
  let y = getMouseY(ctx.getState())

  ctx.on('tick', (s) => {
    x = getMouseX(s)
    y = getMouseY(s)

    gsap.set([iris, pupil], {
      x: x * 3,
      y: y * 3 - 1.5,
    })
  })

  function getMouseX({ mx, ww }) {
    return round(lerp(x, map(mx, 0, ww, 0, 1), 0.17), 100)
  }

  function getMouseY({ my, wh }) {
    return round(lerp(y, map(my, 0, wh, 0, 1), 0.17), 100)
  }
})
