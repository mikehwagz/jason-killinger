const groq = require('groq')
const client = require('../lib/sanity.js')

module.exports = async function () {
  const data = await client.fetch(groq`*[_type == 'site'][0] {
    homepage-> {
      title,
      'slug': slug.current,
    },
    navigation[]-> {
      title,
      'slug': slug.current,
      'isHomepage': slug.current == ^.homepage->slug.current,
    },
    footer {
      copyright,
      link {
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
      },
    },
  }`)

  data.footer.copyright = data.footer.copyright.replace(
    '{year}',
    new Date().getFullYear(),
  )

  return data
}
