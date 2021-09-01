const href = require('./href')
const blocksToHtml = require('@sanity/block-content-to-html')
const h = blocksToHtml.h

module.exports = {
  caption: {
    marks: {
      link: ({ children, mark }) =>
        h(
          'a',
          {
            className: 'underline hover:no-underline',
            href: mark.type === 'external' ? mark.url : href(mark),
            target: mark.openInNewTab ? '_blank' : null,
            rel: mark.openInNewTab ? 'noopener noreferrer' : null,
          },
          children,
        ),
    },
  },
}
