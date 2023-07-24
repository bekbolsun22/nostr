import { useEffect, useRef } from 'react'

export default function useMountedEffect(cb, deps) {
   const componentJustMounted = useRef(true)
   useEffect(() => {
      if (!componentJustMounted.current) {
         return cb()
      }
      componentJustMounted.current = false
      return undefined
   }, deps)
}
