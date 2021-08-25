import seoFields from '../lib/seoFields'

export default {
  title: 'Settings',
  name: 'settings',
  type: 'document',
  fieldsets: [
    { title: 'General', name: 'general' },
    { title: 'SEO', name: 'seo' },
  ],
  fields: [
    {
      name: 'homepage',
      title: 'Homepage',
      description:
        'Select a page to use as the main landing page of the website',
      type: 'reference',
      to: [{ type: 'page' }],
      validation: (Rule) => Rule.required(),
    },
    ...seoFields.map((field) => ({
      ...field,
      fieldset: 'seo',
    })),
  ],
}
