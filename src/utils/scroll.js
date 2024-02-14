const options = { threshold: [0.01, 0.1, 1] }

const ratioError = () => {
  console.error(`The start distance and end distance are each the Y position of the element ('.${el.className}') in relation to the top of the window. The start position must be greater than the end position.`)
}

const timelineError = () => {
  console.error(`Couldn't find the div element you are referring to by the name of - ${element}`)
}

const intersectionCallback = (animationPositionOnLoad, scrubAnimation, observedElements) => {
  const timelineDiv = observedElements[0] ? observedElements[0] : null
  if (!timelineDiv) { timelineError(); return }
  if (timelineDiv) { animationPositionOnLoad() }
  if (timelineDiv.isIntersecting) { window.addEventListener('scroll', scrubAnimation, { passive: true }) }
  if (!timelineDiv.isIntersecting) { window.removeEventListener('scroll', scrubAnimation) }
}

const scrollPin = (element, animation, enhanced) => {
  const el = element

  const timelineBottomReachesTopOfWindow = () => {
    const elementProperties = el.getBoundingClientRect()
    const distanceFromBottomPercentage = 100 - (((elementProperties.top + elementProperties.height) / elementProperties.height) * 100)
    if (distanceFromBottomPercentage < 0) return 0
    if (distanceFromBottomPercentage > 100) return 100
    return distanceFromBottomPercentage
  }

  const timelineBottomLeavesBottomOfWindow = () => {
    const elementProperties = el.getBoundingClientRect()
    const remainingSpace = elementProperties.height - window.innerHeight
    const percentageScrolled = (elementProperties.top / remainingSpace) * 100
    if (percentageScrolled > 0) return 0
    if (percentageScrolled < -100) return 100
    return Math.abs(percentageScrolled)
  }

  const scrubAnimation = () => {
    if (enhanced) { console.log(timelineBottomLeavesBottomOfWindow()) }
    if (!enhanced) { console.log(timelineBottomReachesTopOfWindow()) }
  }

  const setAnimationPositionOnLoad = () => scrubAnimation()
  const intersectionObserver = new IntersectionObserver(intersectionCallback.bind(null, setAnimationPositionOnLoad, scrubAnimation), options)
  intersectionObserver.observe(element)
}

const scrollDistance = (element, animation, startDistance, endDistance) => {
  const el = element
  const ratio = startDistance > endDistance ? (startDistance - endDistance) / 100 : null

  if (!ratio) { ratioError(); return }

  const calculatePixelDistance = () => {
    const elementProperties = el.getBoundingClientRect()
    const distance = Math.abs(elementProperties.top - startDistance) / ratio
    if (elementProperties.top <= startDistance && elementProperties.top >= endDistance) return distance
    if (elementProperties.top <= startDistance) return 100
    if (elementProperties.top >= endDistance) return 0
    return distance
  }

  const scrubAnimation = () => calculatePixelDistance()
  const setAnimationPositionOnLoad = () => scrubAnimation()
  const intersectionObserver = new IntersectionObserver(intersectionCallback.bind(null, setAnimationPositionOnLoad, scrubAnimation), options)
  intersectionObserver.observe(element)
}

export { scrollPin, scrollDistance }