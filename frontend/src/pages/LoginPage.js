import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  let navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [dataBook, setDataBook] = useState([]);

  const postUser = async (e) => {
    e.preventDefault();
    var user_username = usernameInput;
    var user_email = emailInput;
    var user_password = passwordInput;

    console.log(
      "user " +
        user_username +
        " + tag: + " +
        user_email +
        "user: " +
        user_password
    );
    try {
      const body = {
        user_email,
        user_username,
        user_password,
      };
      //console.log(body);
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((response)=>getDatabook())

      //console.log(response);
      setUsernameInput("");
      setShowRegister(false);
      alert("Account Created Successfully");
      
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getDatabook();
  }, []);

  async function getDatabook() {
    try {
      //console.log(body);
      const response = await fetch("http://localhost:5000/users");
      var data = await response.json();
      console.log(data);

      setDataBook(data);
    } catch (error) {
      console.error(error.message);
    }
  }

  const checkLogin = (e) => {
    console.log("checkLogin")
    //e.preventDefault();
    var user_email = emailInput;
    var user_password = passwordInput;

    for (let index = 0; index < dataBook.length; index++) {
      //console.log(dataBook[index].user_email)
      if (user_email === dataBook[index].user_email) {
        if (user_password === dataBook[index].user_password) {
          nextPage(dataBook[index].user_username);
          return
        }
      }
    }
    alert("Login Failed", "Ok");
  };

  function nextPage(username) {
    console.log(username)
    navigate("/player_table/" + username);
  }

  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <div className="container">
        <h1>NHL Encyclopedia</h1>
        <form onSubmit={postUser}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
          </div>
          {showRegister ? (
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="userName"
                className="form-control"
                id="userName"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
              />
            </div>
          ) : (
            ""
          )}

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
          </div>
          

          {showRegister ? (
            <>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowRegister(!showRegister)}
              >
                Back to Login
              </button>
              <button type="submit" className="btn btn-primary">
                Create Account
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowRegister(!showRegister)}
              >
                Register
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => checkLogin()}
              >
                Login
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
