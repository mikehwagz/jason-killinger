import linkAnnotation from '../lib/linkAnnotation'

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
}
