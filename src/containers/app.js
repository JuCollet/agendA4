import React, { Component } from "react";

import "../assets/styles/styles.less";
import logo from "../assets/img/logo.svg";

import ControlBox from "./ControlBox/ControlBox";
import Preview from "../components/Preview/Preview";

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

    renderComponents(){
        if(this.state.isSignedIn){
            return (
                <ControlBox updateSelectedMonth={this.updateSelectedMonth} updateFetchedData={this.updateFetchedData} updateImgBlob={this.updateImgBlob} updateIsSignedIn={this.updateIsSignedIn}/>                
            );
        } else {
            return (
                <div className="wrapper">
                    <img src={logo} width="250px"/>
                    <button>Login</button>
                </div>
            );
        }
    }

    render(){
        return(
            <div className="App">
                {this.renderComponents()}
            </div>
        );
    }
}
