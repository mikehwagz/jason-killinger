const groq = require('groq')
const client = require('../lib/sanity.js')
const queries = require('../lib/queries.js')

module.exports = async function () {
  const data = await client.fetch(
    groq`*[_type == 'collection'] ${queries.collection}`,
  )

  return data
}
