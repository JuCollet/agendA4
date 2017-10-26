/*global gapi*/

import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../components/Button/Button";

const CLIENT_ID = '28576487880-usdrjfiq5c4e9t7992quhgs0vtcfgops.apps.googleusercontent.com';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

export default class Connect extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      isSignedIn : false
    };
    this.fetchCal = this.fetchCal.bind(this);
    this.gapiInit = this.gapiInit.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
  }
  
  gapiInit() {
    
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";
    
    script.onload = () => {
      gapi.load('client:auth2', () => {
        gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
        }).then(function () {
          gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
          this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        }.bind(this));
      });
    };
    
    document.body.appendChild(script);
    
  }
  
  componentDidMount(){
    this.gapiInit();
  }
  
  updateSigninStatus(isSignedIn) {
    this.setState({
      isSignedIn : isSignedIn
    });
    this.props.userIsAuthorizedUpdate(isSignedIn);
  }
  
  handleAuthClick() {
    if(this.state.isSignedIn){
      gapi.auth2.getAuthInstance().signOut();
    } else {
      gapi.auth2.getAuthInstance().signIn();
    }
  }  
  
  fetchCal(){
    gapi.client.calendar.events.list({
      'calendarId': "#contacts@group.v.calendar.google.com",
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(function(response) {
      var events = response.result.items;
      console.log(events)
    });
  }

  fetchCals(){
    gapi.client.calendar.calendarList.list()
      .then(function(response) {
      var events = response.result.items;
      console.log(events)
    });
  }  
  
  render(){
    
    const title = this.state.isSignedIn ? "Sign out" : "Sign in";
    
    return (
      <div className="Connect">
        <Button clickHandler={this.handleAuthClick} title={title}/>
        {this.state.isSignedIn ? <div><Button clickHandler={this.fetchCal} title="Fetch"/> <Button clickHandler={this.fetchCals} title="Fetch cals"/> </div>: null}
      </div>
    );
  }
  
}