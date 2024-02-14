import { scrollPin, scrollDistance } from '../../utils/scroll'
import './chap.scss'
import '../../styles/utils.scss'

const time = '.ch-timeline'
const deskTime = '.ch-desktop .ch-timeline'
const deskRail = '.ch-desktop .ch-rail'
const mobiTime = '.ch-mobile .ch-timeline'
const mobiRail = '.ch-mobile .ch-rail'
const container = document.querySelector('[data-component="chapters"]')
const contentRailTopPadding = getComputedStyle(container).getPropertyValue('--transition-padding').replace('px', '')

const simpleInit = () => {
  const simpleScrollHandlersInitiated = window['simpleChapters']
  const simpleChapters = document.querySelectorAll('[data-type="simple"]')

  if(simpleChapters.length === 0) return
  if(simpleScrollHandlersInitiated) return

  simpleChapters.forEach((element) => scrollPin(element.querySelectorAll(time), () => {}, true))

  window['simpleChapters'] = true
}

const enhancedInit = () => {
  const enhancedScrollHandlersInitiated = window['enhancedChapters']
  const enhancedChapers = document.querySelectorAll('[data-type="enhanced"]')

  if(enhancedChapers.length === 0) return
  if(enhancedScrollHandlersInitiated) return

  enhancedChapers.forEach((element) => {
    scrollPin(element.querySelector(deskTime), () => {}, true)
    scrollDistance(element.querySelector(deskRail), () => {}, contentRailTopPadding, 0)
    scrollPin(element.querySelector(mobiTime), () => {})
    scrollDistance(element.querySelector(mobiRail), () => {}, 600, 400)
    scrollDistance(element.querySelector(mobiRail), () => {}, 500, 400)
  })

  window['enhancedChapters'] = true
}

const plusInit = () => {
  const plusScrollHandlersInitiated = window['plusChapers']
  const plusChapters = document.querySelectorAll('[data-type="plus"]')

  if(plusChapters.length === 0) return
  if(plusScrollHandlersInitiated) return

  plusChapters.forEach((element) => {
    scrollPin(element.querySelector(deskTime), () => {}, true)
    scrollDistance(element.querySelector(deskRail), () => {}, contentRailTopPadding, 0)
    scrollPin(element.querySelector(mobiTime), () => {})
    scrollDistance(element.querySelector(mobiRail), () => {}, 600, 400)
    scrollDistance(element.querySelector(mobiRail), () => {}, 500, 400)
  })

  window['plusChapers'] = true
}

simpleInit()
enhancedInit()
plusInit()