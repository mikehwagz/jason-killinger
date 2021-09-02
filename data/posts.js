const groq = require('groq')
const client = require('../lib/sanity.js')
const queries = require('../lib/queries.js')

module.exports = async function () {
  const posts = await client.fetch(groq`*[_type == 'post'] {
    title,
    type,
    'slug': slug.current,
    type == 'media' => {
      media ${queries.media},
      caption[] ${queries.block},
    },
    type == 'caseStudy' => {
      heroImageDesktop ${queries.asset},
      heroImageMobile ${queries.asset},
      introText[] ${queries.block},
      client,
      collaborators,
      location,
      'disciplines': *[_type == 'collection' && references(^._id) && slug.current != 'all'] { title },
      year,
      modules[] {
        _type,
        _type == 'oneUpMedia' => {
          media ${queries.media},
          caption[] ${queries.block},
          isFullBleed,
        },
        _type == 'twoUpMedia' => {
          media[] ${queries.media},
          caption[] ${queries.block},
          isFullBleed,
          shouldStackOnMobile,
        },
        _type == 'twoUpTextAndMedia' => {
          text,
          media[] ${queries.media},
          layout,
          mobileLayout,
        },
        _type == 'threeUpMedia' => {
          media[] ${queries.media},
          caption[] ${queries.block},
          isFullBleed,
          shouldStackOnMobile,
        },
        _type == 'editorialText' => {
          content[] ${queries.block},
        },
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
