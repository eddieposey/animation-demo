import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'
import * as DOMPurify from 'dompurify'

gsap.registerPlugin(ScrollTrigger)


const scaleBG = (container) => {
  const chaptersTimeline = gsap.timeline({ paused: true, ease: 'Power0.easeNone' })

  const el = container.querySelector('.ch-anim')
  const railPadding = getComputedStyle(container).getPropertyValue('--transition-padding').replace('px', '')

  const start = {  width: '100vw', top: 0, bottom: 0, right: 0 }
  const end = { duration: 4, width: `calc(50vw - ${railPadding * 2}px)`, top: railPadding, bottom: railPadding, right: railPadding }

  chaptersTimeline.fromTo(el, start, end)

  return chaptersTimeline
}

export { scaleBG }