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

module.exports.image = groq`{
  asset-> {
    _id,
    url,
    'lqip': metadata.lqip,
    'dominant': metadata.palette.dominant.background,
  },
  alt,
  'aspectRatio': asset->metadata.dimensions.aspectRatio,
}`

module.exports.media = groq`{
  type,
  type == 'image' => {
    'asset': {
      '_id': image.asset->_id,
      'url': image.asset->url,
      'lqip': image.asset->metadata.lqip,
      'dominant': image.asset->metadata.palette.dominant.background,
    },
    'alt': image.alt,
    'aspectRatio': image.asset->metadata.dimensions.aspectRatio,
  },
  type == 'video' => {
    'asset': {
      '_id': video.asset->_id,
      'url': video.asset->url,
    },
    'alt': video.alt,
    'aspectRatio': video.aspectRatio,
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
    media[] ${module.exports.media},
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
  },
  _type == 'vimeoEmbed' => {
    vimeoVideo {
      ...,
      'html': '',
    },
  }
`

module.exports.page = groq`{
  _type,
  title,
  'slug': slug.current,
  metaDescription,
  metaImage ${module.exports.image},
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
      shouldStackOnMobile,
      listItems[] {
        content[] ${module.exports.block},
      },
    },
  },
}`
