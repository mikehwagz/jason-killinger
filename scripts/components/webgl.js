import { component } from 'picoapp'
import { Renderer, Triangle, Program, Mesh, Texture, Vec2 } from 'ogl'
import glsl from 'glslify'
import vertexShader from '../shaders/quad.vert'
import fragmentShader from '../shaders/quad.frag'

export default component((node, ctx) => {
  let renderer = new Renderer({
    width: ctx.getState().ww,
    height: ctx.getState().wh,
    antialias: true,
  })

  let { gl } = renderer

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
    vertex: glsl(vertexShader),
    fragment: glsl(fragmentShader),
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

  ctx.on('tick', ({ time, mx, my, ww, wh }) => {
    program.uniforms.uMouse.value.x = (mx / ww) * 2 - 1
    program.uniforms.uMouse.value.y = -(my / wh) * 2 + 1
    program.uniforms.uTime.value = time * 0.05
    renderer.render({ scene: mesh })
  })
})
