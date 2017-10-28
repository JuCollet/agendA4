import React, { Component } from "react";

import "../assets/styles/styles.less";

import ControlBox from "./ControlBox/ControlBox";
import Preview from "../components/Preview/Preview";

export default class App extends Component {
    render(){
        return(
            <div className="App">
              <Preview/>
              <ControlBox/>
            </div>
        );
    }
}
