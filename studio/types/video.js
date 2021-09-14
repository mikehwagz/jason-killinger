export default {
  title: 'Video',
  name: 'video',
  type: 'file',
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
    {
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      description:
        'To calculate, divide the width of the video by the height and round to 2 decimal places. (e.g. 16 / 9 = 1.78, 1800 / 1440 = 1.25, or 1200 / 1500 = 0.8)',
      type: 'number',
      validation: (Rule) => Rule.required(),
      options: {
        isHighlighted: true,
      },
    },
  ],
}
