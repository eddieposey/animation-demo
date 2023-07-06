import gsap from 'gsap'
import './scroll.css'

const copyTimeline = gsap.timeline({ paused: false, ease: 'power1.inOut' })

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

const captionAnimation = () => {
  const el = document.getElementById('caption-container')
  copyTimeline.to(el, { opacity: 0, duration: 0.75, delay: 0.5 })
}

cursorAnimation('first-text', 'first-cursor', 'first-container', 0.65)
cursorAnimation('second-text', 'second-cursor', 'second-container', 1)
cursorAnimation('third-text', 'third-cursor', 'third-container', 1.2)
captionAnimation()
