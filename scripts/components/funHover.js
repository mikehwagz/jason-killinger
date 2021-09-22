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
          scaleY: 1.5,
          stagger: {
            each: 0.025,
            repeat: -1,
            yoyo: true,
          },
          duration: 0.2,
          ease: 'sine.inOut',
        })
        .restart()
    },
    () => {
      tl.clear()
        .to(chars, {
          scaleY: 1,
          duration: 0.2,
          ease: 'expo',
        })
        .restart()
    },
  )

  return () => {
    offHover()
  }
})
