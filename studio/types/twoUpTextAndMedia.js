export default {
  name: 'twoUp',
  title: '2-Up',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3,
    },
    {
      name: 'media',
      title: 'Media',
      description: 'Multiple media assets will show up as a carousel.',
      type: 'array',
      validation: (Rule) => Rule.max(2),
      of: [{ type: 'media' }],
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: 'Text / Image',
      options: {
        list: ['Text / Image', 'Image / Text'],
        layout: 'radio',
        direction: 'horizontal',
      },
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
    {
      name: 'mobileLayout',
      title: 'Mobile Layout',
      type: 'string',
      initialValue: 'Text / Image',
      options: {
        list: ['Text / Image', 'Image / Text'],
        layout: 'radio',
        direction: 'horizontal',
      },
      hidden: ({ parent }) => !parent?.shouldStackOnMobile,
    },
  ],
}
