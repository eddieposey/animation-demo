import gsap from 'gsap'
import { scrollPin } from '../../utils/scroll-pin'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js';
import debounce from '../../utils/debounce.js'
import './chapters.scss'

gsap.registerPlugin(ScrollTrigger);

const copyTimeline = gsap.timeline({
  paused: true,
  ease: 'power1.inOut' ,
  scrollTrigger: {
    scrub: true,
    invalidateOnRefresh: true,
  }
})

const setScrollTextPosition = () => {
  const el = document.getElementById('climb-text')
  el.style.top = `350px`
  el.style.opacity = 0
}

const cursorAnimation = (textElement, cursorElement, textContainerElement, duration) => {

  let textContainer;
  let textContainerWidth;
  let cursor;
  let cursorWidth;
  let helloContainer;
  let helloContainerWidth;
  let endOfAnimationWidth;

  const setContainerDimensions = () => {
    // get the text width
    textContainer = document.getElementById(textElement)
    textContainerWidth = textContainer.offsetWidth + 1
    textContainer.style.width = `${textContainerWidth}px`

    // get the cursor width
    cursor = document.getElementById(cursorElement)
    cursorWidth = cursor.offsetWidth

    // get the text container width
    helloContainer = document.getElementById(textContainerElement)
    helloContainerWidth = cursorWidth

    // width of animation end
    endOfAnimationWidth = textContainerWidth + cursorWidth + 5
  }

  setContainerDimensions()

  window.addEventListener('resize', debounce(() => {
    ScrollTrigger.addEventListener("refresh", setContainerDimensions);
  }))

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
  copyTimeline.fromTo(el,
  {
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
    width: '100%',
  },
  {
    right: 40,
    top: 40,
    bottom: 40,
    left: '50%',
    width: 'initial',
    duration: 1.25,
  }
  )
}

const scrollText = () => {
  const el = document.getElementById('climb-text')
  copyTimeline.to(el, { top: 0, opacity: 1, duration: 2, delay: 0.2 })
  copyTimeline.to(el, { top: 'initial', bottom: 0, duration: 3, delay: 0.2 })
}

const animationTimeline = () => {
  setScrollTextPosition()
  cursorAnimation('first-text', 'first-cursor', 'first-container', 0.65)
  cursorAnimation('second-text', 'second-cursor', 'second-container', 1)
  cursorAnimation('third-text', 'third-cursor', 'third-container', 1.2)
  captionFade()
  imageScale()
  scrollText()
  return copyTimeline
}

scrollPin('climb-animation', animationTimeline())
