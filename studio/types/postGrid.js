export default {
  name: 'postGrid',
  title: 'Post Grid',
  type: 'object',
  fields: [
    {
      name: 'navLabel',
      title: 'Nav Label',
      type: 'string',
    },
    {
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'collection' }] }],
    },
  ],
  preview: {
    select: {
      ...new Array(4).fill().reduce((acc, _, i) => {
        acc[`collection${i}`] = `collections.${i}.title`
        return acc
      }, {}),
    },
    prepare(selection) {
      const collections = Object.keys(selection)
        .filter((key) => key.includes('collection'))
        .map((key) => selection[key])
        .filter(Boolean)

      return {
        title: 'Post Grid',
        subtitle: `${collections.slice(0, 3).join(', ')}${
          collections.length > 3 ? ` + ${collections.length - 3} more` : ''
        }`,
      }
    },
  },
}
