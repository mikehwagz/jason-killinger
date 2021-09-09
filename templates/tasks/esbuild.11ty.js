const path = require('path')
const { build } = require('esbuild')
const { glsl } = require('esbuild-plugin-glsl')

module.exports = class {
  async data() {
    return {
      permalink: false,
    }
  }

  async render() {
    await build({
      entryPoints: [path.join(__dirname, '..', '..', 'scripts', 'index.js')],
      minify: true,
      bundle: true,
      sourcemap: true,
      outfile: path.join(__dirname, '..', '..', 'build', 'app.js'),
      plugins: [
        glsl({
          minify: true,
        }),
      ],
    })
  }
}
