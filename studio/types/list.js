import emoji from '../lib/emoji'
import linkAnnotation from '../lib/linkAnnotation'

export default {
  name: 'list',
  title: 'List',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'isTwoColumns',
      title: 'Split list into 2 columns?',
      type: 'boolean',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      name: 'shouldStackOnMobile',
      title: 'Stack on mobile?',
      type: 'boolean',
      initialValue: true,
      hidden: ({ parent }) => !parent?.isTwoColumns,
      options: {
        layout: 'checkbox',
      },
    },
    {
      name: 'listItems',
      title: 'List Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'content',
              title: 'Content',
              type: 'array',
              validation: (Rule) => Rule.max(1),
              of: [
                {
                  type: 'block',
                  styles: [],
                  lists: [],
                  marks: {
                    decorators: [{ title: 'Italic', value: 'em' }],
                    annotations: [linkAnnotation],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      subtitle: 'title',
    },
    prepare(selection) {
      return {
        title: 'List',
        media: emoji('✅', 20),
        ...selection,
      }
    },
  },
}
