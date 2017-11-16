import React, { Component } from "react";

import "../assets/styles/styles.less";
import logo from "../assets/img/logo.svg";

import ControlBox from "./ControlBox/ControlBox";
import Connect from "./Connect/Connect";
import Preview from "../components/Preview/Preview";

import { googleApi as gapi } from "./app.services.js"
gapi.init();

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

    }
    
    updateSelectedMonth(selectedMonth){
        this.setState({
            selectedMonth : selectedMonth
        });
    }
    
    updateFetchedData(fetchedData){
        this.setState({
            fetchedData : fetchedData
        });
    }    
    
    updateImgBlob(imgBlob){
        this.setState({
            imgBlob : imgBlob
        });
    }
   
    updateIsSignedIn(isSignedIn){
        this.setState({
            isSignedIn : isSignedIn
        })
    }

    render(){
        if(this.state.isSignedIn){
            return (
                <div className="wrapper">
                    <ControlBox updateSelectedMonth={this.updateSelectedMonth} updateFetchedData={this.updateFetchedData} updateImgBlob={this.updateImgBlob} updateIsSignedIn={this.updateIsSignedIn}/>
                </div>
            );
        } else {
            return (
                <div className="wrapper wrapper-col-center">
                    <img src={logo} width="250px"/>
                    <div className="btn btn-blue" onClick={() => gapi.signIn()}>Connect</div>
                </div>
            );
        }
    }
}
