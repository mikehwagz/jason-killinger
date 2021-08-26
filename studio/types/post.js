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
      name: 'caseStudy',
      title: 'Case Study',
      type: 'object',
      hidden: ({ parent }) => parent?.type !== 'caseStudy',
      fields: [
        {
          name: 'thumbnail',
          title: 'Thumbnail',
          type: 'media',
        },
        {
          name: 'heroImage',
          title: 'Hero Image',
          type: 'img',
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
        },
        {
          name: 'client',
          title: 'Client',
          type: 'string',
        },
        {
          name: 'collaborators',
          title: 'Collaborators',
          type: 'string',
        },
        {
          name: 'location',
          title: 'Location',
          type: 'string',
        },
        {
          name: 'year',
          title: 'Year',
          type: 'string',
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
        },
      ],
    },
    {
      name: 'media',
      title: 'Media',
      type: 'object',
      hidden: ({ parent }) => parent?.type !== 'media',
      fields: [
        {
          name: 'media',
          title: 'Media',
          type: 'media',
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
        },
      ],
    },
  ],
}
