const options = { threshold: [0.01, 0.1, 1] }

const intersectionCallback = (load, scrub, entry) => {
  const timelineDiv = entry[0] ? entry[0] : null

  if (!timelineDiv) {
    console.error(`Couldn't find the div element you are referring to by the name of - ${element}`)
    return
  }

  if (timelineDiv) {
    load()
  }

  if (timelineDiv.isIntersecting) {
    window.addEventListener('scroll', scrub, { passive: true })
  }

  if (!timelineDiv.isIntersecting) {
    window.removeEventListener('scroll', scrub)
  }
}

const scrollPin = (element, animation, version) => {
  const el = element

  const timelineBottomReachesTopOfWindow = () => {
    const elementProperties = el.getBoundingClientRect()
    const distanceFromBottomPercentage = 100 - (((elementProperties.top + elementProperties.height) / elementProperties.height) * 100)
    if(distanceFromBottomPercentage < 0) return 0
    if(distanceFromBottomPercentage > 100) return 100
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
    if(version === 'simple') {
      // animation.seek((timelineBottomReachesTopOfWindow()) * animation.duration())
      // console.log(timelineBottomLeavesBottomOfWindow())
    }

    if(version === 'enhanced') {
      // animation.seek((timelineBottomReachesTopOfWindow()) * animation.duration())
      // console.log(timelineBottomReachesTopOfWindow())
    }
  }

  const setAnimationPositionOnLoad = () => scrubAnimation()
  const intersectionObserver = new IntersectionObserver(intersectionCallback.bind(null, setAnimationPositionOnLoad, scrubAnimation), options)
  intersectionObserver.observe(element)
}

const shrinkMobileImage = (element) => {
  const el = element
  // const shrinkImageHeight = getComputedStyle(document.querySelector('.chap')).getPropertyValue('--shrunk-image-height').replace('px', '')
  // const shrinkImageDistance = `${shrinkImageHeight + 100}px`

  const calculatePixelDistance = () => {
    const elementProperties = el.getBoundingClientRect()
    const distance = Math.abs(elementProperties.top - 500)
    if (elementProperties.top <= 500 && elementProperties.top >= 400) return distance
    if (elementProperties.top <= 500) return 100
    if (elementProperties.top >= 400) return 0
    return distance
  }

  const scrubAnimation = () => {
    console.log(calculatePixelDistance())
  }

  const setAnimationPositionOnLoad = () => scrubAnimation()
  const intersectionObserver = new IntersectionObserver(intersectionCallback.bind(null, setAnimationPositionOnLoad, scrubAnimation), options)
  intersectionObserver.observe(element)
}

export { scrollPin, shrinkMobileImage }