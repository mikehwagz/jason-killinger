import linkAnnotation from '../lib/linkAnnotation'
import blocksToString from '../lib/blocksToString'
import emoji from '../lib/emoji'

export default {
  name: 'bio',
  title: 'Bio',
  type: 'object',
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            decorators: [],
            annotations: [linkAnnotation],
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({ content }) {
      return {
        title: 'Bio',
        subtitle: blocksToString(content),
        media: emoji('📖'),
      }
    },
  },
}
