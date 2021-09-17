import { component } from 'picoapp'
import choozy from 'choozy'
import { add, index, on, remove } from 'martha'

export default component((node, ctx) => {
  const { links, thumbs, arrows } = choozy(node)

  let offEnter = on(links, 'mouseenter', ({ currentTarget: t }) => {
    const i = index(t)

    thumbs.map((thumb, j) => {
      if (i === j) {
        remove(thumb, 'opacity-0 pointer-events-none')
      } else {
        add(thumb, 'opacity-0 pointer-events-none')
      }
    })

    links.map((link, j) => {
      if (i === j) {
        remove(link, 'opacity-65')
      } else {
        add(link, 'opacity-65')
      }
    })

    arrows.map((arrow, j) => {
      if (i === j) {
        remove(arrow, 'opacity-0')
      } else {
        add(arrow, 'opacity-0')
      }
    })
  })

  return offEnter
})
