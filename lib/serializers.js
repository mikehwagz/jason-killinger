const href = require('./href')
const blocksToHtml = require('@sanity/block-content-to-html')
const h = blocksToHtml.h

const link = ({ children, mark }) =>
  h(
    'a',
    {
      className: 'underline hover:no-underline',
      href: mark.type === 'external' ? mark.url : href(mark),
      target: mark.openInNewTab ? '_blank' : null,
      rel: mark.openInNewTab ? 'noopener noreferrer' : null,
    },
    children,
  )

const linkNoUnderline = ({ children, mark }) =>
  h(
    'a',
    {
      href: mark.type === 'external' ? mark.url : href(mark),
      target: mark.openInNewTab ? '_blank' : null,
      rel: mark.openInNewTab ? 'noopener noreferrer' : null,
    },
    children,
  )

module.exports = {
  caption: {
    marks: { link },
  },
  metadata: {
    types: {
      block: (props) => {
        const { style = 'normal' } = props.node

        if (style === 'normal') {
          return h(
            'p',
            {
              className: 'mb-6 last:mb-0',
            },
            props.children,
          )
        }

        return blocksToHtml.defaultSerializers.types.block(props)
      },
    },
    marks: { link: linkNoUnderline },
  },
  bio: {
    types: {
      block: (props) => {
        const { style = 'normal' } = props.node

        if (style === 'normal') {
          return h(
            'p',
            {
              className: 'font-nm text-28 m:text-40 l:text-50 leading-120',
            },
            props.children,
          )
        }

        return blocksToHtml.defaultSerializers.types.block(props)
      },
    },
    marks: { link },
  },
  editorialText: {
    types: {
      block: (props) => {
        const { style = 'normal' } = props.node

        if (style === 'h2') {
          return h(
            'h2',
            {
              className:
                'font-nm text-28 m:text-40 l:text-50 leading-115 mb-20 m:mb-25',
            },
            props.children,
          )
        }

        if (style === 'normal') {
          return h(
            'p',
            {
              className:
                'text-18 m:text-20 l:text-28 leading-138 mt-12 m:mt-15 l:mt-18',
            },
            props.children,
          )
        }

        return blocksToHtml.defaultSerializers.types.block(props)
      },
    },
    marks: { link },
  },
}
