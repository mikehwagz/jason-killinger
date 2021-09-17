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
            each: 0.025, // stagger each by 0.1 seconds (or use amount for an overall value to distribute)
            repeat: -1, // <-- LOOK! It's nested, so each sub-tween will repeat independently
            yoyo: true, // again, passed to each sub-tween.
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
