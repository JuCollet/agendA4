import React from "react";
import logo from "../../assets/img/logo.svg";
import mockup from "../../assets/img/mockup.png";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default function(props){

    return(
        <div className="landing">
            <img src={logo} width="300px"/>
            <img className="landingBack landingBack-left" src={mockup}/>
            <img className="landingBack landingBack-right" src={mockup}/>
            <div className="btn btn-blue margin-lg-top" onClick={() => props.signIn(props.updateIsSignedIn, props.signInCallback)}>Connecte ton agenda</div>
        </div>
    )
}