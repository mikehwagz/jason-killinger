import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import img from './types/img'
import video from './types/video'
import media from './types/media'
import link from './types/link'

import hero from './types/hero'
import postGrid from './types/postGrid'
import bio from './types/bio'
import list from './types/list'
import contact from './types/contact'
import oneUpMedia from './types/oneUpMedia'
import twoUpMedia from './types/twoUpMedia'
import twoUpTextAndMedia from './types/twoUpTextAndMedia'
import threeUpMedia from './types/threeUpMedia'
import editorialText from './types/editorialText'
import vimeoEmbed from './types/vimeoEmbed'

import site from './types/site'
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
    ////
    hero,
    postGrid,
    bio,
    list,
    contact,
    oneUpMedia,
    twoUpMedia,
    twoUpTextAndMedia,
    threeUpMedia,
    editorialText,
    vimeoEmbed,
    // Documents
    site,
    post,
    collection,
    page,
  ]),
})
