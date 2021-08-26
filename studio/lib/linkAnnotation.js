import emoji from '../lib/emoji'

export default {
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      initialValue: 'external',
      options: {
        list: [
          { title: 'External', value: 'external' },
          { title: 'Internal', value: 'internal' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
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
    {
      name: 'openInNewTab',
      title: 'Open link in a new tab?',
      type: 'boolean',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
  ],
  blockEditor: {
    icon: emoji('🔗', 16),
  },
}
