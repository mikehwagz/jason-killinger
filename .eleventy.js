const cx = require('nanoclass')
const blocksToHtml = require('@sanity/block-content-to-html')
const htmlmin = require('html-minifier')
const getSerializers = require('./lib/serializers')
const { wrap } = require('martha')

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

  config.addFilter('blocksToHtml', (blocks, type, theme) => {
    try {
      return blocksToHtml({
        blocks,
        serializers: getSerializers(theme)[type],
      })
    } catch (e) {
      console.log('Error converting blocks to HTML in blocksToHtml filter:', e)
      return ''
    }
  })

  config.addFilter('postGridRows', (items) => {
    let rows = []
    let index = 0
    let acc = 0
    let pattern = ['col-end-12', 'col-end-13', '', 'col-start-2']
    let doubleRowCount = 1

    for (let i = 0; i < items.length; i++) {
      let item = items[i]

      acc += item.width

      if (acc > 10) {
        index += 1
        acc = 0
      }

      let currentRow = rows[index]

      if (!currentRow) {
        rows[index] = {
          cx: pattern[wrap(index, pattern.length)],
          items: [item],
        }
      } else {
        currentRow.items.push(item)

        currentRow.cx = cx([
          currentRow.cx,
          doubleRowCount % 2 ? 'items-end' : 'items-start',
        ])

        doubleRowCount += 1
      }

      if (item.width >= 8) {
        index += 1
        acc = 0
      }
    }

    rows.forEach((row) => {
      let span = row.items.reduce((total, item, i) => {
        total += item.width
        if (i) total += 1
        return total
      }, 0)

      row.span = span
      row.cx = cx([row.cx, `col-span-${span}`])
    })

    return rows
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
