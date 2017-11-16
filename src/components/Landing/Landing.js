import React from "react";
import logo from "../../assets/img/logo.svg";

export default function(props){

    return(
        <div className="wrapper wrapper-col-center">
            <img src={logo} width="300px"/>
            <div className="btn btn-blue margin-lg-top" onClick={() => props.signIn(props.updateIsSignedIn)}>Connecte ton agenda</div>
        </div>
    )
}