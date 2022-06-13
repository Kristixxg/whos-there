import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { LOGIN_USER } from "../utils/mutations";
import "./login.css";

const Login = () => {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);


  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    console.log("hello");
    try {
      console.log("im over hereeeeeee!!!");
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }


    // clear form values
    setFormState({
      username: "",
      password: "",
    });
  };


  // return JSX 
  return (
    <>
      <div className="container">
        <div className="form-area">
          {data ? (
            <p>
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <div className="form-text">
                <h1>LOGIN</h1>
                <div className="input">
                  <input
                    type="text"
                    placeholder="Username"
                    value={formState.username}
                    name="username"
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="input">
                  <input
                    type="password"
                    placeholder="Password"
                    value={formState.password}
                    name="password"
                    onChange={handleChange}
                  ></input>
                </div>
                <button className="loginBtn" type="submit">
                  Login
                </button>
              </div>
              {error ? (
                <div>
                  <p className="error-text">
                    The provided credentials are incorrect
                  </p>
                </div>
              ) : null}
              <div className="signupBtn">
                <h3>Already Have An Account?</h3>
                <Link to="/signup">
                  <button type="submit">Sign Up</button>
                </Link>
              </div>
            </form>
          )}
          {error && (
            <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
