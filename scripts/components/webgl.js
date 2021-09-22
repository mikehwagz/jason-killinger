import { component } from 'picoapp'
import { Renderer, Triangle, Program, Mesh, Texture, Vec2, Vec3 } from 'ogl'
import { round, lerp } from 'martha'
import vertex from '../shaders/quad.vert'
import fragment from '../shaders/quad.frag'

export default component((node, ctx) => {
  const [color1, color2] = JSON.parse(node.dataset.colors)

  let renderer = new Renderer({
    width: ctx.getState().ww,
    height: ctx.getState().wh,
    antialias: true,
  })

  let { gl } = renderer
  let x = ctx.getState().mx
  let y = ctx.getState().my

  node.appendChild(gl.canvas)

  let geometry = new Triangle(gl)
  let background = new Image()
  let texture = new Texture(gl, {
    wrapS: gl.REPEAT,
    wrapT: gl.REPEAT,
  })

  background.src = '/images/seamless-pattern-2000x2000.jpg'
  background.onload = () => (texture.image = background)

  let program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      uTime: {
        value: 0,
      },
      uResolution: {
        value: new Vec2(ctx.getState().ww, ctx.getState().wh),
      },
      tBackground: {
        value: texture,
      },
      uColor1: {
        value: new Vec3(...color1),
      },
      uColor2: {
        value: new Vec3(...color2),
      },
      uMouse: {
        value: new Vec2(),
      },
    },
  })

  let mesh = new Mesh(gl, { geometry, program })

  ctx.on('resize', ({ ww, wh }) => {
    renderer.setSize(ww, wh)
    program.uniforms.uResolution.value.x = ww
    program.uniforms.uResolution.value.y = wh
  })

  ctx.on('tick', ({ time, mx, my, ww, wh, isAltTheme }) => {
    if (!isAltTheme) return

    x = round(lerp(x, mx, 0.1), 100)
    y = round(lerp(y, my, 0.1), 100)

    program.uniforms.uMouse.value.x = (x / ww) * 2 - 1
    program.uniforms.uMouse.value.y = -(y / wh) * 2 + 1
    program.uniforms.uTime.value = time * 0.05

    renderer.render({ scene: mesh })
  })
})
