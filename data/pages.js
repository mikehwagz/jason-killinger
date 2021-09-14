const groq = require('groq')
const { sanityClient } = require('../lib/sanity.js')
const queries = require('../lib/queries.js')

module.exports = async function () {
  const pages = await sanityClient.fetch(
    groq`*[_type == 'page'] ${queries.page}`,
  )

  const additionalPages = []
  pages.forEach((page) => {
    page?.modules?.forEach((module) => {
      if (module?._type === 'postGrid' && module?.collections?.length > 1) {
        module.collections.forEach((collection, i) => {
          if (i > 0) {
            additionalPages.push({ ...page, collectionSlug: collection.slug })
          }
        })
      }
    })
  })

  return pages.concat(additionalPages).filter((page) => {
    if (page.isHomepage && !page.collectionSlug) {
      return false
    } else {
      return true
    }
  })
}
