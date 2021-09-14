import { component } from 'picoapp'
import inview from '../lib/inview'
import signal from '../lib/signal'

export default component((video, ctx) => {
  let [playing, setPlaying] = signal(false, (playing) =>
    video[playing ? 'play' : 'pause'](),
  )

  ctx.on('enter:completed', () => {
    video.src = video.dataset.src
    video.removeAttribute('data-src')
  })

  ctx.on('tick', ({ wh }) => {
    if (inview(video, wh)) {
      !playing() && setPlaying(true)
    } else {
      playing() && setPlaying(false)
    }
  })
})
