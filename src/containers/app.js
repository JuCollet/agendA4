import React, { Component } from "react";

import "../assets/styles/styles.less";
import stylesList from "../assets/calendarStyles";

import Control from "./Control/Control";
import Preview from "../components/Preview/Preview";
import Landing from "../components/Landing/Landing";

import { googleApi as gapi } from "./app.services.js"

export default class App extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            calendarList : [],
            selectedCalendars : [],
            selectedMonth : {},
            selectedStyle : stylesList[0],
            fetchedData : {},
            imgBlob : {},
            isSignedIn : false
        };
        this.resetState = this.resetState.bind(this);
        this.updateCalendarList = this.updateCalendarList.bind(this);
        this.updateSelectedCalendars = this.updateSelectedCalendars.bind(this);
        this.updateSelectedMonth = this.updateSelectedMonth.bind(this);
        this.updateFetchedData = this.updateFetchedData.bind(this);
        this.updateImgBlob = this.updateImgBlob.bind(this);
        this.updateIsSignedIn = this.updateIsSignedIn.bind(this);
        this.updateSelectedStyle = this.updateSelectedStyle.bind(this);
    }
    
    componentDidMount(){
        gapi.init(isSignedIn => {
            this.setState({isSignedIn}, this.updateCalendarList);
        });
    }

    resetState(){
        this.setState({
            fetchedData : {},
            selectedCalendars : []
        });
    }

    updateCalendarList(){
        gapi.fetchCalendarList(calendarList => {
            this.setState({calendarList})
        });
    }

    updateSelectedCalendars(selectedCalendars){
        let { timeMin, timeMax, firstDay } = this.state.selectedMonth;
        this.setState({selectedCalendars, fetchedData : {}}, () => {
            gapi.fetchCalEvents(this.state.selectedCalendars, timeMin, timeMax, firstDay, fetchedData => {
                this.setState({fetchedData});
            }, () => this.updateIsSignedIn(false));
        });
    };
    updateSelectedMonth(selectedMonth){
        this.setState({selectedMonth, fetchedData : {}}, () => {
            let { timeMin, timeMax, firstDay } = this.state.selectedMonth;
            gapi.fetchCalEvents(this.state.selectedCalendars, timeMin, timeMax, firstDay, fetchedData => {
                this.setState({fetchedData});
            }, () => this.updateIsSignedIn());
        });
    };
    updateSelectedStyle(selectedStyle){this.setState({selectedStyle});};
    updateFetchedData(fetchedData){this.setState({fetchedData});};
    updateImgBlob(imgBlob){this.setState({imgBlob});};
    updateIsSignedIn(isSignedIn){this.setState({isSignedIn});};

    render(){
        if(this.state.isSignedIn){
            return (
                <div className="app-wrapper">
                    <Preview
                        fetchedData={this.state.fetchedData}
                        imgBlob={this.state.imgBlob}
                        selectedMonth={this.state.selectedMonth}
                        selectedStyle={this.state.selectedStyle}
                    />
                    <Control 
                        calendarList={this.state.calendarList}
                        signOut={gapi.signOut}
                        selectedMonth={this.state.selectedMonth}
                        selectedCalendars={this.state.selectedCalendars}
                        resetState={this.resetState}
                        updateImgBlob={this.updateImgBlob}
                        updateIsSignedIn={this.updateIsSignedIn}                        
                        updateSelectedCalendars={this.updateSelectedCalendars}
                        updateSelectedMonth={this.updateSelectedMonth}
                        updateSelectedStyle={this.updateSelectedStyle}
                    />
                </div>
            )
        } else {
            return <Landing signIn={gapi.signIn} signInCallback={this.updateCalendarList} updateIsSignedIn={this.updateIsSignedIn}/>
        }
    }
}
