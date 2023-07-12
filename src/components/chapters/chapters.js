import gsap from 'gsap'
import { scrollPin } from '../../utils/scroll-pin'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js';
import debounce from '../../utils/debounce.js'
import * as DOMPurify from 'dompurify';
import './chapters.scss'

gsap.registerPlugin(ScrollTrigger);

const copyTimeline = gsap.timeline({
  paused: true,
  ease: 'power1.inOut',
})

const setScrollRailPosition = () => {
  const el = document.getElementById('chapters-animation-text')
  el.style.top = `350px`
  el.style.opacity = 0
}

const createCursor = (elementID) => {
  const textElement = document.querySelector(elementID);
  const cursorDiv = document.createElement('div');

  cursorDiv.className = 'chapters-cursor';
  textElement.insertAdjacentElement('afterend', cursorDiv);
  return cursorDiv
}

const cursorAnimation = (textElementID) => {
  const textElement = document.querySelector(textElementID)
  const text = textElement.innerHTML.split('').map(letter => `<span>${letter === ' ' ? '&nbsp' : letter}</span>`).join('')

  const sanitizedHtmlContent = DOMPurify.sanitize(text);
  textElement.innerHTML = sanitizedHtmlContent;

  const letters = document.querySelectorAll(`${textElementID} span`)

  const cursor = createCursor(textElementID)

  const hideLetterOnLoad = { display: 'none', duration: 0.2 }
  const initialDelay = { display: 'inline', duration: 0.2, delay: 1 }
  const noDelay = { display: 'inline', duration: 0.2 }

  copyTimeline.fromTo(cursor, { opacity: 0 }, {opacity: 1})

  letters.forEach((el, index) => copyTimeline.fromTo(el, hideLetterOnLoad, index === 0 ? initialDelay : noDelay))

  copyTimeline.to(cursor, { opacity: 0 })
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
  const el = document.getElementById('chapters-animation-text')
  copyTimeline.to(el, { top: 0, opacity: 1, duration: 2, delay: 0.2 })
  copyTimeline.to(el, { top: 'initial', bottom: 0, duration: 3, delay: 0.2 })
}

const animationTimeline = () => {
  setScrollRailPosition()
  cursorAnimation('#chapters-text-1')
  cursorAnimation('#chapters-text-2')
  cursorAnimation('#chapters-text-3')
  captionFade()
  imageScale()
  scrollText()
  return copyTimeline
}

scrollPin('chapters-animation', animationTimeline())
