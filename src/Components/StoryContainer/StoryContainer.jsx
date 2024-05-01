import React, { useContext, useEffect, useState } from "react";
import "./StoryContainer.css";
import storyData from "../Assets/allCategoryData";
import StoryTemplate from "../StoryTemplate/StoryTemplate";
import axios from "axios";
import { StoryContext } from "../../Context/StoryContext";
const StoryContainer = (props) => {
  const [loadmore, setLoadmore] = useState({
    movie: false,
    health: false,
    education: false,
    travel: false,
    mystory: false,
    food: false,
    user: false,
  });

  const { setbookmarkitem } = useContext(StoryContext);
  const { setlikestoryitem } = useContext(StoryContext);
  const { bookmarkitem } = useContext(StoryContext);

  //     const {fooddata}=useContext(StoryContext);

  //     const {moviedata}=useContext(StoryContext);

  //     const {educationdata}=useContext(StoryContext);
  //     const {traveldata}=useContext(StoryContext);
  //     const {health}=useContext(StoryContext);
  //     const {storygeneratehandler}=useContext(StoryContext);

  // useEffect(()=>{
  //     storygeneratehandler()
  // },[]);
  const [allstory, setallstory] = useState([]);
  const [fooddata, setfooddata] = useState([]);
  const [moviedata, setmoviedata] = useState([]);
  const [educationdata, seteducation] = useState([]);
  const [traveldata, settraveldata] = useState([]);
  const [health, sethealthdata] = useState([]);
  const [userdata, setUserData] = useState([]);

  //  const datahandler=async()=>{
  //     try{
  //        await axios.get('https://webstory-backend2.onrender.com/top5stories?category=movie').then((res)=>{ setmoviedata(res.data.data.topstory_ids);})
  //        await axios.get('https://webstory-backend2.onrender.com/top5stories?category=food').then((res)=>{setfooddata(res.data.data.topstory_ids)});
  //        await axios.get('https://webstory-backend2.onrender.com/top5stories?category=education').then((res)=>{seteducation(res.data.data.topstory_ids)});
  //        await axios.get('https://webstory-backend2.onrender.com/top5stories?category=health and fitness').then((res)=>{sethealthdata(res.data.data.topstory_ids)});
  //        await axios.get('https://webstory-backend2.onrender.com/top5stories?category=travel').then((res)=>{settraveldata(res.data.data.topstory_ids)});
  //     console.log(health);

  //      }catch(e){
  //     console.log(e);
  //      }
  //  }
  useEffect(() => {
    try {
      axios
        .get(
          "https://webstory-backend2.onrender.com/top5stories?category=movie"
        )
        .then((res) => {
          setmoviedata(res.data.data.topstory_ids);
        });
      axios
        .get("https://webstory-backend2.onrender.com/top5stories?category=food")
        .then((res) => {
          setfooddata(res.data.data.topstory_ids);
        });
      axios
        .get(
          "https://webstory-backend2.onrender.com/top5stories?category=education"
        )
        .then((res) => {
          seteducation(res.data.data.topstory_ids);
        });
      axios
        .get(
          "https://webstory-backend2.onrender.com/top5stories?category=health and fitness"
        )
        .then((res) => {
          sethealthdata(res.data.data.topstory_ids);
        });
      axios
        .get(
          "https://webstory-backend2.onrender.com/top5stories?category=travel"
        )
        .then((res) => {
          settraveldata(res.data.data.topstory_ids);
        });
      axios
        .get("https://webstory-backend2.onrender.com/allstories")
        .then((res) => {
          setallstory(res.data.data.stories);
        });
      axios
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
      console.log(health);
    } catch (e) {
      console.log(e);
    }
  }, [props.bookmark]);

  useEffect(() => {
    //    console.log( localStorage.getItem('auth-token'),"token-log");
    if (localStorage.getItem("auth-token")) {
      axios
        .get("https://webstory-backend2.onrender.com/mystory", {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        })
        .then((response) => {
          console.log(response.data.data.topstory_ids);
          setUserData(response.data.data.topstory_ids);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [localStorage.getItem("auth-token")]);

  return (
    <>
      {props.bookmark ? (
        <>
          <div className="storyContainer">
            <h1>Your Bookmarks</h1>
            <div className="storyContainer-story">
              {allstory.map((item, i) => {
                if (bookmarkitem[item.id] === 1) {
                  console.log(item.id, bookmarkitem[item.id], "success");
                  return (
                    <StoryTemplate
                      bookmark={props.bookmark}
                      key={i}
                      id={item?.id}
                      name={item?.name}
                      category={item?.category}
                      description={item?.description}
                      image_url={item?.image_url}
                    />
                  );
                }
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="storyContainer">
            {props.userloggedin && props.category === "all" ? (
              <>
                <h1>Your Stories</h1>
                <div className="storyContainer-story">
                  {userdata.length > 0 ? (
                    <>
                      {loadmore.user
                        ? userdata.map((item, i) => (
                            <StoryTemplate
                              key={i}
                              id={item?.id}
                              name={item?.name}
                              category={item?.category}
                              description={item.description}
                              image_url={item?.image_url}
                            />
                          ))
                        : userdata
                            // .filter(item => item.category === 'food')
                            .slice(0, 4)
                            .map((item, i) => (
                              <StoryTemplate
                                key={i}
                                id={item.id}
                                name={item.name}
                                category={item.category}
                                description={item.description}
                                image_url={item?.image_url}
                              />
                            ))}
                    </>
                  ) : (
                    <>
                      <div className="nostorytext">
                        <p>No Stories Available</p>
                      </div>
                    </>
                  )}
                </div>
                {!loadmore.user && userdata.length > 4 ? (
                  <button
                    onClick={() => {
                      setLoadmore((prevState) => ({
                        ...prevState,
                        food: true,
                      }));
                    }}
                  >
                    {" "}
                    See More
                  </button>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            {props.category === "all" || props.category === "food" ? (
              <>
                <h1>Top Stories About food</h1>
                <div className="storyContainer-story">
                  {loadmore.food
                    ? fooddata.map((item, i) => (
                        <StoryTemplate
                          key={i}
                          id={item?.id}
                          name={item?.name}
                          category={item?.category}
                          description={item.description}
                          image_url={item?.image_url}
                        />
                      ))
                    : fooddata
                        .filter((item) => item.category === "food")
                        .slice(0, 4)
                        .map((item, i) => (
                          <StoryTemplate
                            key={i}
                            id={item.id}
                            name={item.name}
                            category={item.category}
                            description={item.description}
                            image_url={item?.image_url}
                          />
                        ))}
                </div>
                {!loadmore.food && fooddata.length > 4 ? (
                  <button
                    onClick={() => {
                      setLoadmore((prevState) => ({
                        ...prevState,
                        food: true,
                      }));
                    }}
                  >
                    {" "}
                    See More
                  </button>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            {props.category === "all" || props.category === "health" ? (
              <>
                <h1>Top Stories about Health and Fitness</h1>
                <div className="storyContainer-story">
                  {loadmore.health
                    ? health.map((item, i) => {
                        return (
                          <StoryTemplate
                            key={i}
                            id={item.id}
                            name={item.name}
                            category={item.category}
                            description={item.description}
                            image_url={item?.image_url}
                          />
                        );
                      })
                    : health
                        .filter(
                          (item) => item.category === "health and fitness"
                        )
                        .slice(0, 4)
                        .map((item, i) => (
                          <StoryTemplate
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            category={item.category}
                            description={item.description}
                            image_url={item?.image_url}
                          />
                        ))}
                </div>

                {!loadmore.health && health.length > 4 ? (
                  <button
                    onClick={() => {
                      setLoadmore((prevState) => ({
                        ...prevState,
                        health: true,
                      }));
                    }}
                  >
                    {" "}
                    See More
                  </button>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            {props.category === "all" || props.category === "travel" ? (
              <>
                <h1>Top Stories about Travel</h1>
                <div className="storyContainer-story">
                  {loadmore.travel
                    ? traveldata.map((item, i) => {
                        return (
                          <StoryTemplate
                            key={i}
                            id={item.id}
                            name={item.name}
                            category={item.category}
                            description={item.description}
                            image_url={item?.image_url}
                          />
                        );
                      })
                    : traveldata
                        .filter((item) => item.category === "travel")
                        .slice(0, 4)
                        .map((item, i) => (
                          <StoryTemplate
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            category={item.category}
                            description={item.description}
                            image_url={item?.image_url}
                          />
                        ))}
                </div>
                {!loadmore.travel && traveldata.length > 4 ? (
                  <button
                    onClick={() => {
                      setLoadmore((prevState) => ({
                        ...prevState,
                        travel: true,
                      }));
                    }}
                  >
                    {" "}
                    See More
                  </button>
                ) : (
                  <></>
                )}{" "}
              </>
            ) : (
              <></>
            )}

            {props.category === "all" || props.category === "movie" ? (
              <>
                <h1>Top Stories about Movie</h1>
                <div className="storyContainer-story">
                  {loadmore.movie
                    ? moviedata.map((item, i) => {
                        return (
                          <StoryTemplate
                            key={i}
                            id={item.id}
                            name={item.name}
                            category={item.category}
                            description={item.description}
                            image_url={item?.image_url}
                          />
                        );
                      })
                    : moviedata
                        .filter((item) => item.category === "movie")
                        .slice(0, 4)
                        .map((item, i) => (
                          <StoryTemplate
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            category={item.category}
                            description={item.description}
                            image_url={item?.image_url}
                          />
                        ))}
                </div>
                {!loadmore.movie && moviedata.length > 4 ? (
                  <button
                    onClick={() => {
                      setLoadmore((prevState) => ({
                        ...prevState,
                        movie: true,
                      }));
                    }}
                  >
                    {" "}
                    See More
                  </button>
                ) : (
                  <></>
                )}{" "}
              </>
            ) : (
              <></>
            )}

            {props.category === "all" || props.category === "education" ? (
              <>
                <h1>Top Stories About education</h1>
                <div className="storyContainer-story">
                  {loadmore.education
                    ? educationdata.map((item, i) => {
                        return (
                          <StoryTemplate
                            key={i}
                            id={item.id}
                            name={item.name}
                            category={item.category}
                            description={item.description}
                            image_url={item?.image_url}
                          />
                        );
                      })
                    : educationdata
                        .filter((item) => item.category === "education")
                        .slice(0, 4)
                        .map((item, i) => (
                          <StoryTemplate
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            category={item.category}
                            description={item.description}
                            image_url={item?.image_url}
                          />
                        ))}
                </div>
                {!loadmore.education && educationdata.length > 4 ? (
                  <button
                    onClick={() => {
                      setLoadmore((prevState) => ({
                        ...prevState,
                        education: true,
                      }));
                    }}
                  >
                    {" "}
                    See More
                  </button>
                ) : (
                  <></>
                )}{" "}
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default StoryContainer;
