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
        this.updateSelectedCalendars = this.updateSelectedCalendars.bind(this);
        this.updateSelectedMonth = this.updateSelectedMonth.bind(this);
        this.updateFetchedData = this.updateFetchedData.bind(this);
        this.updateImgBlob = this.updateImgBlob.bind(this);
        this.updateIsSignedIn = this.updateIsSignedIn.bind(this);
        this.updateSelectedStyle = this.updateSelectedStyle.bind(this);
    }
    
    componentDidMount(){
        gapi.init(isSignedIn => {
            this.setState({isSignedIn},
            gapi.fetchCalendarList(calendarList => {
                this.setState({calendarList})
            }));
        });
    }

    updateSelectedCalendars(selectedCalendars){
        let { timeMin, timeMax, firstDay } = this.state.selectedMonth;
        this.setState({selectedCalendars}, () => {
            gapi.fetchCalEvents(this.state.selectedCalendars, timeMin, timeMax, firstDay, fetchedData => {
                this.setState({fetchedData});
            });
        });
    };
    updateSelectedMonth(selectedMonth){
        let { timeMin, timeMax, firstDay } = this.state.selectedMonth;        
        this.setState({selectedMonth}, () => {
            gapi.fetchCalEvents(this.state.selectedCalendars, timeMin, timeMax, firstDay, fetchedData => {
                this.setState({fetchedData});
            });
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
                    <Preview />
                    <Control 
                        calendarList={this.state.calendarList}
                        signOut={gapi.signOut}
                        selectedMonth={this.state.selectedMonth}
                        selectedCalendars={this.state.selectedCalendars}
                        updateImgBlob={this.updateImgBlob}
                        updateIsSignedIn={this.updateIsSignedIn}                        
                        updateSelectedCalendars={this.updateSelectedCalendars}
                        updateSelectedMonth={this.updateSelectedMonth}
                        updateSelectedStyle={this.updateSelectedStyle}
                    />
                </div>
            )
        } else {
            return <Landing signIn={gapi.signIn} updateIsSignedIn={this.updateIsSignedIn}/>
        }
    }
}
