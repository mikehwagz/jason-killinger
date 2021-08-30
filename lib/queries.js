const groq = require('groq')

module.exports.link = groq`{
  title,
  openInNewTab,
  type,
  type == 'external' => {
    url,
  },
  type == 'internal' => {
    reference-> {
      _type,
      'slug': slug.current,
    },
  },
}`
