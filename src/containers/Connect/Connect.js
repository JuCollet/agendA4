/*global gapi*/

import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../components/Button/Button";

let googleApi;
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
    this.fetchCalendarsList = this.fetchCalendarsList.bind(this);
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
        }).then(() => {
          googleApi = gapi;
          gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
          this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          this.fetchCalendarsList();
        });
      });
    };
    
    document.body.appendChild(script);
    
  }
  
  componentDidMount(){
    this.gapiInit();
  }
  
  componentWillReceiveProps(nextProps){
    this.fetchCal("qfqo52u5oannurigm88qc0ea98@group.calendar.google.com","2017-09-30T22:00:00.000Z","2017-10-31T23:00:00.000Z");
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
  
  fetchCal(calId, timeMin, timeMax){
    if(googleApi) {
      googleApi.client.calendar.events.list({
        'calendarId': calId,
        'timeMin': timeMin,
        'timeMax': timeMax,
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      }).then(function(response) {
        var events = response.result.items;
        console.log(events);
      });
    }
  }

  fetchCalendarsList(){
    if(googleApi) {
      googleApi.client.calendar.calendarList.list()
        .then(response => {
        var events = response.result.items;
        this.props.updateCalendarList(events);
      });
    }
  }  
  
  render(){
    
    const title = this.state.isSignedIn ? "Se déconnecter" : "Se connecter";
    
    return (
      <div className="Connect">
        <Button clickHandler={this.handleAuthClick} title={title}/>
      </div>
    );
  }
  
}