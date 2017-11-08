import React, { Component } from "react";

import "../assets/styles/styles.less";

import ControlBox from "./ControlBox/ControlBox";
import Preview from "../components/Preview/Preview";

export default class App extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            selectedMonth : {},
            fetchedData : {},
            imgBlobUrl : null
        };
        this.updateSelectedMonth = this.updateSelectedMonth.bind(this);
        this.updateFetchedData = this.updateFetchedData.bind(this);
        this.updateImgBlobUrl = this.updateImgBlobUrl.bind(this);
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
    
    updateImgBlobUrl(blobUrl){
        this.setState({
            imgBlobUrl : blobUrl
        });
    }
    
    render(){
        return(
            <div className="App">
              <Preview selectedMonth={this.state.selectedMonth} fetchedData={this.state.fetchedData} imgBlobUrl={this.state.imgBlobUrl} />
              <ControlBox updateSelectedMonth={this.updateSelectedMonth} updateFetchedData={this.updateFetchedData} updateImgBlobUrl={this.updateImgBlobUrl}/>
            </div>
        );
    }
}
