import { picoapp } from 'picoapp'
import { size } from 'martha'

import lazy from './components/lazy'
import header from './components/header'
import hero from './components/hero'
import dropdown from './components/dropdown'

const components = { lazy, header, hero, dropdown }

const sizes = size()
const state = {
  ...sizes,
  mx: sizes.ww / 2,
  my: sizes.wh / 2,
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
