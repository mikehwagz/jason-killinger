const groq = require('groq')
const { sanityClient } = require('../lib/sanity.js')
const queries = require('../lib/queries.js')

module.exports = async function () {
  const data = await sanityClient.fetch(
    groq`*[_type == 'collection'] ${queries.collection}`,
  )

  return data
}
