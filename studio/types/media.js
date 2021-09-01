import * as React from 'react'

export default {
  name: 'media',
  title: 'Media',
  type: 'object',
  fields: [
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      initialValue: 'image',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'img',
      hidden: ({ parent }) => parent?.type !== 'image',
    },
    {
      name: 'video',
      title: 'Video',
      type: 'video',
      hidden: ({ parent }) => parent?.type !== 'video',
    },
  ],
  preview: {
    select: {
      type: 'type',
      image: 'image',
      video: 'video',
      videoUrl: 'video.asset.url',
    },
    prepare({ type, image, video, videoUrl }) {
      return {
        title: type === 'image' ? image.alt : video.alt,
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
