import React, { createContext, useEffect, useState } from "react";
import storydata from "../Components/Assets/allCategoryData";
import axios from "axios";

export const StoryContext = createContext(null);

const StoryContextProvider = (props) => {
  const [islogin, setislogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      setislogin(true);
    } else {
      setislogin(false);
    }
  }, []);

  const defaultBookmarkItem = () => {
    let bookmark = {};
    for (let index = 1; index <= 300; index++) {
      bookmark[index] = 0;
    }
    return bookmark;
  };
  const defaultlikeStoryItem = () => {
    let likestory = {};
    for (let index = 1; index <= 300; index++) {
      likestory[index] = 0;
    }
    return likestory;
  };

  const [allstory, setallstory] = useState({});
  const [bookmarkitem, setbookmarkitem] = useState(defaultBookmarkItem());
  const [likestoryitem, setlikestoryitem] = useState(defaultlikeStoryItem());

  useEffect(() => {
    (async () => {
      await axios
        .get("https://webstory-backend2.onrender.com/allstories")
        .then((res) => {
          setallstory(res.data.data.stories);
        })
        .catch((error) => {
          console.error(error);
        });

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
  }, [islogin]);

  const [randomStory, setRandomStory] = useState({});

  const addbookmark = async (storyid) => {
    // setbookmarkitem((prev)=>({...prev,[storyid]:1}))
    if (localStorage.getItem("auth-token")) {
      await axios
        .post(
          "https://webstory-backend2.onrender.com/addbookmark",
          { storyId: storyid },
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const removebookmark = async (storyid) => {
    // setbookmarkitem((prev)=>({...prev,[storyid]:0}))
    if (localStorage.getItem("auth-token")) {
      await axios
        .post(
          "https://webstory-backend2.onrender.com/removebookmark",
          { storyId: storyid },
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const addlikedstory = async (storyid) => {
    if (localStorage.getItem("auth-token")) {
      await axios
        .post(
          "https://webstory-backend2.onrender.com/addlikestory",
          { storyId: storyid },
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const removelikedstory = async (storyid) => {
    if (localStorage.getItem("auth-token")) {
      await axios
        .post(
          "https://webstory-backend2.onrender.com/removelikedstory",
          { storyId: storyid },
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // const [fooddata,setfooddata]=useState([]);
  // const [moviedata,setmoviedata]=useState([]);
  // const [educationdata,seteducation]=useState([]);
  // const [traveldata,settraveldata]=useState([]);
  // const [health,sethealthdata]=useState([]);

  // const storygeneratehandler=async()=>{

  //       await axios.get('https://webstory-backend2.onrender.com/top5stories?category=movie').then((res)=>{ setmoviedata(res.data.data.topstory_ids);})
  //      await axios.get('https://webstory-backend2.onrender.com/top5stories?category=food').then((res)=>{setfooddata(res.data.data.topstory_ids)});
  //      await axios.get('https://webstory-backend2.onrender.com/top5stories?category=education').then((res)=>{seteducation(res.data.data.topstory_ids)});
  //      await  axios.get('https://webstory-backend2.onrender.com/top5stories?category=health and fitness').then((res)=>{sethealthdata(res.data.data.topstory_ids)});
  //      await  axios.get('https://webstory-backend2.onrender.com/top5stories?category=travel').then((res)=>{settraveldata(res.data.data.topstory_ids)});
  //   console.log(health);

  // }

  const contextValue = {
    storydata,
    randomStory,
    allstory,
    bookmarkitem,
    likestoryitem,
    addbookmark,
    removebookmark,
    addlikedstory,
    removelikedstory,
    setbookmarkitem,
    setlikestoryitem,
  };

  return (
    <StoryContext.Provider value={contextValue}>
      {props.children}
    </StoryContext.Provider>
  );
};
export default StoryContextProvider;
