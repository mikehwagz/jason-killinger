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

module.exports.media = groq`{
  type,
  type == 'image' => {
    image {
      asset-> {
        url,
        metadata {
          dimensions
        }
      },
      alt,
    },
  },
  type == 'video' => {
    video {
      asset-> {
        url,
        metadata {
          dimensions
        }
      },
      alt,
    },
  },
}`
