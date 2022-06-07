import React from "react";
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';


function Login(props) {

    return (
        <>

        <div className="container">
        <div className="form-area">
            <form className='login-form'>
                <div className="form-text">
                    <h1>Login</h1>
                    <div className="input"><input type='text' placeholder="Username" id="usernameLogin"></input></div>
                    <div className="input"><input type='password' placeholder="Password" id="passwordLogin"></input></div>
                    <button class="loginBtn" type="submit">Login</button>
                </div>
            </form>
            <div className="signupBtn">
            <h3>Already Have An Account?</h3>
            <a href="#"><button className="aBtn" type="submit">Sign Up!</button></a>
            </div>
        </div>
        </div>
        
        </>
    );
}

export default Login;