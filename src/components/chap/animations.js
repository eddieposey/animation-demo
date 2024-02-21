import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'
import * as DOMPurify from 'dompurify'

gsap.registerPlugin(ScrollTrigger)

const container = document.querySelector('[data-component="chapters"]')
const railPadding = getComputedStyle(container).getPropertyValue('--transition-padding').replace('px', '')
const options = { paused: true, ease: 'Power0.easeNone' }

const scrollFade = (element, isTimeline, reverse) => {
  const railTimeline = gsap.timeline(isTimeline ? {} : options)
  const visible = { opacity: 0 }
  const invisible = { opacity: 1 }

  if(reverse) {
    return railTimeline.fromTo(element, visible, invisible)
  }

  if(!reverse) {
    return railTimeline.fromTo(element, invisible, visible)
  }
}

const scaleBG = (element) => {
  const scaleTimeline = gsap.timeline()
  const start = {  width: '100vw', top: 0, bottom: 0, right: 0, left: 'initial', height: 'initial' }
  const end = { duration: 4, width: `calc(50vw - ${railPadding * 2}px)`, top: railPadding, bottom: railPadding, right: railPadding }

  scaleTimeline.fromTo(element, start, end)

  return scaleTimeline
}

const shrinkBG = (element, forwards) => {
  const shrinkTimeline = gsap.timeline()
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
  const fadeTimeline = gsap.timeline()
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

const createCursor = (textElement) => {
  const cursorDiv = document.createElement('div')
  cursorDiv.className = 'ch-cursor'
  cursorDiv.classList.add('ch-cursor')
  textElement.insertAdjacentElement('beforeend', cursorDiv)
  return cursorDiv
}

const typewriter = (lines) => {
  const typewriterTimeline = gsap.timeline()

  lines.forEach(line => {
    const cursorInTimeline = gsap.timeline()
    const cursorOutTimeline = gsap.timeline()
    const letterTimeline = gsap.timeline()
    const letters = line.innerText.split('').map(letter => letter !== ' ' ? `<span>${letter}</span>` : '<span>&nbsp;</span>').join('')
    const start = { display: 'none' }
    const end = { display: 'block' }

    line.innerHTML = letters

    const cursor = createCursor(line)

    cursorInTimeline.fromTo(cursor, { opacity: 0 }, { opacity: 1 })
    cursorOutTimeline.to(cursor, { opacity: 0 })

    const wrappedLetters = Array.from(line.querySelectorAll('span'))
    wrappedLetters.forEach(letter => letterTimeline.fromTo(letter, start, end))

    typewriterTimeline.add(cursorInTimeline).add(letterTimeline).add(cursorOutTimeline)
  })

  return typewriterTimeline
}

const simpleTimeline = (lines) => {
  const typing = typewriter(lines).delay(0.5)
  const space = gsap.timeline().delay(2)
  return gsap.timeline(options).add(typing).add(space)
}

const enhancedTimeline = (lines, stage, type, mobile) => {
  const typing = typewriter(lines).duration(2).delay(0.5)
  const fade = scrollFade(type, true).duration(2)

  if(mobile) {
    return gsap.timeline(options).add(typing).add(fade)
  }

  if(!mobile) {
    const scale = scaleBG(stage).duration(2)
    return gsap.timeline(options).add(typing).add(fade).add(scale)
  }
}

const plusTimeline = (lines, bg, stage, type, mobile) => {
  const typing = typewriter(lines).duration(2).delay(0.5)
  const fade = scrollFade(bg, true).duration(2)
  const fade2 = scrollFade(type, true).duration(2)

  if(mobile) {
    return gsap.timeline(options).add(typing).add(fade).add(fade2)
  }

  if(!mobile) {
    const scale = scaleBG(stage).duration(1)
    return gsap.timeline(options).add(typing).add(fade).add(fade2).add(scale)
  }
}

export { scaleBG, scrollFade, shrinkBG, triggerFade, simpleTimeline, enhancedTimeline, plusTimeline }