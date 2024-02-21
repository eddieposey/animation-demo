import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'
import { scaleBG, scrollFade, shrinkBG, triggerFade, simpleTimeline, enhancedTimeline, plusTimeline } from './animations'
import { scrollPin, scrollDistance, scrollTrigger } from '../../utils/scroll'
import './chap.scss'
import '../../styles/utils.scss'

const timeline = '.ch-timeline'
const typewriter = '.ch-typewriter p'

const deskTime = '.ch-desktop .ch-timeline'
const deskRail = '.ch-desktop .ch-rail'
const deskAnim = '.ch-desktop .ch-anim'
const deskPlus = '.ch-desktop .ch-plus-bg'
const deskType = '.ch-desktop .ch-typewriter'
const deskLett = '.ch-desktop .ch-typewriter p'

const mobiTime = '.ch-mobile .ch-timeline'
const mobiRail = '.ch-mobile .ch-rail'
const mobiAnim = '.ch-mobile .ch-anim'
const mobiPlus = '.ch-mobile .ch-plus-bg'
const mobiType = '.ch-mobile .ch-typewriter'
const mobiLett = '.ch-mobile .ch-typewriter p'

gsap.registerPlugin(ScrollTrigger)

const simpleInit = () => {
  const simpleScrollHandlersInitiated = window['simpleChapters']
  const simpleChapters = document.querySelectorAll('[data-type="simple"]')

  if (simpleChapters.length === 0) return
  if (simpleScrollHandlersInitiated) return

  // desktop and mobile animations
  simpleChapters.forEach((element) => {
    const time = element.querySelector(timeline)
    const lines = element.querySelectorAll(typewriter)
    scrollPin(time, simpleTimeline(lines))
  })

  window['simpleChapters'] = true
}

const enhancedInit = () => {
  const enhancedScrollHandlersInitiated = window['enhancedChapters']
  const enhancedChapters = document.querySelectorAll('[data-type="enhanced"]')

  if (enhancedChapters.length === 0) return
  if (enhancedScrollHandlersInitiated) return

  enhancedChapters.forEach((element) => {
    // desktop animations
    const deskAnimation = element.querySelector(deskAnim)
    const desktopLines = element.querySelectorAll(deskLett)
    const desktopTypewriter = element.querySelectorAll(deskType)

    scrollPin(element.querySelector(deskTime), enhancedTimeline(desktopLines, deskAnimation, desktopTypewriter, false), true)
    scrollDistance(element.querySelector(deskRail), scrollFade(element.querySelector(deskRail), false, true), 800, 0)

    // mobile animations
    const mobiAnimation = element.querySelector(mobiAnim)
    const mobiLines = element.querySelectorAll(mobiLett)
    const mobiTypewriter = element.querySelectorAll(mobiType)

    scrollPin(element.querySelector(mobiTime), enhancedTimeline(mobiLines, mobiAnimation, mobiTypewriter, true))

    ScrollTrigger.create({
      trigger: element.querySelector(mobiRail),
      start: 'top 500px',
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
    // desktop animations
    const deskBG = element.querySelector(deskPlus)
    const deskAnimation = element.querySelector(deskAnim)
    const desktopLines = element.querySelectorAll(deskLett)
    const desktopTypewriter = element.querySelectorAll(deskType)

    scrollPin(element.querySelector(deskTime), plusTimeline(desktopLines, deskBG, deskAnimation, desktopTypewriter), true)
    scrollDistance(element.querySelector(deskRail), scrollFade(element.querySelector(deskRail), false, true), 800, 0)

    // mobile animations
    const mobiBG = element.querySelector(mobiPlus)
    const mobiAnimation = element.querySelector(mobiAnim)
    const mobiLines = element.querySelectorAll(mobiLett)
    const mobiTypewriter = element.querySelectorAll(mobiType)

    scrollPin(element.querySelector(mobiTime), plusTimeline(mobiLines, mobiBG, mobiAnimation, mobiTypewriter, true))

    ScrollTrigger.create({
      trigger: element.querySelector(mobiRail),
      start: 'top 500px',
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