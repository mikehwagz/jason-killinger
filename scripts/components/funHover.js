import { component } from 'picoapp'
import { qsa } from 'martha'
import hover from '../lib/hover'
import gsap from 'gsap'

export default component((node, ctx) => {
  let tl = gsap.timeline({ paused: true })
  let chars = qsa('.char', node)

  let offHover = hover(
    node,
    () => {
      tl.clear()
        .to(chars, {
          scaleY: 1.4,
          willChange: 'transform',
          stagger: {
            each: 0.06,
            repeat: -1,
            yoyo: true,
          },
          duration: 0.5,
          ease: 'sine.inOut',
        })
        .restart()
    },
    () => {
      tl.clear()
        .to(chars, {
          scaleY: 1,
          willChange: null,
          duration: 0.25,
          ease: 'expo',
        })
        .restart()
    },
  )

  return () => {
    offHover()
  }
})
