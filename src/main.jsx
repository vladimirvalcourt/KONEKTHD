import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function setupAnimatedFavicon() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return

  const source = '/konekt-favicon.png'
  const link =
    document.querySelector("link[rel='icon']") ||
    document.querySelector("link[rel~='icon']")
  if (!link) return

  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const image = new Image()
  image.src = source

  let frame = 0
  let timerId
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const draw = () => {
    if (!image.complete) return

    const t = frame / 24
    const pulse = reduceMotion ? 0 : (Math.sin(t * Math.PI * 2) + 1) / 2
    const scale = 0.93 + pulse * 0.07
    const glow = 0.08 + pulse * 0.14

    ctx.clearRect(0, 0, 64, 64)

    ctx.beginPath()
    ctx.arc(32, 32, 31, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(200,145,58,${glow})`
    ctx.fill()

    const size = 64 * scale
    const offset = (64 - size) / 2
    ctx.drawImage(image, offset, offset, size, size)

    link.setAttribute('href', canvas.toDataURL('image/png'))
    frame = (frame + 1) % 24
  }

  image.onload = () => {
    draw()
    if (reduceMotion) return
    timerId = window.setInterval(draw, 120)
  }

  window.addEventListener('beforeunload', () => {
    if (timerId) window.clearInterval(timerId)
  })
}

setupAnimatedFavicon()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
