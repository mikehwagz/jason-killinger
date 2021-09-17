import { component } from 'picoapp'
import choozy from 'choozy'
import { on, index, add, remove } from 'martha'

export default component((node, ctx) => {
  const { links, groups, arrows } = choozy(node)

  let offEnter = on(links, 'mouseenter', ({ currentTarget: t }) => {
    const i = index(t)

    links.map((thumb, j) => {
      if (i === j) {
        remove(thumb, 'opacity-65')
      } else {
        add(thumb, 'opacity-65')
      }
    })

    groups.map((group, j) => {
      if (i === j) {
        remove(group, 'opacity-0')
      } else {
        add(group, 'opacity-0')
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
