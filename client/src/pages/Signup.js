import React from "react";

function Signup() {

    return(

        <>
<div className="container">
    <form className="form-area signup-form">
        <div className="form-text">
            <h1>Signup Form</h1>
            <div className="input-one"><input type="text" placeholder="Username" id="name-signup"/></div>
            <div className="input-one"><input type="email" placeholder="Email" id="email-signup"/>
            </div>
            <div className="input-one"><input type="password" placeholder="Password" id="password-signup"/>
            </div>
            <button className="signupbtn" type="submit">Sign Up</button>
        </div>
    </form>
</div>

        </>
    )

}


export default Signup;