import { scrollPinX } from '../../utils/scroll-pin-x'
import './chap.scss'
import '../../styles/utils.scss'

document.querySelectorAll('.desktop .container-timeline').forEach(el => scrollPinX(el, () => {}, 'enhanced'))
document.querySelectorAll('.mobile .container-timeline').forEach(el => scrollPinX(el, () => {}, 'simple'))