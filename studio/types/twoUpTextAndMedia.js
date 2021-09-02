import * as React from 'react'

export default {
  name: 'twoUpTextAndMedia',
  title: '2-Up Text & Media',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3,
    },
    {
      name: 'media',
      title: 'Media',
      description: 'Multiple media assets will show up as a carousel.',
      type: 'array',
      of: [{ type: 'media' }],
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: 'Text / Image',
      options: {
        list: ['Text / Image', 'Image / Text'],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    {
      name: 'mobileLayout',
      title: 'Mobile Layout',
      type: 'string',
      initialValue: 'Text / Image',
      options: {
        list: ['Text / Image', 'Image / Text'],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
  ],
  preview: {
    select: {
      type: 'media.0.type',
      image: 'media.0.image',
      videoUrl: 'media.0.video.asset.url',
      text: 'text',
    },
    prepare({ type, image, videoUrl, text }) {
      return {
        title: '2-Up Text & Media',
        subtitle: text,
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
