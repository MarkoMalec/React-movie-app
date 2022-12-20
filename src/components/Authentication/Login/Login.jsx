import React from "react";
import RequestToken from "../RequestToken/RequestToken";

const Login = () => {
    return (
        <div>
            <h1>Login</h1>
            <RequestToken />
            {/* <a href={`https://www.themoviedb.org/authenticate/${RequestToken}?redirect_to=http://www.yourapp.com/approved`}>Login here</a> */}
        </div>
    );
}

export default Login;