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
    metaTitle,
    metaDescription,
    metaImage { ...asset-> },
    'color1': [altThemeColor1.rgb.r, altThemeColor1.rgb.g, altThemeColor1.rgb.b],
    'color2': [altThemeColor2.rgb.r, altThemeColor2.rgb.g, altThemeColor2.rgb.b],
  }`)

  data.footer.copyright = data.footer.copyright.replace(
    '{year}',
    new Date().getFullYear(),
  )

  return data
}
