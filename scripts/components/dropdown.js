import { qsa, add } from 'martha'
import { component } from 'picoapp'
import sqzbx from 'sqzbx'

export default component((node, ctx) => {
  let instance = sqzbx(node, {
    collapsible: true,
    resize: false,
    defaultIndex: ctx.getState().isDropdownExpanded ? 0 : null,
  })

  instance.on('expand', () => {
    ctx.hydrate({ isDropdownExpanded: true })
  })

  instance.on('collapse', () => {
    ctx.hydrate({ isDropdownExpanded: false })
  })

  ctx.on('resize', instance.resize)

  let unmount = instance.mount()

  setTimeout(() => {
    let transitionEls = qsa('[data-transition]', node)
    transitionEls.forEach((el) => add(el, el.dataset.transition))
  }, 0)

  return unmount
})
