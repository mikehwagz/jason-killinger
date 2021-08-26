export default {
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    {
      name: 'titleCarousel',
      title: 'Title Carousel',
      type: 'array',
      of: [
        {
          type: 'object',
          fieldsets: [{ name: '3up', options: { columns: 3 } }],
          fields: [
            {
              name: 'word1',
              title: 'Word 1',
              type: 'string',
              fieldset: '3up',
            },
            {
              name: 'word2',
              title: 'Word 2',
              type: 'string',
              fieldset: '3up',
            },
            {
              name: 'word3',
              title: 'Word 3',
              type: 'string',
              fieldset: '3up',
            },
          ],
        },
      ],
    },
    {
      name: 'illustration',
      title: 'Illustration',
      type: 'image',
      options: {
        accept: 'svg',
      },
    },
  ],
}
