export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'metaDescription',
      title: 'Share Description',
      type: 'string',
    },
    {
      name: 'metaImage',
      title: 'Share Image',
      type: 'img',
    },
    {
      name: 'isDarkModeEnabled',
      title: 'Enable Dark Mode?',
      description: '(White text on black background)',
      type: 'boolean',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'postGrid' },
        { type: 'bio' },
        { type: 'list' },
        { type: 'contact' },
        { type: 'oneUpMedia' },
        { type: 'twoUpMedia' },
        { type: 'twoUpTextAndMedia' },
        { type: 'threeUpMedia' },
        { type: 'editorialText' },
        { type: 'vimeoEmbed' },
      ],
    },
  ],
}
