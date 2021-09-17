import { component } from 'picoapp'

export default component((node, ctx) => {
  let alpha = 0.06
  let size = 128

  const canvas = createCanvas({
    dpr: 1,
    parent: node,
  })

  const hiddenCanvas = createCanvas({
    dpr: 1,
  }).resize(size, size)

  let fps = 15
  let interval = 1000 / fps
  let start = Date.now()
  let then = start

  ctx.on('resize', resize)
  ctx.on('tick', ({ ww, wh, time }) => {
    let t = time * 1000
    let now = start + t
    let elapsed = now - then

    if (elapsed > interval) {
      then = now - (elapsed % interval)
      drawNoise({
        grayscale: true,
        width: ww,
        height: wh,
      })
    }
  })

  function drawNoise({ grayscale = true, width, height }) {
    let hctx = hiddenCanvas.context

    for (
      var img = hctx.getImageData(0, 0, size, size), i = 0;
      i < img.data.length;
      i += 4
    ) {
      if (grayscale) {
        img.data[i] =
          img.data[i + 1] =
          img.data[i + 2] =
            ~~(255 * Math.random())
      } else {
        img.data[i] = ~~(255 * Math.random())
        img.data[i + 1] = ~~(255 * Math.random())
        img.data[i + 2] = ~~(255 * Math.random())
      }

      img.data[i + 3] = 255
    }

    hctx.putImageData(img, 0, 0)

    let ctx = canvas.context
    let w = Math.ceil(width / size)
    let h = Math.ceil(height / size)

    ctx.clearRect(0, 0, width, height)
    ctx.globalAlpha = alpha

    for (let i = 0; w > i; i++) {
      for (var j = 0; h > j; j++) {
        ctx.drawImage(hiddenCanvas.element, i * size, j * size, size, size)
      }
    }
  }

  function resize({ ww, wh }) {
    canvas.resize(ww, wh)
  }

  function createCanvas({ dpr, parent }) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    if (parent) {
      parent.appendChild(canvas)
    }

    return {
      element: canvas,
      context,
      resize(width, height) {
        canvas.width = width * dpr
        canvas.height = height * dpr
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
        return this
      },
    }
  }
})
