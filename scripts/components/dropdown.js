import { component } from 'picoapp'
import sqzbx from 'sqzbx'
export default component((node, ctx) => {
  const instance = sqzbx(node, { collapsible: true, resize: false })
  ctx.on('resize', instance.resize)
  const unmount = instance.mount()
  return unmount
})
