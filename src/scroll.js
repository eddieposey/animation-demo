import gsap from 'gsap'
import { scrollPin } from './scroll-pin'
import './scroll.css'

const copyTimeline = gsap.timeline({ paused: true, ease: 'power1.inOut' })

const setScrollTextPosition = () => {
  const el = document.getElementById('climb-text')
  el.style.top = `350px`
  el.style.opacity = 0
}

const cursorAnimation = (
  textElement,
  cursorElement,
  textContainerElement,
  duration
) => {
  // get the text width
  const textContainer = document.getElementById(textElement)
  const textContainerWidth = textContainer.offsetWidth + 1
  textContainer.style.width = `${textContainerWidth}px`

  // get the cursor width
  const cursor = document.getElementById(cursorElement)
  const cursorWidth = cursor.offsetWidth

  // get the text container width
  const helloContainer = document.getElementById(textContainerElement)
  const helloContainerWidth = cursorWidth

  // width of animation end
  const endOfAnimationWidth = textContainerWidth + cursorWidth + 5

  // fade cursor in
  copyTimeline.fromTo(
    helloContainer,
    { opacity: 0, duration: 0.75 },
    { opacity: 1, duration: 0.75 }
  )

  // slide cursor from left to right
  copyTimeline.fromTo(
    helloContainer,
    { width: helloContainerWidth, duration },
    { width: endOfAnimationWidth, duration }
  )

  // fade cursor out
  copyTimeline.to(cursor, { opacity: 0, duration: 0.75 })
}

const captionFade = () => {
  const el = document.getElementById('caption-container')
  copyTimeline.to(el, { opacity: 0, duration: 0.75, delay: 0.5 })
}

const imageScale = () => {
  const el = document.getElementById('climb-image')
  copyTimeline.to(el, {
    right: 40,
    top: 40,
    bottom: 40,
    width: '41.5%',
    duration: 1.25,
  })
}

const scrollText = () => {
  const el = document.getElementById('climb-text')
  copyTimeline.to(el, { top: 0, opacity: 1, duration: 2, delay: 0.2 })
  copyTimeline.to(el, { top: 'initial', bottom: 0, duration: 3, delay: 0.2 })
}
const wholeTimeline = () => {
  setScrollTextPosition()
  cursorAnimation('first-text', 'first-cursor', 'first-container', 0.65)
  cursorAnimation('second-text', 'second-cursor', 'second-container', 1)
  cursorAnimation('third-text', 'third-cursor', 'third-container', 1.2)
  captionFade()
  imageScale()
  scrollText()
  return copyTimeline
}

scrollPin('climb-animation', wholeTimeline())
