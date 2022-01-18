import * as React from 'react'

export default ({ message: partialMessage = '', textColor = () => '#000' }) => {
  const canvasRef = React.createRef()

  React.useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let dpr = 1
    let textSize = { width: 0 }

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
      textContext.font = `720 72px "Inter Var", sans-serif`
      textContext.textBaseline = 'hanging'
      textContext.textAlign = 'left'
      textContext.fillStyle = textColor()
    }

    const drawText = () => {
      setFont()
      textSize = textContext.measureText(`${partialMessage} `)

      textCanvas.width = textSize.width
      textCanvas.height = 72 * dpr

      setFont()

      textContext.fillText(`${partialMessage} `, 0, 0)
    }

    let xPos = 0
    let raf = null

    function loop() {
      raf = requestAnimationFrame(loop)
      context.clearRect(0, 0, canvas.width, canvas.height)

      context.save()
      context.rotate((-25 * Math.PI) / 180)
      for (let x = -25; x < 25; x += 1) {
        for (let y = 0; y < 50; y += 1) {
          context.drawImage(
            textCanvas,
            x * textCanvas.width + (y % 2 === 0 ? xPos : -xPos),
            (textCanvas.height / dpr) * y,
          )
        }
      }
      context.restore()

      if (xPos < textSize.width) {
        xPos += 0.8
      } else {
        xPos = 0
      }
    }

    document.fonts.ready.then(() => {
      raf = requestAnimationFrame(loop)
    })

    return function cleanup() {
      cancelAnimationFrame(raf)
    }
  })

  return <canvas ref={canvasRef}></canvas>
}
