import { useEffect, useState } from 'react'

const DEVICE = {
  MOBILE: 1,
  TABLET: 2,
  LAPTOP: 3,
  DESKTOP: 4
}

export default function useWindowSize() {
  function getSize() {
    if (typeof window !== 'undefined') {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }

    return {
      width: 0,
      height: 0
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (windowSize.width >= 375 && windowSize.width < 768) {
    return DEVICE.MOBILE
  } else if (windowSize.width >= 768 && windowSize.width < 1024) {
    return DEVICE.TABLET
  } else if (windowSize.width >= 1024 && windowSize.width < 1280) {
    return DEVICE.LAPTOP
  } else {
    return DEVICE.DESKTOP
  }
}
