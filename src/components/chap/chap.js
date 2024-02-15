import { scrollPin, scrollDistance } from '../../utils/scroll'
import './chap.scss'
import '../../styles/utils.scss'
import { scaleBG, railFade, shrinkBG } from './animations'

const time = '.ch-timeline'
const deskTime = '.ch-desktop .ch-timeline'
const deskRail = '.ch-desktop .ch-rail'
const deskAnim = '.ch-desktop .ch-anim'
const mobiTime = '.ch-mobile .ch-timeline'
const mobiRail = '.ch-mobile .ch-rail'
const mobiAnim = '.ch-mobile .ch-anim'

const simpleInit = () => {
  const simpleScrollHandlersInitiated = window['simpleChapters']
  const simpleChapters = document.querySelectorAll('[data-type="simple"]')

  if (simpleChapters.length === 0) return
  if (simpleScrollHandlersInitiated) return

  simpleChapters.forEach((element) => scrollPin(element.querySelectorAll(time), () => {}, true))

  window['simpleChapters'] = true
}

const enhancedInit = () => {
  const enhancedScrollHandlersInitiated = window['enhancedChapters']
  const enhancedChapters = document.querySelectorAll('[data-type="enhanced"]')

  if (enhancedChapters.length === 0) return
  if (enhancedScrollHandlersInitiated) return

  enhancedChapters.forEach((element) => {
    scrollPin(element.querySelector(deskTime), scaleBG(element.querySelector(deskAnim)), true)
    scrollDistance(element.querySelector(deskRail), railFade(element.querySelector(deskRail)), 800, 0)
    scrollPin(element.querySelector(mobiTime), () => {}) // typewriter
    scrollDistance(element.querySelector(mobiRail), shrinkBG(element.querySelector(mobiAnim)), 600, 300) // shrink image
    scrollDistance(element.querySelector(mobiRail), railFade(element.querySelector(mobiRail)), 700, 0)
  })

  window['enhancedChapters'] = true
}

const plusInit = () => {
  const plusScrollHandlersInitiated = window['plusChapers']
  const plusChapters = document.querySelectorAll('[data-type="plus"]')

  if (plusChapters.length === 0) return
  if (plusScrollHandlersInitiated) return

  plusChapters.forEach((element) => {
    scrollPin(element.querySelector(deskTime), () => {}, true)
    scrollDistance(element.querySelector(deskRail), railFade(element.querySelector(deskRail)), 800, 0)
    scrollPin(element.querySelector(mobiTime), () => {})
    scrollDistance(element.querySelector(mobiRail), () => {}, 600, 400)
    scrollDistance(element.querySelector(mobiRail), () => {}, 500, 400)
  })

  window['plusChapers'] = true
}

simpleInit()
enhancedInit()
plusInit()