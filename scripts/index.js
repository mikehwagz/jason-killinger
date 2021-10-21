import Highway from '@dogstudio/highway'
import * as quicklink from 'quicklink'
import gsap from 'gsap'
import app from './app'
import raf from './lib/raf'
import loadFonts from './lib/loadFonts'
import { on, once, size, add, remove, toggle, qs, qsa } from 'martha'
import Fade from './transitions/Fade'
import PostGrid from './transitions/PostGrid'
import ModalEnter from './transitions/ModalEnter'
import ModalLeave from './transitions/ModalLeave'

class Base extends Highway.Renderer {
  onLoad() {
    quicklink.listen()

    on(window, 'resize', this.resize)
    on(document, 'mousemove', this.mousemove)

    app.on('site:theme', ({ isAltTheme }) => {
      let views = qsa('[data-router-view]')
      let circle = qsa('[data-theme-toggle-circle]')
      let webgl = qsa('[data-webgl]')

      if (isAltTheme) {
        remove(circle, 'opacity-0')
        remove(webgl, 'opacity-0')
        remove(views, 'text-fg bg-bg')
        add(views, 'text-white')
        app.emit('themeToggle:targetSpeed', null, 10)
      } else {
        add(circle, 'opacity-0')
        add(webgl, 'opacity-0')
        add(views, 'text-fg bg-bg')
        remove(views, 'text-white')
        app.emit('themeToggle:targetSpeed', null, null)
      }
    })

    raf(app)
    gsap.set('[data-router-view]', { autoAlpha: 1 })
    loadFonts(app.getState().fonts)
      .then(this.onLoadCompleted)
      .catch(console.log)
  }

  onLoadCompleted = () => {
    this.onEnter()

    let { dom } = app.getState()

    once(dom.body, 'transitionend', this.onEnterCompleted)
    remove(dom.body, 'opacity-0')
  }

  onEnter() {
    app.emit('site:theme')

    this.mount()
  }

  onEnterCompleted() {
    app.emit('enter:completed')
  }

  onLeave() {
    this.unmount()
  }

  onLeaveCompleted() {}

  mount = () => {
    app.mount()
    this.resize()
  }

  unmount = () => {
    app.unmount()
  }

  resize = () => {
    app.emit('resize', size())
  }

  mousemove = ({ clientX: mx, clientY: my }) => {
    app.emit('mousemove', { mx, my })
  }

  setup() {
    this.onLoad()
  }
}

app.router = new Highway.Core({
  renderers: {
    default: Base,
  },
  transitions: {
    default: Fade,
    contextual: {
      postGrid: PostGrid,
      modalEnter: ModalEnter,
      modalLeave: ModalLeave,
    },
  },
})

on(window, 'keyup', ({ key }) => {
  if (key.toLowerCase() === 'g') {
    toggle(qs('#g'), 'opacity-0')
  }
})
