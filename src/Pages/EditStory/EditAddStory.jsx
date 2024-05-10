import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StoryForm from "../../Components/StoryForm/StoryForm";
import "./AddStory.css";
import Slide from "../../Components/Slide/Slide";
import { Link } from "react-router-dom";
import cancel_icon from "../../Components/Assets/Vector (11).svg";
import axios from "axios";
import { useLocation } from 'react-router-dom';
const EditAddStory = () => {
  const location = useLocation();
  const { id } = location.state;
  const [totalslide, setTotalSlide] = useState(3);
  const [currentslide, setcurrentSlide] = useState(0);
  const [creation_time, setcreation_time] = useState("");
  const [story, setStory] = useState({
    Heading: "",
    Description: "",
    Image: "",
    Category: "",
  });

  const [userStory, setuserStory] = useState([]);

  const [error, setError] = useState(false);
  const [post, setposted] = useState(false);

  const storyHandler = (e) => {
    setStory((prevStory) => ({
      ...prevStory,
      [e.target.name]: e.target.value,
    }));
  };

  const decrement = () => {
    setcurrentSlide((prevcount) => prevcount - 1);
    setError(false);
  };

  const totalSlideHandler = () => {
    setTotalSlide((prevcount) => prevcount + 1);
  };

  const dectotalSlideHandler = () => {
    setTotalSlide((prevcount) => prevcount - 1);
  };

  const addStory = () => {
    if (
      story.Heading !== "" &&
      story.Category !== "" &&
      story.Image !== "" &&
      story.Description !== "" // Assuming Description is a required field
    ) {
      setuserStory((prevStory) =>
        prevStory.map((item, index) => {
          console.log(currentslide, "currentslide");
          if (index === currentslide) {
            console.log("from inde -> ", currentslide);
            return { ...item, category: story.Category, image_url: story.Image, description: story.Description, name: story.Heading };
          } else {
            return item;
          }
        })
      );

      setcurrentSlide((prevcount) => prevcount + 1);

      setStory((prevStory) => ({
        ...prevStory,
        Heading: "",
        Description: "",
        Image: "",
        Category: story.Category,
      }));

      setError(false);
    } else {
      setError(true);
    }
  };
  console.log(userStory, "user");

  const navigate = useNavigate();

  useEffect(() => {
    if (post && !error && userStory.length >= 3 && currentslide <= totalslide && currentslide == userStory.length) {
      axios
        .put(`https://webstory-backend2.onrender.com/updatestory`, userStory, {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          window.location.replace("/");
        })
        .catch((error) => {
          console.error(error);
        });
      console.log(JSON.parse(JSON.stringify(userStory)), "userStory");
    } else {
      setposted(false);
    }
  }, [post]);

  useEffect(() => {
    console.log("user-currentslide ", userStory[currentslide]);
    if (userStory[currentslide] != undefined) {
      setStory({
        Heading: userStory[currentslide].name,
        Description: userStory[currentslide].description,
        Image: userStory[currentslide].image_url,
        Category: userStory[currentslide].category,
      });
    }
  }, [currentslide, creation_time]);

  useEffect(() => {
    axios
      .get(`https://webstory-backend2.onrender.com/mystory/${id}`, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        }
      })
      .then(response => {
        setcreation_time(response.data.data.topStories[0].creation_time);
        setuserStory(response.data.data.topStories);
        console.log("test edit call cpunt");
      })
      .catch(error => {
        console.log(error, "error -->");
      });
  }, [id]);

  return (
    <>
      <div className="darkBG" />
      <div className="centered">
        <div className="formmodal">
          <Link to="/">
            {" "}
            <img className="cancelbar" src={cancel_icon}></img>
          </Link>
          {totalslide < 6 ? (
            <p className="slidecriteria">Add upto 6 slides</p>
          ) : (
            <></>
          )}
          <div className="slides">
            <Slide currentslide={currentslide} slide={1} />
            <Slide currentslide={currentslide} slide={2} />
            <Slide currentslide={currentslide} slide={3} />
            {totalslide >= 4 ? (
              <Slide
                currentslide={currentslide}
                dectotalSlideHandler={dectotalSlideHandler}
                totalslide={totalslide}
                slide={4}
                decrement={decrement}
              />
            ) : (
              <></>
            )}
            {totalslide >= 5 ? (
              <Slide
                currentslide={currentslide}
                dectotalSlideHandler={dectotalSlideHandler}
                totalslide={totalslide}
                slide={5}
                decrement={decrement}
              />
            ) : (
              <></>
            )}
            {totalslide === 6 ? (
              <Slide
                currentslide={currentslide}
                dectotalSlideHandler={dectotalSlideHandler}
                totalslide={totalslide}
                slide={6}
                decrement={decrement}
              />
            ) : (
              <></>
            )}

            {totalslide === 6 ? (
              <></>
            ) : (
              <div onClick={totalSlideHandler} className="slide">
                <h4>Add +</h4>
              </div>
            )}
          </div>

          <StoryForm
            storyprops={story}
            storyHandler={storyHandler}
            setStory={setStory}
            currentslide={currentslide}
          />
          {error ? (
            <p style={{ color: "red" }}>All fields are mandatory</p>
          ) : (
            <></>
          )}
          <div className="actionbuttons">
            <div className="pervnext">
              {currentslide !== 0 ? (
                <button
                  className="previous"
                  onClick={() => {
                    decrement();
                  }}
                >
                  Previous
                </button>
              ) : (
                <></>
              )}
              {totalslide - 1 !== currentslide ? (
                <button
                  className="next"
                  onClick={() => {
                    addStory();
                  }}
                >
                  Next
                </button>
              ) : (
                <></>
              )}
            </div>
            {/* {userStory.length>=3&&currentslide<=totalslide ? (
  
    <button onClick={() => { addStory(); Navigate("/"); console.log("hii")}} className='post'>Post</button>
 
) : ( */}
            <button
              onClick={() => {
                addStory();
                setposted(true);
              }}
              className="post"
            >
              Post
            </button>
            {/* )}   */}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAddStory;
