import React from 'react'
import Emoji from 'a11y-react-emoji'

export default function (emoji, fontSize = 30) {
  return () => <Emoji symbol={emoji} style={{ fontSize }} />
}
