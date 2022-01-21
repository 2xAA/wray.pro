import * as React from 'react'

const Scroller = ({
  message: partialMessage = '',
  textColor = () => '#000',
  backgroundColor = () => 'transparent',
}) => {
  const canvasRef = React.createRef()

  React.useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let dpr = 1
    let textSize = { width: 0 }
    let fontSize = 72 * 2

    const textCanvas = document.createElement('canvas')
    const textContext = textCanvas.getContext('2d')

    const resizeObserver = new ResizeObserver((entries) => {
      handleResize()
    })

    resizeObserver.observe(canvas.parentNode)

    const handleResize = () => {
      dpr = window.devicePixelRatio

      canvas.width = canvas.parentNode.clientWidth * dpr

      // deliberately half the height
      canvas.height = canvas.parentNode.clientWidth * 0.5625
      canvas.style.width = '100%'

      drawText()
    }

    const setFont = () => {
      textContext.font = `720 ${fontSize}px "Inter Var", sans-serif`
      textContext.textBaseline = 'hanging'
      textContext.textAlign = 'left'
      textContext.fillStyle = textColor()
    }

    const drawText = () => {
      setFont()
      textSize = textContext.measureText(`${partialMessage} `)

      textCanvas.width = textSize.width
      textCanvas.height = fontSize

      textContext.save()
      textContext.fillStyle = backgroundColor()
      textContext.fillRect(0, 0, textCanvas.width, textCanvas.height)
      textContext.restore()

      setFont()

      textContext.fillText(`${partialMessage} `, 0, 0)
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => drawText())

    let xPos = 0
    let raf = null
    let rowHeight = 20
    let sinWidth = 80

    function loop(timestamp = 0) {
      raf = requestAnimationFrame(loop)
      context.clearRect(0, 0, canvas.width, canvas.height)

      context.save()
      context.rotate((-25 * Math.PI) / 180)
      for (let x = -25; x < 25; x += 1) {
        for (let y = 0; y < 50; y += 1) {
          context.drawImage(
            textCanvas,
            x * textCanvas.width + (y % 2 === 0 ? xPos : -xPos),
            textCanvas.height * y,
          )
        }
      }
      context.restore()

      if (!isSafari) {
        for (let i = 0; i < canvas.height; i += rowHeight) {
          context.drawImage(
            canvas,
            Math.round(Math.sin(i / 100 + timestamp / 1000) * sinWidth),
            i,
            canvas.width,
            rowHeight,
            -sinWidth,
            i,
            canvas.width + sinWidth * 2,
            rowHeight,
          )
        }
      }

      if (xPos < textSize.width) {
        xPos += 0.8
      } else {
        xPos = 0
      }
    }

    document.fonts.ready.then(() => {
      handleResize()
      raf = requestAnimationFrame(loop)
    })

    return function cleanup() {
      cancelAnimationFrame(raf)
    }
  })

  return <canvas ref={canvasRef}></canvas>
}

export default Scroller
