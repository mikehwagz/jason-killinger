import emoji from '../lib/emoji'

export default {
  name: 'contact',
  title: 'Contact',
  type: 'object',
  fields: [
    {
      name: 'ghost',
      title: 'Ghost',
      type: 'boolean',
      hidden: true,
      initialValue: true,
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact',
        media: emoji('☎️', 23),
      }
    },
  },
}
