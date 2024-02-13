import { scrollPin, shrinkMobileImage } from '../../utils/scroll'
import './chap.scss'
import '../../styles/utils.scss'

document.querySelectorAll('.desktop .container-timeline').forEach(el => scrollPin(el, () => {}, 'enhanced'))
document.querySelectorAll('.mobile .container-timeline').forEach(el => scrollPin(el, () => {}, 'simple'))
document.querySelectorAll('.mobile .list').forEach(el => shrinkMobileImage(el, () => {}))