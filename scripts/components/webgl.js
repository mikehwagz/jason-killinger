import { component } from 'picoapp'
import { Renderer, Triangle, Program, Mesh, Texture, Vec2, Vec3 } from 'ogl'
import { round, lerp } from 'martha'
import vertex from '../shaders/quad.vert'
import fragment from '../shaders/quad.frag'

export default component((node, ctx) => {
  const [color1, color2] = JSON.parse(node.dataset.colors)
  const { ww, wh, mx, my, time } = ctx.getState()

  let renderer = new Renderer({
    width: ww,
    height: wh,
    antialias: true,
  })

  let { gl } = renderer
  let x = mx
  let y = my

  node.appendChild(gl.canvas)

  let geometry = new Triangle(gl)
  let texture = new Texture(gl, {
    wrapS: gl.REPEAT,
    wrapT: gl.REPEAT,
  })

  let src = '/images/seamless-pattern-2048x2048.jpg'
  let background = new Image()

  background.onload = () => {
    texture.image = background
    texture.needsUpdate = true
  }

  background.src = src

  let program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      tBackground: { value: texture },
      uTime: { value: time },
      uResolution: { value: new Vec2(ww, wh) },
      uColor1: { value: new Vec3(...color1) },
      uColor2: { value: new Vec3(...color2) },
      uMouse: { value: new Vec2(x, y) },
    },
  })

  let mesh = new Mesh(gl, { geometry, program })

  ctx.on('resize', ({ ww, wh }) => {
    renderer.setSize(ww, wh)
    program.uniforms.uResolution.value.x = ww
    program.uniforms.uResolution.value.y = wh
  })

  ctx.on('tick', ({ time, mx, my, ww, wh, isAltTheme }) => {
    x = round(lerp(x, mx, 0.1), 100)
    y = round(lerp(y, my, 0.1), 100)

    program.uniforms.uMouse.value.x = (x / ww) * 2 - 1
    program.uniforms.uMouse.value.y = -(y / wh) * 2 + 1
    program.uniforms.uTime.value = time

    if (isAltTheme) {
      renderer.render({ scene: mesh })
    }
  })
})
