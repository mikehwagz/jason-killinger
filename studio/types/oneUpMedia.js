import * as React from 'react'
import linkAnnotation from '../lib/linkAnnotation'
import blocksToString from '../lib/blocksToString'

export default {
  name: 'oneUpMedia',
  title: '1-Up Media',
  type: 'object',
  fields: [
    {
      name: 'media',
      title: 'Media',
      description: 'Multiple media assets will show up as a carousel.',
      type: 'array',
      of: [{ type: 'media' }],
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
    },
    {
      name: 'isFullBleed',
      title: 'Full bleed?',
      type: 'boolean',
      initalValue: false,
      options: {
        layout: 'checkbox',
      },
    },
  ],
  preview: {
    select: {
      type: 'media.0.type',
      image: 'media.0.image',
      videoUrl: 'media.0.video.asset.url',
      caption: 'caption',
    },
    prepare({ type, image, videoUrl, caption }) {
      return {
        title: '1-Up Media',
        subtitle: blocksToString(caption),
        media:
          type === 'image'
            ? image
            : () => (
                <video
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  src={`${videoUrl}#t=0.1`}
                ></video>
              ),
      }
    },
  },
}
