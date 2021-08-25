export default {
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'External', value: 'external' },
          { title: 'Internal', value: 'internal' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'external',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'tel', 'mailto'],
        }),
      hidden: ({ parent }) => parent?.type !== 'external',
    },
    {
      name: 'reference',
      title: 'Reference',
      type: 'reference',
      to: [{ type: 'post', type: 'collection', type: 'page' }],
      hidden: ({ parent }) => parent?.type !== 'internal',
    },
  ],
}
