import { component } from 'picoapp'
import choozy from 'choozy'
import { on } from 'martha'
import gsap from 'gsap'
import hover from '../lib/hover'

export default component((node, ctx) => {
  let { arrow } = choozy(node)
  let tl = gsap.timeline({ paused: true })

  let offClick = on(node, 'click', () => {
    ctx.emit('scroll:to')
  })

  let offHover = hover(
    node,
    () => {
      tl.clear()
        .to(arrow, {
          yPercent: -8,
          yoyo: true,
          repeat: -1,
          duration: 0.2,
          ease: 'sine.inOut',
        })
        .restart()
    },
    () => {
      tl.clear()
        .to(arrow, {
          yPercent: 0,
          duration: 0.2,
          ease: 'expo',
        })
        .restart()
    },
  )

  return () => {
    offClick()
    offHover()
  }
})
