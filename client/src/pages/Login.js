import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations'


function Login(props) {

    const [formState, setFormState] = useState({ username: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);

    const handleFormSubmit = async (event) => {
        event.prevenDefault();
        try {
            const mutationResponce = await login({
                variables: { username: formState.username, password: formState.password },
            });
            const token = mutationResponce.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
      };


    return (
        <>
            <div className="container">
                <div className="form-area">
                    <form className='login-form' onSubmit={handleFormSubmit}>
                        <div className="form-text">
                            <h1>Login</h1>
                            <div className="input"><input type='text' placeholder="Username" id="usernameLogin" onChange={handleChange}></input></div>
                            <div className="input"><input type='password' placeholder="Password" id="passwordLogin" onChange={handleChange}></input></div>
                            <Link to='/homepage'>
                            <button className="loginBtn" type="submit">Login</button>
                            </Link>
                        </div>
                        {error ? (
                            <div>
                                <p className="error-text">The provided credentials are incorrect</p>
                            </div>
                        ) : null}
                        <div className="signupBtn">
                            <h3>Already Have An Account?</h3>
                            <Link to='/signup'>
                                <button className="aBtn" type="submit">Sign Up!</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
}

export default Login;