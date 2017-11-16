import React, { Component } from "react";

import "../assets/styles/styles.less";

import ControlBox from "./ControlBox/ControlBox";
import Connect from "./Connect/Connect";
import Preview from "../components/Preview/Preview";
import Landing from "../components/Landing/Landing";

import { googleApi as gapi } from "./app.services.js"

export default class App extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            selectedMonth : {},
            fetchedData : {},
            imgBlob : {},
            isSignedIn : false
        };
        this.updateSelectedMonth = this.updateSelectedMonth.bind(this);
        this.updateFetchedData = this.updateFetchedData.bind(this);
        this.updateImgBlob = this.updateImgBlob.bind(this);
        this.updateIsSignedIn = this.updateIsSignedIn.bind(this);        
    }
    
    componentDidMount(){
        gapi.init(isSignedIn => {
            this.setState({isSignedIn});
        });
    }

    updateSelectedMonth(selectedMonth){this.setState({selectedMonth});};
    updateFetchedData(fetchedData){this.setState({fetchedData});};
    updateImgBlob(imgBlob){this.setState({imgBlob});};
    updateIsSignedIn(isSignedIn){this.setState({isSignedIn});};

    render(){
        if(this.state.isSignedIn){
            return <h1>Signed in !</h1>
        } else {
            return <Landing signIn={gapi.signIn} signOut={gapi.signOut} updateIsSignedIn={this.updateIsSignedIn}/>
        }
    }
}
