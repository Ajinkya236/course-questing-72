
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const handleChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Initial check
    handleChange()
    
    // Add event listener - modern approach
    if (mql.addEventListener) {
      mql.addEventListener("change", handleChange)
      window.addEventListener("resize", handleChange)
      return () => {
        mql.removeEventListener("change", handleChange)
        window.removeEventListener("resize", handleChange)
      }
    } else {
      // Fallback for older browsers
      mql.addListener(handleChange)
      window.addEventListener("resize", handleChange)
      return () => {
        mql.removeListener(handleChange)
        window.removeEventListener("resize", handleChange)
      }
    }
  }, [])

  return isMobile === undefined ? false : isMobile
}

// Add the useMediaQuery alias for useIsMobile
export const useMediaQuery = useIsMobile;
