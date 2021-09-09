import { Renderer, Triangle, Program, Mesh, Texture, Vec2 } from 'ogl'
import glsl from 'glslify'
import * as dat from 'dat.gui'
import vertexShader from './shaders/quad.vert'
import fragmentShader from './shaders/quad.frag'
import app from '../app'

// const gui = new dat.GUI()
// gui.hide()

export default class Gl {
  constructor(node) {
    this.node = node

    this.renderer = new Renderer({
      width: app.getState().ww,
      height: app.getState().wh,
      antialias: true,
    })

    this.gl = this.renderer.gl

    this.init()
  }

  init() {
    this.addToDom()
    this.createMesh()
    this.addEvents()
    this.addGui()
  }

  addToDom() {
    this.node.appendChild(this.gl.canvas)
  }

  createMesh() {
    // Rather than using a plane (two triangles) to cover the viewport here is a
    // triangle that includes -1 to 1 range for 'position', and 0 to 1 range for 'uv'.
    // Excess will be out of the viewport.
    // https://github.com/oframe/ogl/blob/3a271343c4ccfdd830c2c8cf2e0b3648145b3175/examples/triangle-screen-shader.html#L58

    //         position                uv
    //      (-1, 3)                  (0, 2)
    //         |\                      |\
    //         |__\(1, 1)              |__\(1, 1)
    //         |__|_\                  |__|_\
    //   (-1, -1)   (3, -1)        (0, 0)   (2, 0)

    this.geometry = new Triangle(this.gl)

    const bgTexture = new Texture(this.gl, {
      wrapS: this.gl.REPEAT,
      wrapT: this.gl.REPEAT,
    })
    const bg = new Image()
    bg.src = '/images/seamless-pattern-2000x2000.jpg'
    bg.onload = () => (bgTexture.image = bg)

    this.program = new Program(this.gl, {
      vertex: glsl(vertexShader),
      fragment: glsl(fragmentShader),
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2(app.getState().ww, app.getState().wh) },
        tBackground: { value: bgTexture },
        uMouse: { value: new Vec2() },
      },
    })

    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    })
  }

  addEvents() {
    app.on('tick', this.update)
    app.on('resize', this.resize)
  }

  update = ({ time, mx, my, ww, wh }) => {
    this.program.uniforms.uMouse.value.x = (mx / ww) * 2 - 1
    this.program.uniforms.uMouse.value.y = -(my / wh) * 2 + 1
    this.program.uniforms.uTime.value = time * 0.05
    this.renderer.render({ scene: this.mesh })
  }

  resize = ({ ww, wh }) => {
    this.renderer.setSize(ww, wh)
    this.program.uniforms.uResolution.value.x = ww
    this.program.uniforms.uResolution.value.y = wh
  }

  addGui() {
    const uniforms = this.program.uniforms

    // gui.add(uniforms.uRepeat, 'value', 1, 10, 0.1).name('tile')
  }
}
