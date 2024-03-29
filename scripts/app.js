import { picoapp } from 'picoapp'
import { size } from 'martha'

import image from './components/image'
import video from './components/video'
import header from './components/header'
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

const components = {
  image,
  video,
  header,
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
}

const sizes = size()
const state = {
  ...sizes,
  mx: 0,
  my: 0,
  isAltTheme: false,
  isAutoScrolling: false,
  isDropdownExpanded: false,
  isOpen: false,
  lastScrollY: 0,
  lastPath: '/',
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
