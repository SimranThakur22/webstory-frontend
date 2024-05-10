import React, { useContext, useEffect, useState, useRef } from "react";
// import React, { useState, useEffect, useRef } from 'react'
import "./StoryView.css";
import demo_img from "../../Components/Assets/Mask group (3).svg";
import { StoryContext } from "../../Context/StoryContext";
import { FaBookmark, FaSortNumericDown } from "react-icons/fa";
import cross from "../../Components/Assets/cross.svg";
import bookmark from "../../Components/Assets/bookmark.svg";
import send from "../../Components/Assets/send.svg";
import like from "../../Components/Assets/like.svg";
import { MdClose } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StoryView = (props) => {
  const { randomStory } = useContext(StoryContext);
  const { storydata } = useContext(StoryContext);
  const { showRandomStory } = useContext(StoryContext);
  const { setbookmarkitem } = useContext(StoryContext);
  const { setlikestoryitem } = useContext(StoryContext);
  const { bookmarkitem } = useContext(StoryContext);
  const { addbookmark } = useContext(StoryContext);
  const { removebookmark } = useContext(StoryContext);
  const { likestoryitem } = useContext(StoryContext);
  const { addlikedstory } = useContext(StoryContext);
  const { removelikedstory } = useContext(StoryContext);
  const { id } = useParams();

  //   const images=[
  // "https://www.recipetineats.com/wp-content/uploads/2023/09/Crispy-fried-chicken-burgers_5.jpg",
  //     "https://www.restaurantconfusion.com/wp-content/uploads/2021/01/french-cuisine-840x473.jpg",
  //     "https://onepotrecipes.com/wp-content/uploads/2021/08/Easy-Green-Salad.jpg"
  //   ]

  const [toast, settoast] = useState(false);
  const [images, setImages] = useState([]);
  const [allstory, setAllStory] = useState([]);
  const [insidestory, setInsideStory] = useState([]);
  const [bookmarkindex, setbookmarkindex] = useState(0);
  const [likecount, setlikecount] = useState([]);

  useEffect(() => {
    (async () => {
      await axios
        .get("https://webstory-backend2.onrender.com/getbookmarkData", {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        })
        .then((res) => {
          setbookmarkitem(res.data.data.bookmarkdata);
        })
        .catch((error) => {
          console.error(error);
        });

      await axios
        .get("https://webstory-backend2.onrender.com/getlikestoryData", {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        })
        .then((res) => {
          setlikestoryitem(res.data.data.likedstoryData);
        })
        .catch((error) => {
          console.error(error);
        });
    })();
  }, [bookmarkindex, likecount]);

  useEffect(() => {
    // Clean up the timeout if the component unmounts before 3 seconds
    let timeout;
    if (toast) {
      timeout = setTimeout(() => {
        settoast(false);
      }, 700);
    }

    return () => clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allStoriesResponse = await axios.get(
          "https://webstory-backend2.onrender.com/allstories"
        );
        setAllStory(allStoriesResponse.data.data.stories);

        // console.log(allStoriesResponse.data.data.stories);
        console.log(allstory);

        const story = allStoriesResponse.data.data.stories.find(
          (item) => item.id === Number(id)
        );
        console.log(story.category, story.creation_time);

        const insideStoryResponse = await axios.get(
          `https://webstory-backend2.onrender.com/getsamecategorystory?category=${story.category}&creation_time=${story.creation_time}`
        );
        setInsideStory(insideStoryResponse.data.data.story);
        insideStoryResponse.data.data.story.map((item, index) => {
          setImages((prevImages) => [...prevImages, item.image_url]);
          setlikecount((prev) => [...prev, item.likecount]);

          if (item.id === Number(id)) {
            setbookmarkindex(index);
          }
        });
        console.log(allstory);
        console.log(bookmarkindex);
        console.log(insideStoryResponse.data.data.story);
        console.log(images, "image");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  console.log(insidestory);
  console.log(images, "image");

  /* define base variable */
  const nextMsec = props.nextMsec || 5000;
  const barHeight = props.barHeight || 1.5;
  const backgroundSize = props.backgroundSize || "cover";
  const backgroundColor = props.backgroundColor || "#202322";

  const [position, setPosition] = useState(0);
  const [isTransition, setIsTransition] = useState(true);
  const [isReset, setIsReset] = useState(true);
  const timeout = useRef([]);

  useEffect(() => {
    console.log({
      position,
    });
  }, [position]);

  /* common functions */
  const navigate = useNavigate();
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  function noneTransition(callback) {
    return new Promise(async (resolve) => {
      setIsTransition(false);
      await sleep(20);
      callback();
      await sleep(20);
      setIsTransition(true);
      await sleep(20);
      resolve();
    });
  }
  async function startCarousel(p) {
    if (timeout.current.length > 0) {
      timeout.current.forEach((n) => clearTimeout(n));
      timeout.current = [];
    }

    setIsReset(false);
    setPosition(p);

    timeout.current.push(
      setTimeout(async () => {
        if (p === images.length - 1) {
          await sleep(2000);
          await noneTransition(() => setIsReset(true));
          startCarousel(0);
        } else {
          startCarousel(p + 1);
        }
      }, nextMsec)
    );
  }
  async function skip(w) {
    let afterPosition = position + 1;
    const beforePosition = position - 1;
    const isLast = position === images.length - 1;
    const isFirst = position === 0;
    if (w === "next") {
      afterPosition = isLast ? 0 : afterPosition;
    }

    if (w === "before") {
      afterPosition = isFirst ? 0 : beforePosition;
    }

    await noneTransition(async () => {
      setIsReset(true);
      await sleep(20);
      startCarousel(afterPosition);
    });
  }

  useEffect(() => {
    (async () => {
      await noneTransition(() => setIsReset(true));
      startCarousel(0);
    })();
  }, images);

  const coordX = useRef(0);
  function ontouchstart(e) {
    const touches = e.changedTouches[0];
    coordX.current = touches.pageX;
  }
  function ontouchend(e) {
    const touches = e.changedTouches[0];
    const diff = touches.pageX - coordX.current;
    if (Math.abs(diff) > 100) {
      skip(Math.sign(diff) > -1 ? "before" : "next");
    }
  }

  if (images.length < 2) return null;

  return (
    <>
      {/* <div className="darkBG" /> */}
      <div className="centered-back">
        <div
          className="reactInstagramCarousel"
          onTouchStart={ontouchstart}
          onTouchEnd={ontouchend}
        >
          {insidestory.map((src, index) => (
            <div
              className="reactInstagramCarousel__image"
              style={{
                backgroundImage: `url(${src.image_url})`,
                backgroundSize,
                backgroundColor,
                opacity: isReset
                  ? index === 0
                    ? 1
                    : 0
                  : index === position
                    ? 1
                    : 0,
              }}
              key={`${src}-${index}`}
            >
              <h1>{src.name}</h1>
              <p>{src.description}</p>
              <div className="actions">
                <FaBookmark
                  size={30}
                  style={
                    bookmarkitem[src.id] === 1
                      ? { color: "blue", zIndex: 1000, cursor: "pointer" }
                      : { color: "white", zIndex: 1000, cursor: "pointer" }
                  }
                  onClick={() => {
                    console.log(src.id);
                    console.log(bookmarkitem[src.id]);
                    if (localStorage.getItem("auth-token")) {
                      if (bookmarkitem[src.id] === 0) {
                        addbookmark(src.id);
                        console.log(
                          "Bookmarkitem with ID " + src.id + " is  set to 1"
                        );
                      } else {
                        removebookmark(src.id);
                        console.log(
                          "Bookmarkitem with ID " + src.id + " is  set to 0"
                        );
                      }
                    } else {
                      window.location.replace("/login");
                    }
                  }}
                />

                <FaHeart
                  size={30}
                  style={
                    likestoryitem[src.id] === 1
                      ? { color: "red", zIndex: 1000, cursor: "pointer" }
                      : { color: "white", zIndex: 1000, cursor: "pointer" }
                  }
                  onClick={() => {
                    console.log(src.id);
                    console.log(likestoryitem[src.id]);
                    if (localStorage.getItem("auth-token")) {
                      if (likestoryitem[src.id] === 0) {
                        const updatecount = [...likecount];
                        updatecount[index] += 1;
                        setlikecount(updatecount);
                        addlikedstory(src.id);
                        console.log(
                          "likestoryitem with ID " + src.id + " is  set to 1"
                        );
                      } else {
                        removelikedstory(src.id);
                        const updatecount = [...likecount];
                        updatecount[index] -= 1;
                        setlikecount(updatecount);
                        console.log(
                          "likestoryitem with ID " + src.id + " is  set to 0"
                        );
                      }
                    } else {
                      window.location.replace("/login");
                    }
                  }}
                />
              </div>
              <div className="likecount">{likecount[index]}</div>
              {toast ? (
                <div className="toast">Link copied to clipboard!!</div>
              ) : (
                <></>
              )}
              <div className="actions-2">
                <MdClose
                  size={28}
                  onClick={() => {
                    navigate("/");
                  }}
                  style={{ color: "white", zIndex: "10000", cursor: "pointer" }}
                  src={cross}
                />
                <img
                  onClick={() => settoast(true)}
                  style={{ color: "white", zIndex: "9000", cursor: "pointer" }}
                  src={send}
                ></img>
              </div>
            </div>
          ))}

          <div
            className="reactInstagramCarousel__skip--left"
            onClick={() => skip("before")}
          />
          <div
            className="reactInstagramCarousel__skip--right"
            onClick={() => skip("next")}
          />

          <div className="reactInstagramCarousel__progressBarSpace">
            {images.map((_, k) => (
              <div
                className="reactInstagramCarousel__progressBar"
                style={{
                  width: `calc(100% / ${images.length} - 6%)`,
                  height: `${barHeight}px`,
                }}
                key={k}
              >
                <div
                  className="reactInstagramCarousel__progressBar--load"
                  style={{
                    width: isReset ? "0" : k <= position ? "100%" : "0",
                    transition: isTransition
                      ? k === position
                        ? `${nextMsec}ms linear`
                        : "0s"
                      : "0s",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryView;
