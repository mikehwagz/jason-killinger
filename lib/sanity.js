const createSanityClient = require('@sanity/client')
const createSanityImageUrlBuilder = require('@sanity/image-url')

const sanityClient = createSanityClient({
  projectId: 'fob5aicq',
  dataset: 'production',
  apiVersion: 'v2021-06-07',
  useCdn: false,
})

const sanityImageUrlBuilder = createSanityImageUrlBuilder(sanityClient)

module.exports = {
  sanityClient,
  sanityImageUrlBuilder,
}
