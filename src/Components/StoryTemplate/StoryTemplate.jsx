import React from 'react'
import './StoryTemplate.css'
import logo from '../Assets/Mask group (1).svg'
import storyData from "../Assets/allCategoryData"
import { useState } from 'react'
import { Link } from 'react-router-dom'

const StoryTemplate = (props) => {
  
    
    return (
       <div className='storytemplate' >
            <div className="imagWrapper">
               <Link to={`/${props.id}`} ><img src={props.image_url}></img></Link>
            </div>
            <div className="textDesc">
                <h2 className='storytemplate-details'>{props.name}</h2>
                <p className='storytemplate-details'>{props.description}</p>
            </div>
        </div>
    )
}

export default StoryTemplate
