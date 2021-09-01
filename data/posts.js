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
      caption[] {
        ...,
        markDefs[] ${queries.link},
      },
    },
  }`)

  return posts
}
