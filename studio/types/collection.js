export default {
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'items',
      title: 'Grid Items',
      type: 'array',
      of: [
        {
          name: 'item',
          title: 'Grid Item',
          type: 'object',
          fields: [
            {
              name: 'post',
              title: 'Post',
              type: 'reference',
              to: [{ type: 'post' }],
            },
            {
              name: 'width',
              title: 'Width',
              type: 'number',
              initialValue: 6,
              options: {
                list: [
                  { title: 'X Small', value: 4 },
                  { title: 'Small', value: 5 },
                  { title: 'Medium', value: 6 },
                  { title: 'Large', value: 8 },
                  { title: 'X Large', value: 9 },
                ],
                layout: 'radio',
              },
            },
          ],
        },
      ],
    },
  ],
}
