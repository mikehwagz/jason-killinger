const groq = require('groq')
const client = require('../lib/sanity.js')
const queries = require('../lib/queries.js')

module.exports = async function () {
  const data = await client.fetch(groq`*[_type == 'site'][0] {
    homepage-> {
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
          illustration {
            asset->,
          },
        },
        _type == 'postGrid' => {
          collections[]-> {
            title,
            'slug': slug.current,
            items[] {
              width,
              post-> {
                title,
                subtitle,
                'slug': slug.current,
                type,
                type == 'media' => {
                  media ${queries.media},
                },
                type == 'caseStudy' => {
                  thumbnail ${queries.media},
                },
              },
            },
          },
        },
      },
    },
    navigation[]-> {
      title,
      'slug': slug.current,
      'isHomepage': slug.current == ^.homepage->slug.current,
    },
    footer {
      copyright,
      link ${queries.link},
    },
  }`)

  data.footer.copyright = data.footer.copyright.replace(
    '{year}',
    new Date().getFullYear(),
  )

  return data
}
