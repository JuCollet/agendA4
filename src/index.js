import React from "react";
import ReactDOM from "react-dom";

import App from "./containers/app";

const root = document.getElementById('root');

window.onload = () => {
    document.querySelector('.loading-wrapper').remove();
    ReactDOM.render(<App/>, root);
};