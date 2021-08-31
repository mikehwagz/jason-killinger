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
          preview: {
            select: {
              word1: 'word1',
              word2: 'word2',
              word3: 'word3',
            },
            prepare: ({ word1, word2, word3 }) => ({
              title: joinTitleCarouselWords(word1, word2, word3),
            }),
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      titleCarousel: 'titleCarousel',
      media: 'illustration',
    },
    prepare: ({ titleCarousel, ...selection }) => ({
      title: 'Hero',
      subtitle: titleCarousel
        .map(({ word1, word2, word3 }) =>
          joinTitleCarouselWords(word1, word2, word3),
        )
        .join(', '),
      ...selection,
    }),
  },
}

function joinTitleCarouselWords(...words) {
  return words
    .filter((word) => !!word)
    .filter((word) => word.trim().length)
    .join(' ')
}
