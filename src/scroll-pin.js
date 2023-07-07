/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

/**
 * It takes a sticky element and an animation, and then it animates the animation based on the
 * percentage of the sticky element that is visible on the screen
 * @param {string} stickyElement - The id of the element that will be pinned to the top of the screen.
 * @param animation - The animation you want to scrub.
 */
const scrollPin = (stickyElement, animation) => {
  let currentStickyElement = null
  let currentStickyElementContainer = null
  const options = { threshold: [0.01, 0.1, 1] }

  /**
   * It returns the percentage of the sticky element that is visible on the screen
   * @returns The percentage of the sticky element that is visible on the screen.
   */
  const getScrollPercentage = () => {
    const stickyElementProperties =
      currentStickyElementContainer.getBoundingClientRect()
    const stickyElementHeight = currentStickyElementContainer.clientHeight
    const remainingSpace = stickyElementHeight - window.innerHeight
    const percentageScrolled =
      (stickyElementProperties.top / remainingSpace) * 100

    if (percentageScrolled > 0) {
      return 0
    }

    if (percentageScrolled < -100) {
      return 100
    }

    return Math.abs(percentageScrolled)
  }

  const scrubAnimation = () => {
    animation.seek((getScrollPercentage() / 100) * animation.duration())
  }

  const setAnimationPositionOnLoad = () => {
    scrubAnimation()
  }

  const intersectionObserver = new IntersectionObserver((entry) => {
    currentStickyElement = entry[0].target.id ? entry[0].target.id : null
    const stickyParentContainer = document.querySelector(
      `#${currentStickyElement}-container`
    )
    currentStickyElementContainer = stickyParentContainer
      ? stickyParentContainer
      : null

    if (!entry) {
      return
    }

    if (!currentStickyElement) {
      console.error('The sticky element must have an id')
      return
    }

    if (!currentStickyElementContainer) {
      console.error(
        `The parent container of the sticky element must have an id of '#${entry[0].target.id}-container'`
      )
      return
    }

    if (currentStickyElement) {
      setAnimationPositionOnLoad()
    }

    if (entry[0].isIntersecting) {
      window.addEventListener('scroll', scrubAnimation, { passive: true })
    }

    if (!entry[0].isIntersecting) {
      window.removeEventListener('scroll', scrubAnimation)
    }
  }, options)

  intersectionObserver.observe(document.querySelector(`#${stickyElement}`))
}

export { scrollPin }
