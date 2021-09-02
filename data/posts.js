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
