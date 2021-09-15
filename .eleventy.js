const cx = require('nanoclass')
const blocksToHtml = require('@sanity/block-content-to-html')
const htmlmin = require('html-minifier')
const serializers = require('./lib/serializers')
const { sanityImageUrlBuilder } = require('./lib/sanity')

module.exports = (config) => {
  config.setUseGitIgnore(false)

  config.addShortcode('classList', (...all) => cx(all))

  config.addShortcode(
    'debug',
    (value) =>
      `<pre style="padding: 100px 0; font-size: 14px; font-family: monospace;">${JSON.stringify(
        value,
        null,
        2,
      )}</pre>`,
  )

  config.addFilter('blocksToHtml', (blocks, type) => {
    try {
      return blocksToHtml({
        blocks,
        serializers: serializers[type],
      })
    } catch (e) {
      // console.log('[blocksToHtml]', blocks, type)
      console.log('Error converting blocks to HTML in blocksToHtml filter:', e)
      return ''
    }
  })

  const getSrc = (id, w = 1536) => {
    if (!id) return ''
    return sanityImageUrlBuilder
      .image(id)
      .width(w)
      .dpr(2)
      .auto('format')
      .fit('max')
      .url()
  }

  config.addFilter('src', getSrc)

  config.addFilter('srcset', (id) => {
    if (!id) return ''
    const widths = [375, 650, 768, 1024, 1280, 1536]
    return widths.map((width) => `${getSrc(id, width)} ${width}w`).join(',')
  })

  config.addWatchTarget('./tailwind.config.js')
  config.addWatchTarget('./lib')
  config.addWatchTarget('./styles')
  config.addWatchTarget('./scripts')

  config.addPassthroughCopy({ './public': '/' })

  config.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })

      return minified
    }

    return content
  })

  return {
    dir: {
      input: 'templates',
      data: '../data',
      includes: 'includes',
      layouts: 'layouts',
      output: 'build',
    },
  }
}
