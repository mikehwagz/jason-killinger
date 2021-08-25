import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import img from './types/img'
import video from './types/video'
import media from './types/media'
import link from './types/link'
import settings from './types/settings'
import post from './types/post'
import collection from './types/collection'
import page from './types/page'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    // Objects
    img,
    video,
    media,
    link,
    // Documents
    settings,
    post,
    collection,
    page,
  ]),
})
