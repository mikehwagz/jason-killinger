import seoFields from '../lib/seoFields'
import Tabs from 'sanity-plugin-tabs'

export default {
  title: 'Site',
  name: 'site',
  type: 'document',
  inputComponent: Tabs,
  fieldsets: [
    { title: 'General', name: 'general' },
    { title: 'Footer', name: 'footer' },
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
      fieldset: 'general',
    },
    {
      name: 'navigation',
      title: 'Navigation',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'page' }] }],
      fieldset: 'general',
    },
    {
      name: 'altThemeColor1',
      title: 'Alt Theme Color 1',
      type: 'color',
      options: {
        disableAlpha: true,
      },
      fieldset: 'general',
    },
    {
      name: 'altThemeColor2',
      title: 'Alt Theme Color 2',
      type: 'color',
      options: {
        disableAlpha: true,
      },
      fieldset: 'general',
    },
    {
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fieldset: 'footer',
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
