/*global Image*/

import React, { Component } from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Print from "../../containers/Print/Print";

import "./Preview.anim.less";
import { draw } from "./Preview.draw";

export default class Preview extends Component{
    
  componentDidUpdate(){
    const c = this.c;
    const ctx = c.getContext("2d");
    const { selectedStyle, selectedMonth, fetchedData, imgBlob } = this.props;
    draw(ctx, this.c.width, this.c.height, selectedStyle, selectedMonth, fetchedData, imgBlob);   
  }

  render(){

    const { selectedStyle, selectedMonth, fetchedData, imgBlob } = this.props;    

    return (
      <ReactCSSTransitionGroup
      component="div"
      className="reactCSSTransitionGroupDiv"
      transitionAppear={true}
      transitionAppearTimeout={250}                
      transitionEnterTimeout={250}
      transitionLeaveTimeout={250}
      transitionName="SlideRight">
        <div className="preview">
          <canvas className="preview-canvas" width={this.props.selectedStyle.format.width} height={this.props.selectedStyle.format.height} ref={el=>this.c = el}></canvas>
          <Print 
            selectedStyle={selectedStyle}
            selectedMonth={selectedMonth}
            fetchedData={fetchedData}
            imgBlob={imgBlob}
          />
        </div>
      </ReactCSSTransitionGroup>
    );    
  }
}