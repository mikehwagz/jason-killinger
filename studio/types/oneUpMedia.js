import linkAnnotation from '../lib/linkAnnotation'

export default {
  name: 'oneUpMedia',
  title: '1-Up Media',
  type: 'object',
  fields: [
    {
      name: 'media',
      title: 'Media',
      type: 'media',
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'array',
      validation: (Rule) => Rule.max(1),
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
    {
      name: 'isFullBleed',
      title: 'Full bleed?',
      type: 'boolean',
      initalValue: false,
      options: {
        layout: 'checkbox',
      },
    },
  ],
}
