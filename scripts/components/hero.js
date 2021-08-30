import choozy from 'choozy'
import gsap from 'gsap'
import { remove, wrap } from 'martha'
import { component } from 'picoapp'

import signal from '../lib/signal'
import poll from '../lib/poll'

export default component((node, ctx) => {
  let { slides } = choozy(node)
  let [index, setIndex] = signal(0, inc)

  slides.forEach((slide, i) => {
    slide.words = Array.from(slide.children)
    if (i > 0) {
      gsap.set(slide.words, { autoAlpha: 0 })
      remove(slide.words, 'hidden')
    }
  })

  let offPoll = poll(
    4000,
    (done) => {
      setIndex(wrap(index() + 1, slides.length))
      done()
    },
    false,
  )

  function inc(i) {
    let previous = slides[wrap(i - 1, slides.length)]
    let current = slides[i]

    gsap.to(previous.words, {
      autoAlpha: 0,
      duration: 0,
      stagger: {
        amount: 0.7,
      },
    })

    gsap.to(current.words, {
      autoAlpha: 1,
      duration: 0,
      stagger: {
        amount: 0.7,
      },
      delay: 1,
    })
  }

  return () => {
    offPoll()
  }
})
