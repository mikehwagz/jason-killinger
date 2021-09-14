const groq = require('groq')
const { sanityClient } = require('../lib/sanity.js')
const queries = require('../lib/queries.js')

module.exports = async function () {
  const data = await sanityClient.fetch(groq`*[_type == 'site'][0] {
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
    title,
    description,
    image ${queries.image},
  }`)

  data.footer.copyright = data.footer.copyright.replace(
    '{year}',
    new Date().getFullYear(),
  )

  return data
}
