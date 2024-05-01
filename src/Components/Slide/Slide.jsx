import React from 'react'
import "./Slide.css"
import cancel_icon from "../../Components/Assets/Vector (11).svg"

const Slide = (props) => {
  return (
    <>
<div className="slide" style={{ border: props.currentslide+1 === props.slide ? '1px solid #73abff' : 'none' }}>
 
  
      <h4>Slide {props.slide}</h4>
     {props.totalslide>3? <img className='cancelslide' onClick={() => { props.dectotalSlideHandler();props.decrement(); }} src={cancel_icon}></img>:<></>}
    </div>
    </>
  )
}

export default Slide
