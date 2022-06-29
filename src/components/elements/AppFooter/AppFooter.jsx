import React from "react";
import logo from './TMDBlogo.svg';
import './AppFooter.scss';

const AppFooter = () => {
return(
    <div className="footer-container">
        <div className="footer-content">
            <h3>Powered by</h3>
        <img src={logo} alt="Powered by TMDB API" />
        <h3>Source code on <a href="https://github.com/MarkoMalec/ChakraUI-movie-app">GitHub</a></h3>
        </div>
    </div>
)

}

export default AppFooter;