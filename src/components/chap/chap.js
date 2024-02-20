import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'
import { scaleBG, scrollFade, shrinkBG, triggerFade, plusTimeline } from './animations'
import { scrollPin, scrollDistance, scrollTrigger } from '../../utils/scroll'
import './chap.scss'
import '../../styles/utils.scss'

const timeline = '.ch-timeline'
const deskTime = '.ch-desktop .ch-timeline'
const deskRail = '.ch-desktop .ch-rail'
const deskAnim = '.ch-desktop .ch-anim'
const deskPlus = '.ch-desktop .ch-plus-bg'
const mobiTime = '.ch-mobile .ch-timeline'
const mobiRail = '.ch-mobile .ch-rail'
const mobiAnim = '.ch-mobile .ch-anim'

gsap.registerPlugin(ScrollTrigger)

const simpleInit = () => {
  const simpleScrollHandlersInitiated = window['simpleChapters']
  const simpleChapters = document.querySelectorAll('[data-type="simple"]')

  if (simpleChapters.length === 0) return
  if (simpleScrollHandlersInitiated) return

  simpleChapters.forEach((element) => scrollPin(element.querySelector(timeline), scaleBG(element.querySelector('.ch-anim'))))

  window['simpleChapters'] = true
}

const enhancedInit = () => {
  const enhancedScrollHandlersInitiated = window['enhancedChapters']
  const enhancedChapters = document.querySelectorAll('[data-type="enhanced"]')

  // checks to prevent multiple scroll handlers being added
  if (enhancedChapters.length === 0) return
  if (enhancedScrollHandlersInitiated) return

  enhancedChapters.forEach((element) => {

    scrollPin(element.querySelector(deskTime), scaleBG(element.querySelector(deskAnim)), true)
    scrollDistance(element.querySelector(deskRail), scrollFade(element.querySelector(deskRail)), 800, 0)

    scrollPin(element.querySelector(mobiTime), () => {})
    ScrollTrigger.create({
      trigger: element.querySelector(mobiRail),
      start: 'top 500px',
      markers: true,
      onEnter: () => {
        shrinkBG(element.querySelector(mobiAnim), true).play()
        triggerFade(element.querySelector(mobiRail), true).play()
      },
      onLeaveBack: () => {
        shrinkBG(element.querySelector(mobiAnim), false).play()
        triggerFade(element.querySelector(mobiRail), false).play()
      }
    });
  })

  window['enhancedChapters'] = true
}

const plusInit = () => {
  const plusScrollHandlersInitiated = window['plusChapers']
  const plusChapters = document.querySelectorAll('[data-type="plus"]')

  if (plusChapters.length === 0) return
  if (plusScrollHandlersInitiated) return

  plusChapters.forEach((element) => {
    const deskBG = element.querySelector(deskPlus)
    const deskAnimation = element.querySelector(deskAnim)

    scrollPin(element.querySelector(deskTime), plusTimeline(deskBG, deskAnimation), true)
    scrollDistance(element.querySelector(deskRail), scrollFade(element.querySelector(deskRail)), 800, 0)

    scrollPin(element.querySelector(mobiTime), () => {})
    ScrollTrigger.create({
      trigger: element.querySelector(mobiRail),
      start: 'top 500px',
      markers: true,
      onEnter: () => {
        shrinkBG(element.querySelector(mobiAnim), true).play()
        triggerFade(element.querySelector(mobiRail), true).play()
      },
      onLeaveBack: () => {
        shrinkBG(element.querySelector(mobiAnim), false).play()
        triggerFade(element.querySelector(mobiRail), false).play()
      }
    });
  })

  window['plusChapers'] = true
}

simpleInit()
enhancedInit()
plusInit()