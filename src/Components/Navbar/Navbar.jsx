import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import user_img from "../../Components/Assets/Calm and confident (1).svg";

import hamburger from "../../Components/Assets/Vector (13).svg";
import bookmark from "../../Components/Assets/Vector (14).svg";
import axios from "axios";

const Navbar = (props) => {
  const [name, setName] = useState("");
  const [toogleham, settoogleham] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      axios
        .get("http://localhost:4000/username", {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        })
        .then((res) => {
          setName(res.data.data.username);
        });
    }
  }, [props.userloggedin]);

  return (
    <div className="nav-wrapper">
      <div className="navbar">
        <div className="navbar-left">SwipTory</div>
        {props.bookmark ? (
          <a className="back" onClick={() => props.setbookmark(false)} href="#">
            Back
          </a>
        ) : (
          <></>
        )}
        <div className="navbar-right">
          {!props.userloggedin ? (
            <>
              <Link to="/register">
                <button>Register Now</button>
              </Link>
              <Link to="/login">
                {" "}
                <button style={{ background: "#73ABFF" }}>Sign In</button>
              </Link>
            </>
          ) : (
            <>
              {/* <Link to='/bookmark' style={{ textDecoration: 'none' }}><button onClick={props.setbookmark(true)} className='bookmark'><img src={bookmark} ></img>Bookmark</button></Link> */}
              <button
                onClick={() => {
                  props.setbookmark(true);
                }}
                className="bookmark"
              >
                <img src={bookmark}></img>Bookmark
              </button>
              <Link to="/addStory">
                <button>Add Story</button>
              </Link>
              <img className="userimg" src={user_img}></img>
              <div class="dropdown">
                <img className="hamburger" src={hamburger}></img>
                <div class="dropdown-content">
                  <a href="#">{name}</a>
                  <button
                    onClick={() => {
                      localStorage.removeItem("auth-token");
                      props.setUserLoggedIn(false);
                      window.location.replace("/");
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>{" "}
            </>
          )}
        </div>
        <div className="hamburger-mob">
          <img
            src={hamburger}
            alt=""
            onClick={() => settoogleham(!toogleham)}
          />
        </div>
      </div>
      <div
        className="navbar-right-mob"
        style={toogleham ? { display: "block" } : { display: "none" }}
      >
        {!props.userloggedin ? (
          <>
            <div className="wrap-actions">
              <Link to="/register">
                <button className="action-button">Register Now</button>
              </Link>
              <Link to="/login">
                <button className="action-button">Sign In</button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="wrap-actions">
              <div className="profile-wrpa">
                <img className="userimg" src={user_img} />
                <a href="#">{name}</a>
              </div>
              <button
                className="action-button align-button"
                onClick={() => {
                  props.setbookmark(true);
                }}
              >
                <img src={bookmark}></img>Bookmark
              </button>
              <Link to="/addStory">
                <button className="action-button">Add Story</button>
              </Link>
              <button
                className="action-button"
                onClick={() => {
                  localStorage.removeItem("auth-token");
                  props.setUserLoggedIn(false);
                  window.location.replace("/");
                }}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
