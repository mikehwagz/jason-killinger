import gsap from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import { rect, qs, on, round, lerp } from 'martha'

gsap.registerPlugin(ScrollToPlugin)
gsap.config({ force3D: true })

export default function raf(app) {
  let last = 0
  let target = 0
  let current = 0
  let ease = 0.15

  gsap.ticker.fps(-1)
  gsap.ticker.add(tick)

  on(window, 'scroll', scroll)
  app.on('scroll:to', scrollTo)
  app.on('scroll:reset', reset)
  app.on('resize', resize)

  function tick(time, delta) {
    current =
      app.getState().ww >= 768
        ? round(lerp(current, target, ease), 100)
        : target

    app.emit('tick', {
      time,
      delta,
      scroll: {
        current,
        target,
        last,
      },
    })

    last = target
  }

  function scroll() {
    target = window.scrollY
  }

  function scrollTo(_, target) {
    const top = target.offsetTop
    const offset = top === 0 ? target.parentNode.offsetTop : top
    const padding = rect(qs('[data-scroll-padding-top]'))?.bottom ?? 0
    const temp = { y: current }

    gsap.to(temp, {
      y: offset - padding,
      duration: 0.5,
      ease: 'expo.inOut',
      onStart() {
        app.hydrate({ isAutoScrolling: true })
      },
      onUpdate() {
        window.scroll(0, temp.y)
        target = current = temp.y
      },
      onComplete() {
        app.hydrate({ isAutoScrolling: false })
      },
    })
  }

  function reset() {
    target = current = 0
  }

  function resize() {
    current = target
  }
}
