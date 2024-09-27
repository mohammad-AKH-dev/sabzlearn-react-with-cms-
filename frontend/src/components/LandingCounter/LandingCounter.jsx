import { useState,useEffect } from 'react'
import './LandingCounter.css'

export default function LandingCounter({max}) {
    const [courseCounter,setCourseCounter] = useState(0)
  
    useEffect(() => {
      let interVal = setInterval(() => {
        setCourseCounter(prevCount => prevCount + 1)
      },10)
  
      if(courseCounter === max){
        clearInterval(interVal)
      }
  
  
      return () => clearInterval(interVal)
    },[courseCounter])
    
  return <span className="landing-status__count">{courseCounter.toLocaleString()}</span>
}
