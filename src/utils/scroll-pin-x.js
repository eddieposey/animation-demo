const scrollPinX = (element, animation) => {
  const el = document.querySelector(element)
  const options = { threshold: [0.01, 0.1, 1] }

  const  calculateDistance = () => {
    const elementProperties = el.getBoundingClientRect();
    const distanceFromBottom = 100 - (((elementProperties.top + elementProperties.height) / elementProperties.height) * 100);
    if(distanceFromBottom < 0) return 0
    if(distanceFromBottom > 100) return 100
    return distanceFromBottom
  }

  const scrubAnimation = () => {
    // animation.seek((calculateDistance()) * animation.duration())
    console.log(calculateDistance())
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
  intersectionObserver.observe(document.querySelector(element))
}

const scrollCalculator = () => {}

export { scrollPinX, scrollCalculator }