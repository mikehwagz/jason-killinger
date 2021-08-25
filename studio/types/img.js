export default {
  title: 'Image',
  name: 'img',
  type: 'image',
  fields: [
    {
      name: 'alt',
      title: 'Alt Text',
      description:
        'A short description of the image that is important for accessibility and SEO',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        isHighlighted: true,
      },
    },
  ],
}
