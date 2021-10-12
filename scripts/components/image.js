import { component } from 'picoapp'
import { add, noop, on, remove } from 'martha'
import choozy from 'choozy'

export default component((node, ctx) => {
  let offLoad = noop
  let offEnd = noop

  ctx.on('enter:completed', () => {
    let refs = choozy(node)

    offLoad = on(refs.img, 'load', () => {
      offLoad()
      offLoad = noop

      if (refs?.placeholder) {
        add(refs.placeholder, 'opacity-0')
      }

      remove(refs.img, 'opacity-0')
    })

    refs.img.src = refs.img.dataset.src
    refs.img.srcset = refs.img.dataset.srcset
    refs.img.removeAttribute('data-src')
    refs.img.removeAttribute('data-srcset')
  })

  return () => {
    offLoad()
    offEnd()
  }
})
