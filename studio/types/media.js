export default {
  name: 'media',
  title: 'Media',
  type: 'object',
  fields: [
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      initialValue: 'image',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'img',
      hidden: ({ parent }) => parent?.type !== 'image',
    },
    {
      name: 'video',
      title: 'Video',
      type: 'video',
      hidden: ({ parent }) => parent?.type !== 'video',
    },
  ],
}
