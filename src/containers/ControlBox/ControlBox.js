import React, { Component } from "react";
import PropTypes from "prop-types";

import Connect from "../Connect/Connect";
import Events from "../Events/Events";
import Photos from "../Photos/Photos";
import Calendar from "../../components/Calendar/Calendar";
import Select from "../../components/Select/Select";

export default class ControlBox extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      userIsAuthorized : false
    };
    this.userIsAuthorizedUpdate = this.userIsAuthorizedUpdate.bind(this);
    this.renderComponents = this.renderComponents.bind(this);
  }
  
  userIsAuthorizedUpdate(isAuthorized){
    this.setState({
      userIsAuthorized : isAuthorized
    });
  }
  
  renderComponents(){
    if(this.state.userIsAuthorized){
      return (
        <div>
          <Select/>
          <Photos/>
          <Calendar/>
          <Events/>
        </div>
      );
    } else {
      return null;
    }
  }  
  
  render(){
    return (
      <div className="ControlBox">
        <Connect userIsAuthorizedUpdate={this.userIsAuthorizedUpdate}/>
        {this.renderComponents()}
      </div>
    );
  }
}
