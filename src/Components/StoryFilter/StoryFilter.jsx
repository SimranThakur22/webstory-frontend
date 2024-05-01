import React from 'react'
import './StoryFilter.css'
import logo1 from '../Assets/Mask group.svg'
import logo2 from '../Assets/Mask group (1).svg'
import logo3 from '../Assets/Mask group (2).svg'
import { Link } from 'react-router-dom'


const StoryFilter = (props) => {
  return (
    <>
    {props.bookmark?<></>:
    <div className='storyfilter'>
      <Link to='/'><div onClick={()=>{
        props.setCurrentCategory("all");
      }} className='filter'>
        <img src={logo1}></img>
        <div>All</div>
      </div></Link>
      <div onClick={()=>{
        props.setCurrentCategory("health");
      }} className='filter'>
        <img src={logo2}></img>
        <div>Health and Fitness</div>
      </div>
    <div onClick={()=>{
        props.setCurrentCategory("food");
      }} className='filter'>
        <img src={logo3}></img>
        <div>Food</div>
      </div>
   <div onClick={()=>{
        props.setCurrentCategory("travel");
      }} className='filter'>
        <img src='https://media.istockphoto.com/id/904172104/photo/weve-made-it-all-this-way-i-am-proud.jpg?s=612x612&w=0&k=20&c=MewnsAhbeGRcMBN9_ZKhThmqPK6c8nCT8XYk5ZM_hdg='></img>
        <div>Travel</div>
        </div>
         <div onClick={()=>{
        props.setCurrentCategory("education");
      }} className='filter'>
        <img src='https://burst.shopifycdn.com/photos/person-holds-a-book-over-a-stack-and-turns-the-page.jpg?width=1000&format=pjpg&exif=0&iptc=0'></img>
        <div>Education</div>
      </div>
      <div onClick={()=>{
        props.setCurrentCategory("movie");
      }} className='filter'>
        <img src='https://st2.depositphotos.com/1105977/9877/i/450/depositphotos_98775856-stock-photo-retro-film-production-accessories-still.jpg'></img>
        <div>Movie</div>
      </div>
    </div>}
    </>
  )
}

export default StoryFilter
