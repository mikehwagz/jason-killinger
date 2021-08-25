const client = require('@sanity/client')

module.exports = client({
  projectId: 'fob5aicq',
  dataset: 'production',
  apiVersion: 'v2021-06-07',
  useCdn: false,
})
