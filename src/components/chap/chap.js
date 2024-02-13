import { scrollPin, scrollDistance } from '../../utils/scroll'
import './chap.scss'
import '../../styles/utils.scss'

// desktop simple
// todo

// desktop enhanced
document.querySelectorAll('.desktop .container-timeline').forEach(el => scrollPin(el, () => {}, 'enhanced'))

// desktop fade in content rail
document.querySelectorAll('.desktop .list').forEach(el => scrollDistance(el, () => {}, -50, 0))

// mobile simple
document.querySelectorAll('.mobile .container-timeline').forEach(el => scrollPin(el, () => {}, 'simple'))

// mobile shrink image
document.querySelectorAll('.mobile .list').forEach(el => scrollDistance(el, () => {}, 600, 400))

// mobile fade in content rail
document.querySelectorAll('.mobile .list').forEach(el => scrollDistance(el, () => {}, 500, 400))