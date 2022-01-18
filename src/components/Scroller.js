import * as React from 'react'

export default ({ message: partialMessage = '', textColor = () => '#000' }) => {
  const canvasRef = React.createRef()
  let message = ''

  for (let i = 0; i < 50; i += 1) {
    message += `${partialMessage} `
  }

  React.useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let dpr = 1
    let textSize = { width: 0 }

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

      setFont()
      textSize = context.measureText(`${partialMessage} `)
    }

    const setFont = () => {
      context.font = `720 72px "Inter Var", sans-serif`
      context.textBaseline = 'hanging'
      context.textAlign = 'center'
      context.fillStyle = textColor()
    }

    let x = 0
    let raf = null

    function loop() {
      raf = requestAnimationFrame(loop)
      context.clearRect(0, 0, canvas.width, canvas.height)
      setFont()

      context.save()
      context.rotate((-25 * Math.PI) / 180)
      for (let i = 0; i < 50; i += 1) {
        context.fillText(message, i % 2 === 0 ? x : -x, 72 * i)
      }
      context.restore()

      if (x < textSize.width) {
        x += 0.8
      } else {
        x = 0
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
