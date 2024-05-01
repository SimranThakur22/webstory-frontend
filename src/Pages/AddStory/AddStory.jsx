import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import StoryForm from '../../Components/StoryForm/StoryForm'
import "./AddStory.css"
import Slide from '../../Components/Slide/Slide'
import { Link } from 'react-router-dom'
import cancel_icon from "../../Components/Assets/Vector (11).svg"
import axios from 'axios'

const AddStory = () => {
  const [totalslide, setTotalSlide] = useState(3);
  const [currentslide, setcurrentSlide] = useState(0);
  const [story, setStory] = useState({
    Heading: "",
    Description: "",
    Image: "",
    Category: ""

  })
  const [userStory, setuserStory] = useState([
  ]);

  const [error, setError] = useState(false);
 const[post,setposted]=useState(false);


  const storyHandler = (e) => {
    setStory(prevStory => ({ ...prevStory, [e.target.name]: e.target.value }));
   

  }


  const decrement = () => {
    setcurrentSlide(prevcount => prevcount - 1);
    setError(false);

  }

  const totalSlideHandler = () => {
    setTotalSlide(prevcount => prevcount + 1);
  }

  const dectotalSlideHandler = () => {
    setTotalSlide(prevcount => prevcount - 1);
  }

  const addStory = () => {
    if (story.Heading !== "" && story.Category !== "" && story.Image !== "" && story.Category !== "") {
      if (userStory[currentslide] !== undefined) {
        setuserStory(prevStory => (
          prevStory.map((item, index) => {
            if (index === currentslide) {
              return { ...item, story: story };
            } else {
              return item;
            }
          })
        ));
      }
      else {
        setuserStory(prevStory => ([
          ...prevStory, { story: story }
        ]))
      }
      setcurrentSlide(prevcount => prevcount + 1);

      setStory(prevStory => ({
        ...prevStory,
        Heading: "",
        Description: "",
        Image: "",
        Category: story[0]?.Category
      }));
      setError(false);
  

     }
    else {
      setError(true);
    }
    
  }
  console.log(currentslide,"currentslide");

  useEffect(()=>{
  if(post&&!error&&userStory.length>=3&&currentslide<=totalslide){
    axios.post("http://localhost:4000/userstories",userStory,{
      headers: {
        'auth-token': localStorage.getItem('auth-token')
      }
    }).then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
          window.location.replace("/");
          console.log(JSON.parse(JSON.stringify(userStory)),"userStory");      }
      else{
        setposted(false);
      }
  },[post])
  
  


  useEffect(() => {
    if (userStory[currentslide] != undefined) {
      setStory(userStory[currentslide].story)
    }
  }, [currentslide])

  
  const Navigate=useNavigate();
  return (
    <>
      <div className="darkBG" />
      <div className="centered">
        <div className="formmodal">
        <Link to='/'> <img className='cancelbar' src={cancel_icon}></img></Link>
        {totalslide<6?<p className='slidecriteria'>Add upto 6 slides</p>:<></>}
          <div className='slides'>
            <Slide currentslide={currentslide} slide={1} />
            <Slide currentslide={currentslide} slide={2} />
            <Slide currentslide={currentslide} slide={3} />
            {totalslide >= 4 ? <Slide currentslide={currentslide} dectotalSlideHandler={dectotalSlideHandler} totalslide={totalslide} slide={4} decrement={decrement} /> : <></>}
            {totalslide >= 5 ? <Slide currentslide={currentslide} dectotalSlideHandler={dectotalSlideHandler} totalslide={totalslide} slide={5} decrement={decrement} /> : <></>}
            {totalslide === 6 ? <Slide currentslide={currentslide} dectotalSlideHandler={dectotalSlideHandler} totalslide={totalslide} slide={6} decrement={decrement} /> : <></>}

            {totalslide === 6 ? <></> : <div onClick={totalSlideHandler} className='slide'>
              <h4>Add +</h4>
            </div>}

          </div>


          <StoryForm storyprops={story} storyHandler={storyHandler} setStory={setStory} currentslide={currentslide}/>
          {error ? <p style={{ color: 'red' }}>All fields are mandatory</p> : <></>}
          <div className='actionbuttons'>
            <div className='pervnext'>
              {currentslide !== 0 ? <button className='previous' onClick={() => { decrement(); }}>Previous</button> : <></>}
              {totalslide - 1 !== currentslide ? <button className='next' onClick={() => { addStory(); }}>Next</button> : <></>}
            </div>
            {/* {userStory.length>=3&&currentslide<=totalslide ? (
  
    <button onClick={() => { addStory(); Navigate("/"); console.log("hii")}} className='post'>Post</button>
 
) : ( */}
  <button onClick={() => { addStory();setposted(true); }} className='post'>Post</button>
{/* )}   */}
        </div>
        </div>
      </div>
    </>
  )
}

export default AddStory
