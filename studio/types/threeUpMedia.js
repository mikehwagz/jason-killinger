import linkAnnotation from '../lib/linkAnnotation'

export default {
  name: 'threeUpMedia',
  title: '3-Up Media',
  type: 'object',
  fields: [
    {
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [{ type: 'media' }],
      validation: (Rule) => Rule.max(3),
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
      name: 'shouldStackOnMobile',
      title: 'Stack on mobile?',
      type: 'boolean',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
  ],
}
