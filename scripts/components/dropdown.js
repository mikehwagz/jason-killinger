import { component } from 'picoapp'
import sqzbx from 'sqzbx'

export default component((node, ctx) => {
  let instance = sqzbx(node, { collapsible: true, resize: false })
  ctx.on('resize', instance.resize)
  let unmount = instance.mount()
  return unmount
})
