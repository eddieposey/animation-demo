import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'
import * as DOMPurify from 'dompurify'

gsap.registerPlugin(ScrollTrigger)

const container = document.querySelector('[data-component="chapters"]')
const railPadding = getComputedStyle(container).getPropertyValue('--transition-padding').replace('px', '')
const options = { paused: true, ease: 'Power0.easeNone' }

const scrollFade = (element) => {
  const railTimeline = gsap.timeline(options)
  const start = { opacity: 0 }
  const end = { opacity: 1 }

  railTimeline.fromTo(element, start, end)

  return railTimeline
}

const scaleBG = (element) => {
  const scaleTimeline = gsap.timeline(options)
  const start = {  width: '100vw', top: 0, bottom: 0, right: 0, left: 'initial', height: 'initial' }
  const end = { duration: 4, width: `calc(50vw - ${railPadding * 2}px)`, top: railPadding, bottom: railPadding, right: railPadding }

  scaleTimeline.fromTo(element, start, end)

  return scaleTimeline
}

const shrinkBG = (element, forwards) => {
  const shrinkTimeline = gsap.timeline(options)
  const start = { height: '100%', left: 0, right: 0, bottom: 0 }
  const end = { height: '255px', left: railPadding, right: railPadding }

  if(forwards) {
    shrinkTimeline.to(element, end)
  }

  if (!forwards) {
    shrinkTimeline.to(element, start)
  }

  return shrinkTimeline
}

const triggerFade = (element, forwards) => {
  const fadeTimeline = gsap.timeline(options)
  const start = { opacity: 0 }
  const end = { opacity: 1 }

  if(forwards) {
    fadeTimeline.to(element, end)
  }

  if (!forwards) {
    fadeTimeline.to(element, start)
  }

  return fadeTimeline
}

const simpleTimeline = () => {
  
}

export { scaleBG, scrollFade, shrinkBG, triggerFade }