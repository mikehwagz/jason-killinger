const groq = require('groq')
const { sanityClient } = require('../lib/sanity.js')
const queries = require('../lib/queries.js')

module.exports = async function () {
  const posts = await sanityClient.fetch(groq`*[_type == 'post'] {
    title,
    type,
    'slug': slug.current,
    metaDescription,
    metaImage ${queries.image},
    type == 'media' => {
      media ${queries.media},
      caption[] ${queries.block},
    },
    type == 'caseStudy' => {
      heroImageDesktop ${queries.image},
      heroImageMobile ${queries.image},
      heroNavTextColor,
      introText[] ${queries.block},
      client[] ${queries.block},
      collaborators[] ${queries.block},
      location,
      taxonomies {
        title,
        list[] {
          _type,
          _type == 'collection' => {
            'title': reference->title,
            'slug': reference->slug.current,
            'items': reference->items,
          },
          _type == 'txt' => {
            'title': text,
          },
        },
      },
      year,
      modules[] {
        _type,
        ${queries.postModules},
      },
      related {
        title,
        posts[]-> {
          title,
          'slug': slug.current,
          type,
          type == 'media' => {
            media ${queries.media},
          },
          type == 'caseStudy' => {
            thumbnail ${queries.media},
          },
        },
      }
    },
  }`)

  return posts
}
