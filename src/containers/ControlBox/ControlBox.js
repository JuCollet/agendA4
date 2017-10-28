import React, { Component } from "react";
import _ from "lodash";

import Connect from "../Connect/Connect";
import Events from "../Events/Events";
import Photos from "../Photos/Photos";
import Calendar from "../../components/Calendar/Calendar";
import Select from "../../components/Select/Select";

export default class ControlBox extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      userIsAuthorized : false,
      calendarList : [],
      monthsList : this.createMonthsList(),
      selectedCalendars : [],
      selectedMonth : {}
    };
    this.createMonthsList = this.createMonthsList.bind(this);
    this.renderComponents = this.renderComponents.bind(this);
    this.updateCalendarList = this.updateCalendarList.bind(this);
    this.updateSelectedCalendars = this.updateSelectedCalendars.bind(this);
    this.updateSelectedMonth = this.updateSelectedMonth.bind(this);
    this.userIsAuthorizedUpdate = this.userIsAuthorizedUpdate.bind(this);
  }
  
  componentDidMount(){
    this.setState({
      selectedMonth : this.state.monthsList[new Date().getMonth()]
    });
  }
  
  createMonthsList(){
    let months = [];
    let monthsNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    
    for(let i = 0; i < 12; i++){
      let year = i < currentMonth ? currentYear + 1 : currentYear;
      let isoYear = year;
      let month = i;
      if(i === 0){
        isoYear--;
        month = 12;
      }
      months.push({
        string : `${monthsNames[i]} ${year}`,
        timeMin : new Date(isoYear,month).toISOString(),
        timeMax : new Date(isoYear,month + 1).toISOString()
      });
    }
    return months;
  }
  
  userIsAuthorizedUpdate(isAuthorized){
    this.setState({
      userIsAuthorized : isAuthorized
    });
  }
  
  updateSelectedCalendars(e){
    this.setState({
      selectedCalendars : e.target.checked ? this.state.selectedCalendars.concat(e.target.value) : _.pull(this.state.selectedCalendars, e.target.value)
    });
  }
  
  updateCalendarList(calendarList){
    this.setState({
      calendarList : calendarList.map(el=>{return {id:el.id,resume:el.summary}})
    });
  }
  
  updateSelectedMonth(selectedValue){
    this.setState({
      selectedMonth : _.find(this.state.monthsList, {string : selectedValue})
    });
  }
  
  renderComponents(){
    if(this.state.userIsAuthorized){
      return (
        <div>
          <Select selectOptions={this.state.monthsList.map(el=>el.string)} selectOnChangeHandler={(e)=>{this.updateSelectedMonth(e.currentTarget.value)}}/>
          <Photos/>
          <Calendar calendarList={this.state.calendarList} calendarCheckHandler={this.updateSelectedCalendars} />
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
        <Connect 
          userIsAuthorizedUpdate={this.userIsAuthorizedUpdate} 
          updateCalendarList={this.updateCalendarList} 
          selectedMonth={this.state.selectedMonth} 
          selectedCalendars={this.state.selectedCalendars}
        />
        {this.renderComponents()}
      </div>
    );
  }
}
