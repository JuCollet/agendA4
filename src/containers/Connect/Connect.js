/*global gapi*/

import React, { Component } from "react";
import Button from "../../components/Button/Button";

import { colors } from "../../assets/colors";

let googleApi;
const CLIENT_ID = '28576487880-usdrjfiq5c4e9t7992quhgs0vtcfgops.apps.googleusercontent.com';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

export default class Connect extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      isSignedIn : false,
      processedData : {},
      selectedCalendars : []
    };
    this.fetchCal = this.fetchCal.bind(this);
    this.fetchCalendarsList = this.fetchCalendarsList.bind(this);
    this.gapiInit = this.gapiInit.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.processData = this.processData.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
  }
  
  componentDidMount(){
    this.gapiInit();
  }
  
  componentWillReceiveProps(nextProps){
    
    if(nextProps.selectedMonth !== this.props.selectedMonth){
      this.setState({
        processedData : {}
      }, () => { 
        if(nextProps.selectedCalendars.length === 0){
          return this.setState({
            processedData : {}
          }, ()=>this.props.updateFetchedData(this.state.processedData));
        }        
        for(let i=0; i < nextProps.selectedCalendars.length; i++){
          this.fetchCal(nextProps.selectedCalendars[i],nextProps.selectedMonth.timeMin,nextProps.selectedMonth.timeMax);
        }
        return;
      });
    }
    
    if(
      this.state.isSignedIn &&
      (googleApi || nextProps.googleApiMock) &&
      nextProps.selectedCalendars &&
      nextProps.selectedMonth &&
      nextProps.selectedCalendars.length !== this.props.selectedCalendars.length
    ){
      this.setState({
        processedData : {}
      }, () => {
        if(nextProps.selectedCalendars.length === 0){
          return this.setState({
            processedData : {}
          }, ()=>this.props.updateFetchedData(this.state.processedData));
        }
        for(let i=0; i < nextProps.selectedCalendars.length; i++){
          this.fetchCal(nextProps.selectedCalendars[i],nextProps.selectedMonth.timeMin,nextProps.selectedMonth.timeMax);
        }
      });
    }
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
  
  processData(eventsArray){
    let newProcessedData = this.state.processedData;
    eventsArray.forEach(el=>{
      if(el.start.date || el.start.dateTime){
        const fullDayDate = el.start.date ? true : false;
        // Remove Google Timezone info;
        const startDate = fullDayDate ? new Date(el.start.date.indexOf('+') !== -1 ? el.start.date.split('+')[0] : el.start.date ) : new Date(el.start.dateTime.indexOf('+') !== -1 ? el.start.dateTime.split('+')[0] : el.start.dateTime);
        if(!newProcessedData[startDate.getDate()+this.props.selectedMonth.firstDay]){
          newProcessedData[startDate.getDate()+this.props.selectedMonth.firstDay] = [];
        }
        newProcessedData[startDate.getDate()+this.props.selectedMonth.firstDay].push({
          eventText : el.summary,
          startTime : !fullDayDate ? `${startDate.getHours()}:${startDate.getMinutes() < 10 ? "0"+startDate.getMinutes() : startDate.getMinutes()}` : null,
          color : el.colorId ? colors[el.colorId] : "#f2c463"
        });
      } else {
        return;
      }
      this.setState({
        processedData : {...this.state.processedData, ...newProcessedData}
      }, ()=>this.props.updateFetchedData(this.state.processedData));
    });
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
        this.processData(events);
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