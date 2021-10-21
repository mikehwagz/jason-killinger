import Highway from '@dogstudio/highway'
import gsap from 'gsap'
import { qs } from 'martha'

class PostGrid extends Highway.Transition {
  in({ from, to, done }) {
    let content = qs('[data-post-grid]', to)

    if (content) {
      gsap.set(content, { autoAlpha: 0 })
      gsap.set(to, { autoAlpha: 1 })
      from.remove()
      gsap.to(content, {
        duration: 0.5,
        autoAlpha: 1,
        onComplete: done,
      })
    } else {
      from.remove()
      gsap.to(to, {
        duration: 0.5,
        autoAlpha: 1,
        onComplete: done,
      })
    }
  }

  out({ from, done }) {
    let content = qs('[data-post-grid]', from)

    if (content) {
      gsap.to(content, {
        duration: 0.5,
        autoAlpha: 0,
        onComplete: done,
      })
    } else {
      gsap.to(from, {
        duration: 0.5,
        autoAlpha: 0,
        onComplete: done,
      })
    }
  }
}

export default PostGrid
