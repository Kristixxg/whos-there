import React , {useState}from "react";
import { useMutation } from '@apollo/client';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Auth from '../utils/auth';
import {LOGIN_USER} from '../utils/mutations'


function Login(props) {

    const [formState, setFormState] = useState({username: '', password: ''});
    const [login, {error}] = useMutation(LOGIN_USER);

    const handleFormSubmit = async (event) => {
        event.prevenDefault();
        try {
            const mutationResponce = await login ({
                variables: {username: formState.username, password: formState.password},
            });
            const token = mutationResponce.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }
    };

    


    return (
        <>
        <div className="container">
        <div className="form-area">
            <form className='login-form' onSubmit={handleFormSubmit}>
                <div className="form-text">
                    <h1>Login</h1>
                    <div className="input"><input type='text' placeholder="Username" id="usernameLogin"></input></div>
                    <div className="input"><input type='password' placeholder="Password" id="passwordLogin"></input></div>
                    <button className="loginBtn" type="submit">Login</button>
                </div>
            </form>
            <div className="signupBtn">
            <h3>Already Have An Account?</h3>
            <Link to='/signup'>
            <button className="aBtn" type="submit">Sign Up!</button>
            </Link>
            </div>
        </div>
        </div>
        
        </>
    );
}

export default Login;