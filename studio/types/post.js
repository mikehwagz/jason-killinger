import React from 'react'
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
      name: 'heroImageDesktop',
      title: 'Hero Image (Desktop)',
      type: 'img',
      hidden: ({ parent }) => parent?.type !== 'caseStudy',
    },
    {
      name: 'heroImageMobile',
      title: 'Hero Image (Mobile)',
      type: 'img',
      hidden: ({ parent }) => parent?.type !== 'caseStudy',
    },
    {
      name: 'heroNavTextColor',
      title: 'Hero Navigation Text Color',
      type: 'string',
      initialValue: 'black',
      options: {
        list: ['black', 'white'],
        layout: 'radio',
        direction: 'vertical',
      },
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
            decorators: [{ title: 'Italic', value: 'em' }],
            annotations: [linkAnnotation],
          },
        },
      ],
      hidden: ({ parent }) => parent?.type !== 'caseStudy',
    },
    {
      name: 'client',
      title: 'Client',
      type: 'array',
      validation: (Rule) => Rule.max(1),
      of: [
        {
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            decorators: [{ title: 'Italic', value: 'em' }],
            annotations: [linkAnnotation],
          },
        },
      ],
      hidden: ({ parent }) => parent?.type !== 'caseStudy',
    },
    {
      name: 'collaborators',
      title: 'Collaborators',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            decorators: [{ title: 'Italic', value: 'em' }],
            annotations: [linkAnnotation],
          },
        },
      ],
      hidden: ({ parent }) => parent?.type !== 'caseStudy',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      hidden: ({ parent }) => parent?.type !== 'caseStudy',
    },
    {
      name: 'taxonomies',
      title: 'Taxonomies',
      type: 'object',
      hidden: ({ parent }) => parent?.type !== 'caseStudy',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Disciplines',
        },
        {
          name: 'list',
          title: 'List',
          type: 'array',
          of: [
            {
              name: 'txt',
              title: 'Text',
              type: 'object',
              fields: [
                {
                  name: 'text',
                  type: 'string',
                },
              ],
            },
            {
              name: 'collection',
              type: 'object',
              fields: [
                {
                  name: 'reference',
                  title: 'reference',
                  type: 'reference',
                  to: [{ type: 'collection' }],
                },
              ],
              preview: {
                select: {
                  title: 'reference.title',
                },
              },
            },
          ],
        },
      ],
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
        { type: 'vimeoEmbed' },
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
            decorators: [{ title: 'Italic', value: 'em' }],
            annotations: [linkAnnotation],
          },
        },
      ],
      hidden: ({ parent }) => parent?.type !== 'media',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      type: 'type',
      thumbnail: 'thumbnail',
      media: 'media',
      thumbnailVideo: 'thumbnail.video.asset.url',
      mediaVideo: 'media.video.asset.url',
    },
    prepare({
      type,
      media,
      thumbnail,
      mediaVideo,
      thumbnailVideo,
      ...selection
    }) {
      let asset = type === 'media' ? media : thumbnail
      let videoSrc = type === 'media' ? mediaVideo : thumbnailVideo
      return {
        ...selection,
        media:
          asset?.type === 'video'
            ? () => (
                <video
                  src={`${videoSrc}#t=0.1`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                ></video>
              )
            : asset?.image,
      }
    },
  },
}
