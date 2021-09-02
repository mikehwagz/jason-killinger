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

module.exports.asset = groq`{
  asset-> {
    url,
    metadata {
      dimensions,
      lqip,
    },
  },
  alt,
}`

module.exports.media = groq`{
  type,
  type == 'image' => {
    image ${module.exports.asset},
  },
  type == 'video' => {
    video ${module.exports.asset},
  },
}`

module.exports.block = groq`{
  ...,
  markDefs[] ${module.exports.link},
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

module.exports.postModules = groq`
  _type == 'oneUpMedia' => {
    media ${module.exports.media},
    caption[] ${module.exports.block},
    isFullBleed,
  },
  _type == 'twoUpMedia' => {
    media[] ${module.exports.media},
    caption[] ${module.exports.block},
    isFullBleed,
    shouldStackOnMobile,
  },
  _type == 'twoUpTextAndMedia' => {
    text,
    media[] ${module.exports.media},
    layout,
    mobileLayout,
  },
  _type == 'threeUpMedia' => {
    media[] ${module.exports.media},
    caption[] ${module.exports.block},
    isFullBleed,
    shouldStackOnMobile,
  },
  _type == 'editorialText' => {
    content[] ${module.exports.block},
  }
`

module.exports.page = groq`{
  _type,
  title,
  'slug': slug.current,
  isDarkModeEnabled,
  'isHomepage': *[_type == 'site'][0].homepage->slug.current == slug.current,
  modules[] {
    _type,
    ${module.exports.postModules},
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
    _type == 'bio' => {
      content[] ${module.exports.block},
    },
    _type == 'list' => {
      title,
      isTwoColumns,
      listItems[] {
        content[] ${module.exports.block},
      },
    },
  },
}`
