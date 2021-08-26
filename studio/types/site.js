import seoFields from '../lib/seoFields'

export default {
  title: 'Site',
  name: 'site',
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
    {
      name: 'navigation',
      title: 'Navigation',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'page' }] }],
    },
    {
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        {
          name: 'link',
          title: 'Link',
          type: 'link',
        },
        {
          name: 'copyright',
          title: 'Copyright',
          description: 'Use {year} to insert the current year',
          type: 'string',
        },
      ],
    },
    ...seoFields.map((field) => ({
      ...field,
      fieldset: 'seo',
    })),
  ],
}
