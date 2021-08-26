export default {
  name: 'postGrid',
  title: 'Post Grid',
  type: 'object',
  fields: [
    {
      name: 'defaultCollection',
      title: 'Default Collection',
      type: 'reference',
      to: [{ type: 'collection' }],
    },
    {
      name: 'isNavigationEnabled',
      title: 'Enable navigation between collections',
      type: 'boolean',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'collection' }] }],
      hidden: ({ parent }) => !parent?.isNavigationEnabled,
    },
  ],
}
