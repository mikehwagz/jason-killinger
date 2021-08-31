import React from 'react'

export default {
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    {
      name: 'displayTitle',
      title: 'Display Title',
      description: 'Only used within Sanity (never seen by website users)',
      type: 'string',
    },
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
        isUnique: () => true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          name: 'spacer',
          title: 'Spacer',
          type: 'object',
          fields: [
            {
              name: 'width',
              title: 'Width',
              type: 'number',
              initialValue: 1,
              options: {
                list: new Array(6).fill().map((_, i) => i + 1),
                layout: 'radio',
              },
            },
          ],
          preview: {
            select: {
              width: 'width',
            },
            prepare({ width }) {
              return {
                title: 'Spacer',
                subtitle: `Width: ${width}`,
              }
            },
          },
        },
        {
          name: 'item',
          title: 'Item',
          type: 'object',
          fields: [
            {
              name: 'post',
              title: 'Post',
              type: 'reference',
              to: [{ type: 'post' }],
            },
            {
              name: 'width',
              title: 'Width',
              type: 'number',
              initialValue: 6,
              options: {
                list: [4, 5, 6, 7, 8, 9],
                layout: 'radio',
              },
            },
            {
              name: 'verticalAlignment',
              title: 'Vertical Alignment',
              type: 'string',
              initialValue: 'start',
              options: {
                list: [
                  { title: 'Top', value: 'start' },
                  { title: 'Center', value: 'center' },
                  { title: 'Bottom', value: 'end' },
                ],
                layout: 'radio',
              },
            },
          ],
          preview: {
            select: {
              title: 'post.title',
              width: 'width',
              type: 'post.type',
              thumbnail: 'post.thumbnail',
              media: 'post.media',
              thumbnailVideo: 'post.thumbnail.video.asset.url',
              mediaVideo: 'post.media.video.asset.url',
            },
            prepare({
              type,
              media,
              thumbnail,
              mediaVideo,
              thumbnailVideo,
              width,
              ...selection
            }) {
              let asset = type === 'media' ? media : thumbnail
              let videoSrc = type === 'media' ? mediaVideo : thumbnailVideo
              return {
                ...selection,
                subtitle: `Width: ${width}`,
                media:
                  asset?.type === 'video'
                    ? () => (
                        <video
                          src={`${videoSrc}#t=0.1`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        ></video>
                      )
                    : asset?.image,
              }
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      displayTitle: 'displayTitle',
    },
    prepare: ({ title, displayTitle }) => ({ title: displayTitle ?? title }),
  },
}
