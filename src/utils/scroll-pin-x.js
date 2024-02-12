const scrollPinX = (element, animation, version) => {
  const el = element
  const options = { threshold: [0.01, 0.05, 1] }

  const timelineBottomReachesTopOfWindow = () => {
    const elementProperties = el.getBoundingClientRect();
    const distanceFromBottomPercentage = 100 - (((elementProperties.top + elementProperties.height) / elementProperties.height) * 100);
    if(distanceFromBottomPercentage < 0) return 0
    if(distanceFromBottomPercentage > 100) return 100
    return distanceFromBottomPercentage
  }

  const timelineBottomLeavesBottomOfWindow = () => {
    const elementProperties = el.getBoundingClientRect();
    const remainingSpace = elementProperties.height - window.innerHeight
    const percentageScrolled = (elementProperties.top / remainingSpace) * 100
    if (percentageScrolled > 0) return 0
    if (percentageScrolled < -100) return 100
    return Math.abs(percentageScrolled)
  }

  const scrubAnimation = () => {
    // animation.seek((timelineBottomReachesTopOfWindow()) * animation.duration())
    if(version === 'simple') {
      console.log(timelineBottomLeavesBottomOfWindow())
    }

    if(version === 'enhanced') {
      console.log(timelineBottomReachesTopOfWindow())
    }
  }

  const setAnimationPositionOnLoad = () => {
    scrubAnimation()
  }

  const intersectionCallback = (entry) => {
    const timelineDiv = entry[0] ? entry[0] : null

    if (!timelineDiv) {
      console.error(`Couldn't find the div element you are referring to by the name of - ${element}`)
      return
    }

    if (timelineDiv) {
      setAnimationPositionOnLoad(timelineDiv)
    }

    if (timelineDiv.isIntersecting) {
      window.addEventListener('scroll', scrubAnimation, { passive: true })
    }

    if (!timelineDiv.isIntersecting) {
      window.removeEventListener('scroll', scrubAnimation)
    }
  }

  const intersectionObserver = new IntersectionObserver(intersectionCallback, options)
  intersectionObserver.observe(element)
}

const scrollCalculator = () => {}

export { scrollPinX, scrollCalculator }