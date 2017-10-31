import React, { Component } from "react";

export default class Preview extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      pdf : ''
    };
  }
  
  render(){
    return (
      <div className="Preview">
        <canvas width="420" height="598"></canvas>
      </div>
    );    
  }
}