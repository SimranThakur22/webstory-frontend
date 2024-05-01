import React, { useState } from "react";

import cancel_icon from "../../Components/Assets/Vector (11).svg";
import password_icon from "../../Components/Assets/Vector (12).svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    username: "",
    password: "",
  });
  const [responsedata, setresponsedata] = useState({});
  const [password, enablePassword] = useState(false);
  const changehandler = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const loginhandler = async () => {
    console.log(formdata);

    const response = await fetch(
      "https://webstory-backend2.onrender.com/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      }
    );

    const responseData = await response.json();
    console.log(responseData);
    setresponsedata(responseData);

    if (responseData.status === "success") {
      console.log(responseData);
      localStorage.setItem("auth-token", responseData.token);
      props.setUserLoggedIn(true);
      navigate("/");
    }
  };

  return (
    <>
      <Link to="/">
        <div className="darkBG" />
      </Link>
      <div className="centered">
        <div className="modal">
          <Link to="/">
            {" "}
            <img className="cancel" src={cancel_icon}></img>
          </Link>
          {responsedata.status === "failed" ? (
            <>
              <img
                onClick={() => enablePassword((prev) => !prev)}
                className="eye-error"
                src={password_icon}
              ></img>
            </>
          ) : (
            <img
              onClick={() => enablePassword((prev) => !prev)}
              className="eye"
              src={password_icon}
            ></img>
          )}
          <div className="modalHeader">
            <h2 className="heading">Login to SwipTory</h2>
          </div>
          <div className="Form">
            <div className="formdetails">
              <h3>Username</h3>
              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                value={formdata.username}
                onChange={changehandler}
              ></input>
            </div>
            <div className="formdetails">
              <h3>Password</h3>
              {!password ? (
                <input
                  className="password"
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={formdata.password}
                  onChange={changehandler}
                ></input>
              ) : (
                <input
                  className="password"
                  type="text"
                  placeholder="Enter Password"
                  name="password"
                  value={formdata.password}
                  onChange={changehandler}
                ></input>
              )}
            </div>
          </div>
          {responsedata.status === "failed" ? (
            <p
              style={{
                color: "red",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {responsedata.message}
            </p>
          ) : (
            <></>
          )}
          <div className="button">
            <button onClick={loginhandler}>Login</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
