const groq = require('groq')
const client = require('../lib/sanity.js')
const queries = require('../lib/queries.js')

module.exports = async function () {
  const data = await client.fetch(groq`*[_type == 'site'][0] {
    homepage-> ${queries.page},
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
