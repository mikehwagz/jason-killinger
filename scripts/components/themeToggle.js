import { component } from 'picoapp'
import choozy from 'choozy'
import hover from '../lib/hover'
import { round, lerp, on, wrap } from 'martha'
import gsap from 'gsap'

export default component((node, ctx) => {
  let { spiral } = choozy(node)

  let initialSpeed = node.dataset.initialSpeed
    ? parseInt(node.dataset.initialSpeed, 10)
    : 0

  let targetSpeed = initialSpeed
  let currentSpeed = initialSpeed
  let rotation = 0

  let offClick = on(node, 'click', () =>
    ctx.emit('site:theme', {
      isAltTheme: !ctx.getState().isAltTheme,
    }),
  )

  ctx.on('themeToggle:targetSpeed', (_, newValue) => {
    targetSpeed = newValue ? newValue : initialSpeed
  })

  let offHover = hover(
    node,
    () => {
      if (ctx.getState().isAltTheme) return
      targetSpeed = 10
    },
    () => {
      if (ctx.getState().isAltTheme) return
      targetSpeed = initialSpeed
    },
  )

  ctx.on('tick', () => {
    currentSpeed = round(lerp(currentSpeed, targetSpeed, 0.1), 1000)

    if (Math.abs(currentSpeed - targetSpeed) < 0.1) {
      currentSpeed = targetSpeed
    }

    rotation = wrap(rotation + currentSpeed, 361)

    gsap.set(spiral, { rotation })
  })

  return () => {
    offHover()
    offClick()
  }
})
