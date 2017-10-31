/*global gapi*/

import React, { Component } from "react";
import Button from "../../components/Button/Button";
import _ from "lodash";

let googleApi;
const CLIENT_ID = '28576487880-usdrjfiq5c4e9t7992quhgs0vtcfgops.apps.googleusercontent.com';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

export default class Connect extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      isSignedIn : false,
      fetchedData : {},
      sortedData : {}
    };
    this.fetchCal = this.fetchCal.bind(this);
    this.fetchCalendarsList = this.fetchCalendarsList.bind(this);
    this.gapiInit = this.gapiInit.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.sortData = this.sortData.bind(this);
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
        });
      });
    };
    document.body.appendChild(script);
  }
  
  sortData(){
    let sortedData = {};
    _.forEach(this.state.fetchedData, (value, key) => {
      _.forEach(value, (value, key) => {
        if(value.start.date || value.start.dateTime){
          const fullDayDate = value.start.date ? true : false;
          const startDate = fullDayDate ? new Date(value.start.date) : new Date(value.start.dateTime);
          if(!sortedData[startDate.getDate()+this.props.selectedMonth.firstDay]){
            sortedData[startDate.getDate()+this.props.selectedMonth.firstDay] = [];
          }
          sortedData[startDate.getDate()+this.props.selectedMonth.firstDay].push({
            eventText : value.summary,
            startTime : !fullDayDate ? `${startDate.getHours()}:${startDate.getMinutes() < 10 ? "0"+startDate.getMinutes() : startDate.getMinutes()}` : null
          });
        } else {
          return;
        }
      });
    });
    this.setState({
      sortedData
    }, ()=>console.log(this.state.sortedData));
  }
  
  componentDidMount(){
    this.gapiInit();
  }
  
  componentWillReceiveProps(nextProps){
    
    // Si nouvelle date, effacer les données dans fetchedData
    if(nextProps.selectedMonth !== this.props.selectedMonth){
      this.setState({
        fetchedData : {},
        sortData : {}
      });
    }

    // Ne garder que les objets dont la clé se trouvent dans dans les nouvelles props
    if(nextProps.selectedCalendars !== this.props.selectedCalendars){
      this.setState({
        fetchedData : _.pick(this.state.fetchedData, nextProps.selectedCalendars)
      });
    }
    
    if(
      this.state.isSignedIn &&
      googleApi &&
      nextProps.selectedCalendars.length > 0 &&
      nextProps.selectedMonth &&
      nextProps.selectedCalendars !== this.props.selectedCalendars ||
      nextProps.selectedMonth !== this.props.selectedMonth
      ){
        for(let i=0; i < nextProps.selectedCalendars.length; i++){
          this.fetchCal(nextProps.selectedCalendars[i],nextProps.selectedMonth.timeMin,nextProps.selectedMonth.timeMax);
        }
      }
  }
  
  updateSigninStatus(isSignedIn, callback) {
    this.setState({
      isSignedIn : isSignedIn
    });
    this.props.userIsAuthorizedUpdate(isSignedIn);
    if(isSignedIn){
      this.fetchCalendarsList();
    }
  }
  
  handleAuthClick() {
    if(this.state.isSignedIn){
      gapi.auth2.getAuthInstance().disconnect();
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
      }).then(response => {
        var events = response.result.items;
        this.setState({
          fetchedData : {
            [calId] : events,
            ...this.state.fetchedData
          }
        }, ()=>this.sortData());
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