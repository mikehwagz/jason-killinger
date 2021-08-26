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
            decorators: [],
            annotations: [linkAnnotation],
          },
        },
      ],
    },
  ],
}
