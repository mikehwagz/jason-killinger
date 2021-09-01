import { picoapp } from 'picoapp'
import { size } from 'martha'

import lazy from './components/lazy'
import header from './components/header'
import hero from './components/hero'
import dropdown from './components/dropdown'
import thumbnailCursor from './components/thumbnailCursor'
import modalCursor from './components/modalCursor'

const components = {
  lazy,
  header,
  hero,
  dropdown,
  thumbnailCursor,
  modalCursor,
}

const sizes = size()
const state = {
  ...sizes,
  mx: 0,
  my: 0,
  isAutoScrolling: false,
  isOpen: false,
  dom: {
    html: document.documentElement,
    body: document.body,
  },
  fonts: [
    { family: 'Akzidenz Grotesk Pro' },
    { family: 'Neue Montreal Medium' },
  ],
}

export default picoapp(components, state)
