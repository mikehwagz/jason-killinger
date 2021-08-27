import { component } from 'picoapp'
import choozy from 'choozy'
import { add, remove, on, qs } from 'martha'
import gsap from 'gsap'
import * as focusTrap from 'focus-trap'

export default component((node, ctx) => {
  let { burger, openIcon, closeIcon, topBun, bottomBun, patty, outer, inner } =
    choozy(node, 'js:header-')

  gsap.set([outer, inner], {
    yPercent: gsap.utils.wrap([-100, 100]),
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
      .add(() => add(dom.body, 'overflow-hidden'), 0)
      .add(() => trap.activate(), 0)
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
        [outer, inner],
        {
          yPercent: 0,
        },
        0,
      )
      .restart()
  }

  function close() {
    let { dom } = ctx.getState()

    tl.clear()
      .add(() => trap.deactivate(), 0)
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
        [outer, inner],
        {
          yPercent: gsap.utils.wrap([-100, 100]),
        },
        0,
      )
      .restart()
  }

  return () => {
    ctx.emit('header:toggle', { isOpen: false })
    offClick()
    offEscape()
  }
})
