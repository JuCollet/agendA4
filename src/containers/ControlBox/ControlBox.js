import React, { Component } from "react";
import _ from "lodash";

import Calendar from "../../components/Calendar/Calendar";
import Connect from "../Connect/Connect";
import DropBox from "../DropBox/DropBox";
import Print from "../Print/Print";
import Select from "../../components/Select/Select";

export default class ControlBox extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      userIsAuthorized : false,
      calendarList : [],
      fetchedData : {}, 
      monthsList : this.createMonthsList(),
      imgBlobUrl : null,
      selectedCalendars : [],
      selectedMonth : this.createMonthsList()[0]
    };
    this.createMonthsList = this.createMonthsList.bind(this);
    this.renderComponents = this.renderComponents.bind(this);
    this.updateFetchedData = this.updateFetchedData.bind(this);
    this.updateCalendarList = this.updateCalendarList.bind(this);
    this.updateImgBlobUrl = this.updateImgBlobUrl.bind(this);
    this.updateSelectedCalendars = this.updateSelectedCalendars.bind(this);
    this.updateSelectedMonth = this.updateSelectedMonth.bind(this);
    this.userIsAuthorizedUpdate = this.userIsAuthorizedUpdate.bind(this);
  }
  
  componentDidMount(){
    if(this.props.updateSelectedMonth){
      this.props.updateSelectedMonth(this.state.selectedMonth);
    }
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
        timeMax : new Date(isoYear,month + 1).toISOString(),
        firstDay : new Date(isoYear, month, 1).getDay() === 0 ? new Date(isoYear, month, 1).getDay() + 6 : new Date(isoYear, month, 1).getDay() -1,
        nbrOfDays : new Date(isoYear, month+1, 0).getDate(),
        previousMonthNbrOfDays : new Date(isoYear, month, 0).getDate(),
      });
    }
    return months;
  }

  userIsAuthorizedUpdate(isAuthorized){
    this.setState({
      userIsAuthorized : isAuthorized
    });
  }
  
  updateFetchedData(fetchedData){
    this.setState({
      fetchedData:fetchedData
    }, ()=> {
      this.props.updateFetchedData(this.state.fetchedData);
    });
  }
  
  updateSelectedCalendars(e){
    this.setState({
      selectedCalendars : e.target.checked ? this.state.selectedCalendars.concat(e.target.value) : this.state.selectedCalendars.filter(el => el !== e.target.value)
    });
  }
  
  updateCalendarList(calendarList){
    this.setState({
      calendarList : calendarList.map(el=>{return {id:el.id,resume:el.summary}})
    });
  }
  
  updateImgBlobUrl(url){
    this.props.updateImgBlobUrl(url);
  }
  
  updateSelectedMonth(selectedValue){
    this.setState({
      selectedMonth : _.find(this.state.monthsList, {string : selectedValue})
    }, () => {
      this.props.updateSelectedMonth(this.state.selectedMonth);
    });
  }
  
  renderComponents(){
    if(this.state.userIsAuthorized){
      return (
        <div>
          <Select selectOptions={this.state.monthsList.map(el=>el.string)} selectOnChangeHandler={(e)=>{this.updateSelectedMonth(e.currentTarget.value)}}/>
          <DropBox updateImgBlobUrl={this.updateImgBlobUrl}/>
          <Calendar calendarList={this.state.calendarList} calendarCheckHandler={this.updateSelectedCalendars} />
          <Print/>
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
          updateFetchedData={this.updateFetchedData}
          selectedMonth={this.state.selectedMonth} 
          selectedCalendars={this.state.selectedCalendars}
        />
        {this.renderComponents()}
        <img src={this.state.imgBlobUrl}/>
      </div>
    );
  }
}