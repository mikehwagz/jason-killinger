import blocksToString from '../lib/blocksToString'
import emoji from '../lib/emoji'
import linkAnnotation from '../lib/linkAnnotation'

export default {
  name: 'editorialText',
  title: 'Editorial Text',
  type: 'object',
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h2' },
          ],
          lists: [],
          marks: {
            decorators: [{ title: 'Italic', value: 'em' }],
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
    prepare({ content, selection }) {
      return {
        title: 'Editorial Text',
        subtitle: blocksToString(content),
        media: emoji('📝'),
      }
    },
  },
}
