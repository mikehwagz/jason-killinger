import Highway from '@dogstudio/highway'
import gsap from 'gsap'
import app from '../app'

class ModalEnter extends Highway.Transition {
  in({ from, to, done }) {
    gsap.to(to, {
      duration: 0.5,
      autoAlpha: 1,
      onComplete: () => {
        window.scrollTo(0, 0)
        from.remove()
        done()
      },
    })
  }

  out({ trigger, done }) {
    app.hydrate({
      lastScrollY: window.scrollY,
      lastPath: trigger.dataset.from ?? '/',
    })

    done()
  }
}

export default ModalEnter
