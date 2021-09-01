const groq = require('groq')

module.exports.link = groq`{
  ...,
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
          dimensions,
          lqip,
        },
      },
      alt,
    },
  },
  type == 'video' => {
    video {
      asset-> {
        url,
        metadata {
          dimensions,
          lqip,
        },
      },
      alt,
    },
  },
}`

module.exports.collection = groq`{
  _type,
  title,
  'slug': slug.current,
  items[] {
    _type,
    width,
    verticalAlignment,
    post-> {
      title,
      subtitle,
      'slug': slug.current,
      type,
      type == 'media' => {
        media ${module.exports.media},
      },
      type == 'caseStudy' => {
        thumbnail ${module.exports.media},
      },
    },
  },
}`

module.exports.page = groq`{
  _type,
  title,
  'slug': slug.current,
  isDarkModeEnabled,
  'isHomepage': *[_type == 'site'][0].homepage->slug.current == slug.current,
  modules[] {
    _type,
    _key,
    _type == 'hero' => {
      titleCarousel[] {
        _key,
        word1,
        word2,
        word3,
      },
    },
    _type == 'postGrid' => {
      navLabel,
      collections[]-> ${module.exports.collection},
    },
  },
}`
