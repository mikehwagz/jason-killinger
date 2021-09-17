import { picoapp } from 'picoapp'
import { size } from 'martha'

import image from './components/image'
import video from './components/video'
import header from './components/header'
import wave from './components/wave'
import hero from './components/hero'
import dropdown from './components/dropdown'
import thumbnailCursor from './components/thumbnailCursor'
import modalCursor from './components/modalCursor'
import carousel from './components/carousel'
import related from './components/related'
import contact from './components/contact'
import caseStudy from './components/caseStudy'
import webgl from './components/webgl'
import scrollUp from './components/scrollUp'
import eye from './components/eye'
import funHover from './components/funHover'
import themeToggle from './components/themeToggle'
import noise from './components/noise'

const components = {
  image,
  video,
  header,
  wave,
  hero,
  dropdown,
  thumbnailCursor,
  modalCursor,
  carousel,
  related,
  contact,
  caseStudy,
  webgl,
  scrollUp,
  eye,
  funHover,
  themeToggle,
  noise,
}

const sizes = size()
const state = {
  ...sizes,
  mx: 0,
  my: 0,
  isAltTheme: false,
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
