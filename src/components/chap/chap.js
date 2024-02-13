import { scrollPin, scrollDistance } from '../../utils/scroll'
import './chap.scss'
import '../../styles/utils.scss'

const listPaddingDesktop = getComputedStyle(document.querySelector('.chap')).getPropertyValue('--transition-padding').replace('px', '');

console.log(listPaddingDesktop)

// desktop simple
// todo

// desktop enhanced
document.querySelectorAll('.desktop .container-timeline').forEach(el => scrollPin(el, () => {}, true))

// desktop fade in content rail
document.querySelectorAll('.desktop .list').forEach(el => scrollDistance(el, () => {}, listPaddingDesktop, 0))

// mobile simple
document.querySelectorAll('.mobile .container-timeline').forEach(el => scrollPin(el, () => {}))

// mobile shrink image
document.querySelectorAll('.mobile .list').forEach(el => scrollDistance(el, () => {}, 600, 400))

// mobile fade in content rail
document.querySelectorAll('.mobile .list').forEach(el => scrollDistance(el, () => {}, 500, 400))