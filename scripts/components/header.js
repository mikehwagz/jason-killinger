import { component } from 'picoapp'
import choozy from 'choozy'
import { add, remove, on, qs, qsa, rect, noop } from 'martha'
import gsap from 'gsap'
import * as focusTrap from 'focus-trap'

export default component((node, ctx) => {
  let {
    burger,
    openIcon,
    closeIcon,
    topBun,
    bottomBun,
    patty,
    outer,
    inner,
    nav,
  } = choozy(node, 'js:header-')
  let header = qsa('[data-scroll-padding-top]').slice(-1)[0]
  let activeLinks = qsa('a').filter(
    (link) => link.getAttribute('href') === window.location.pathname,
  )

  let offActiveLinks = noop
  if (activeLinks) {
    offActiveLinks = on(activeLinks, 'click', () => {
      ctx.emit('header:toggle', { isOpen: false })
    })
  }

  ctx.on('resize', () => {
    header.rect = rect(header)
  })

  gsap.set([outer, inner, nav], {
    yPercent: gsap.utils.wrap([-101, 101]),
  })

  let trap = focusTrap.createFocusTrap(outer, {
    initialFocus: qs('[data-initial-focus]', outer),
  })

  let duration = 0.7
  let halfDuration = duration * 0.5

  let tl = gsap.timeline({
    paused: true,
    defaults: { duration, ease: 'power3' },
  })

  let offClick = on(burger, 'click', () =>
    ctx.emit('header:toggle', { isOpen: !ctx.getState().isOpen }),
  )

  let offEscape = on(window, 'keydown', ({ key }) => {
    if (ctx.getState().isOpen && key === 'Escape') {
      ctx.emit('header:toggle', { isOpen: false })
    }
  })

  ctx.on('header:toggle', ({ isOpen }) => {
    if (isOpen) {
      open()
    } else {
      close()
    }
  })

  function open() {
    let { dom } = ctx.getState()

    tl.clear()
      .set(outer, { autoAlpha: 1 })
      .add(() => add(dom.body, 'overflow-hidden'), 0)
      .to(
        [openIcon, closeIcon],
        {
          rotation: -180,
          alpha: gsap.utils.wrap([0, 0, 1, 1]),
        },
        0,
      )
      .to(
        topBun,
        {
          y: '0.8rem',
          rotation: 45,
          duration: halfDuration,
        },
        0,
      )
      .to(
        patty,
        {
          rotation: -45,
          duration: halfDuration,
        },
        0,
      )
      .to(
        bottomBun,
        {
          y: '-0.8rem',
          rotation: -45,
          duration: halfDuration,
        },
        0,
      )
      // open overlay
      .to(
        [outer, inner, nav],
        {
          yPercent: 0,
        },
        0,
      )
      .add(() => trap.activate())
      .restart()
  }

  function close() {
    let { dom } = ctx.getState()

    tl.clear()
      .add(() => trap.deactivate())
      .add(() => remove(dom.body, 'overflow-hidden'), 0)
      // x to burger
      .to(
        [openIcon, closeIcon],
        {
          rotation: 0,
          alpha: gsap.utils.wrap([1, 1, 0, 0]),
        },
        0,
      )
      .to(
        patty,
        {
          rotation: 0,
        },
        0,
      )
      .to(
        topBun,
        {
          y: 0,
          rotation: 0,
        },
        0,
      )
      .to(
        bottomBun,
        {
          y: 0,
          rotation: 0,
        },
        0,
      )
      // close overlay
      .to(
        [outer, inner, nav],
        {
          yPercent: gsap.utils.wrap([-101, 101]),
        },
        0,
      )
      .set(outer, { autoAlpha: 0 })
      .restart()
  }

  ctx.on('header:theme', (_, theme) => {
    node.style.color = theme
  })

  ctx.on('tick', ({ scroll }) => {
    if (scroll.target <= header.rect.height) {
      return
    }

    if (scroll.target > scroll.last) {
      add(header, 'is-hidden')
    }

    if (scroll.target < scroll.last) {
      remove(header, 'is-hidden')
    }
  })

  return () => {
    ctx.emit('header:toggle', { isOpen: false })
    offActiveLinks()
    offClick()
    offEscape()
  }
})
