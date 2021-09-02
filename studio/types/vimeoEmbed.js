import * as React from 'react'

export default {
  name: 'vimeoEmbed',
  title: 'Vimeo Embed',
  type: 'object',
  fields: [
    {
      name: 'vimeoVideo',
      title: 'Vimeo Video',
      type: 'vimeoVideo',
      options: {
        configurableFields: ['title', 'controls', 'muted', 'loop'],
        defaultFieldValues: {
          autopause: false,
          autoplay: false,
          background: false,
          byline: false,
          controls: true,
          dnt: true,
          loop: false,
          muted: false,
          portrait: false,
          quality: 'auto',
          title: false,
          width: '960',
        },
      },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      vimeoVideo: 'vimeoVideo',
    },
    prepare({ vimeoVideo }) {
      const thumb = vimeoVideo?.oEmbedData?.thumbnail_url
      return {
        title: 'Vimeo Embed',
        subtitle: vimeoVideo?.oEmbedData?.title ?? '',
        media: thumb
          ? () => (
              <img
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                src={thumb}
                alt=""
              />
            )
          : '',
      }
    },
  },
}
