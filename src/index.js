import React from "react";
import ReactDOM from "react-dom";

import App from "./containers/app";

const root = document.getElementById('root');

window.onload = () => {
    const loading_wrapper = document.querySelector('.loading-wrapper');
    loading_wrapper.parentElement.removeChild(loading_wrapper);
    ReactDOM.render(<App/>, root);
};