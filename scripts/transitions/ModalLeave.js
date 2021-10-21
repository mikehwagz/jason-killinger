import Highway from '@dogstudio/highway'
import gsap from 'gsap'
import app from '../app'

class ModalLeave extends Highway.Transition {
  in({ from, to, done }) {
    window.scrollTo(0, app.getState().lastScrollY)
    gsap.set(to, { autoAlpha: 1 })
    gsap.to(from, {
      duration: 0.5,
      autoAlpha: 0,
      onComplete: () => {
        from.remove()
        done()
      },
    })
  }

  out({ done }) {
    done()
  }
}

export default ModalLeave
