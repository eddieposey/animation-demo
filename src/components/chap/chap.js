import { scrollPin, scrollDistance } from '../../utils/scroll'
import './chap.scss'
import '../../styles/utils.scss'

const container = document.querySelector('[data-component="chapters"]')
const contentRailTopPadding = getComputedStyle(container).getPropertyValue('--transition-padding').replace('px', '')

const desktopEnhanced = document.querySelectorAll('.ch-desk .ch-timeline')
const desktopRail = document.querySelectorAll('.ch-desk .ch-items')
const mobileSimple = document.querySelectorAll('.ch-mobile .ch-timeline')
const mobileRail = document.querySelectorAll('.ch-mobile .ch-rail')

desktopEnhanced.forEach(el => scrollPin(el, () => {}, true))
desktopRail.forEach(el => scrollDistance(el, () => {}, contentRailTopPadding, 0))
mobileSimple.forEach(el => scrollPin(el, () => {}))
mobileRail.forEach(el => scrollDistance(el, () => {}, 600, 400))
mobileRail.forEach(el => scrollDistance(el, () => {}, 500, 400))