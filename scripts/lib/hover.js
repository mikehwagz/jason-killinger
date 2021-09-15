import { on } from 'martha'

export default function hover(node, enter, leave) {
  let offEnter = on(node, 'mouseenter', enter)
  let offLeave = on(node, 'mouseleave', leave)
  return () => {
    offEnter()
    offLeave()
  }
}
