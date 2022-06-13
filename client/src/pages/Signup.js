import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      console.log("im here");
      const { data } = await addUser({
        variables: { ...formState },
      });
      console.log("im here as well!");
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container">
      {data ? (
        <p>
          Success! You may now head{""}
          <Link to="/">back to the homepage.</Link>
        </p>
      ) : (
        <form className="form-area signup-form" onSubmit={handleFormSubmit}>
          <div className="form-text">
            <h1>SIGN UP</h1>
            <div className="input-one">
              <input
                type="text"
                placeholder="Username"
                value={formState.username}
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="input-one">
              <input
                type="email"
                placeholder="Email"
                value={formState.email}
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="input-one">
              <input
                type="password"
                placeholder="Password"
                value={formState.password}
                name="password"
                onChange={handleChange}
              />
            </div>
            <button className="signupbtn" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      )}
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default Signup;
