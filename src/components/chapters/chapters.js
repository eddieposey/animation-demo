import gsap from 'gsap'
import { scrollPin } from '../../utils/scroll-pin'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'
import * as DOMPurify from 'dompurify'
import './chapters.scss'

gsap.registerPlugin(ScrollTrigger)

const chaptersTimeline = gsap.timeline({
  paused: true,
  ease: 'power1.inOut',
})

const setScrollRailPosition = () => {
  const el = document.getElementById('chapters-animation-text')
  el.style.opacity = 0

  ScrollTrigger.matchMedia({
		'(min-width: 1035px)': function () {
      el.style.top = `350px`
    },
		'(max-width: 1035px)': function () {
      el.style.top = `450px`
      el.style.zIndex = `3`
    },
	})
}

const createCursor = (elementID) => {
  const textElement = document.querySelector(elementID)
  const cursorDiv = document.createElement('div')
  cursorDiv.className = 'chapters-cursor'
  textElement.insertAdjacentElement('afterend', cursorDiv)
  return cursorDiv
}

const cursorAnimation = (textElementID) => {
  const textElement = document.querySelector(textElementID)
  const text = textElement.innerHTML.split('').map(letter => `<span>${letter === ' ' ? '&nbsp' : letter}</span>`).join('')
  const sanitizedHtmlContent = DOMPurify.sanitize(text)
  textElement.innerHTML = sanitizedHtmlContent
  const letters = document.querySelectorAll(`${textElementID} span`)
  const cursor = createCursor(textElementID)
  const hideLetterOnLoad = { display: 'none', duration: 0.2 }
  const initialDelay = { display: 'inline', duration: 0.2, delay: 1 }
  const noDelay = { display: 'inline', duration: 0.2 }

  // fade cursor in
  chaptersTimeline.fromTo(cursor, { opacity: 0 }, {opacity: 1})

  // make each letter visible
  letters.forEach((el, index) => chaptersTimeline.fromTo(el, hideLetterOnLoad, index === 0 ? initialDelay : noDelay))

  // fade cursor out
  chaptersTimeline.to(cursor, { opacity: 0 })
}

const captionFade = () => {
  const el = document.getElementById('caption-container')
  chaptersTimeline.to(el, { opacity: 0, duration: 0.75, delay: 0.5 })
}

const imageScale = () => {
  const imageContainer = document.getElementById('climb-image')
  const animationStage = document.getElementById('chapters-animation')
  const initialImagePosition = { right: 0, top: 0, bottom: 0, left: 0, width: '100%' }

	ScrollTrigger.matchMedia({
		'(min-width: 1035px)': function () {
      const finalImagePosition = { right: 40, top: 40, bottom: 40, left: '50%', width: 'initial', duration: 1.25 }
      chaptersTimeline.fromTo(imageContainer, initialImagePosition, finalImagePosition)
      console.log(1)
    },
		'(max-width: 1035px)': function () {
      // const finalStagePosition = { height: '340px'}
      const finalImagePosition = { height: '340px', right: 40, top: 40, bottom: 0, left: 40, width: 'initial', duration: 1.25, }

      // chaptersTimeline.to(animationStage, finalStagePosition)
      chaptersTimeline.fromTo(imageContainer, initialImagePosition, finalImagePosition, '<')
    },
	})
}

const scrollText = () => {
  const el = document.getElementById('chapters-animation-text')
  const imageContainer = document.getElementById('climb-image')

  ScrollTrigger.matchMedia({
		'(min-width: 1035px)': function () {
      chaptersTimeline.to(el, { top: 0, opacity: 1, duration: 2, delay: 0.2 })
      chaptersTimeline.to(el, { top: 'initial', bottom: 0, duration: 3, delay: 0.2 })
    },
		'(max-width: 1035px)': function () {
      chaptersTimeline.to(el, { top: '400px', opacity: 1, duration: 2, delay: 0.2 })
      chaptersTimeline.to(el, { top: 'initial', bottom: 0, duration: 3, delay: 0.2 })
    },
	})
}

const animationTimeline = (textElementsByID) => {
  setScrollRailPosition()
  textElementsByID.forEach(element => cursorAnimation(element))
  captionFade()
  imageScale()
  scrollText()
  return chaptersTimeline
}

const textElementsByID = ['#chapters-text-1', '#chapters-text-2', '#chapters-text-3']

// animationTimeline(textElementsByID)

scrollPin('chapters-animation', animationTimeline(textElementsByID))
