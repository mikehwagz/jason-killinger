import linkAnnotation from '../lib/linkAnnotation'

export default {
  name: 'post',
  title: 'Post',
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
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      initialValue: 'caseStudy',
      options: {
        list: [
          { title: 'Case Study', value: 'caseStudy' },
          { title: 'Media', value: 'media' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },

    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'media',
      hidden: ({ parent }) => parent?.type !== 'caseStudy',
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'img',
      hidden: ({ parent }) => parent?.type !== 'caseStudy',
    },
    {
      name: 'introText',
      title: 'Intro Text',
      type: 'array',
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
      hidden: ({ parent }) => parent?.type !== 'caseStudy',
    },
    {
      name: 'client',
      title: 'Client',
      type: 'string',
      hidden: ({ parent }) => parent?.type !== 'caseStudy',
    },
    {
      name: 'collaborators',
      title: 'Collaborators',
      type: 'string',
      hidden: ({ parent }) => parent?.type !== 'caseStudy',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      hidden: ({ parent }) => parent?.type !== 'caseStudy',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
      hidden: ({ parent }) => parent?.type !== 'caseStudy',
    },
    {
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [
        { type: 'oneUpMedia' },
        { type: 'twoUpMedia' },
        { type: 'twoUpTextAndMedia' },
        { type: 'threeUpMedia' },
        { type: 'editorialText' },
      ],
      hidden: ({ parent }) => parent?.type !== 'caseStudy',
    },
    {
      name: 'related',
      title: 'Related Module',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'posts',
          title: 'Posts',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'post' }] }],
          validation: (Rule) => Rule.max(3),
        },
      ],
      hidden: ({ parent }) => parent?.type !== 'caseStudy',
    },
    {
      name: 'media',
      title: 'Media',
      type: 'media',
      hidden: ({ parent }) => parent?.type !== 'media',
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
      hidden: ({ parent }) => parent?.type !== 'media',
    },
  ],
}
