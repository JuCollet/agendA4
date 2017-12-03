/*global Image*/

import React, { Component } from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Print from "../../containers/Print/Print";

import "./Preview.anim.less";
import { drawImage, drawText, drawRect } from "./Preview.draw";
import { asyncPipe, Box, objectMap, pipe } from "../../containers/app.utils";

export default class Preview extends Component{
  
  componentDidUpdate(){
    this.drawPreview();
  }

  drawPreview(){

    const { selectedStyle, selectedMonth, fetchedData, imgBlob } = this.props;        
    
    const data = {
      selectedStyle,
      selectedMonth,
      fetchedData,
      imgBlob
    };

    const refactorData = x => {
      const keysToConvert = ['size'];
      const addPxToSizes = size => size + "px";
      return {...x, selectedStyle : objectMap(x.selectedStyle, keysToConvert, addPxToSizes)};
    }

    const addContext = x => {            
      const c = this.c;
      const ctx = c.getContext("2d");
      return {...x, ctx, width : this.c.width, height : this.c.height };
    };

    const resetContext = x => {
      x.ctx.clearRect(0, 0, x.width, x.height);
      x.ctx.fillStyle = "#FFFFFF";
      x.ctx.fillRect(0, 0, x.width, x.height);
      return x;
    };

    const drawHeaderImage = x => {
      return new Promise((resolve, reject) => {
        const { image } = x.selectedStyle;
        x.ctx.save();
        const callback = () => {
          x.ctx.restore();
          resolve(x);
        };
        drawImage(x.ctx, x.imgBlob, image.x, image.y, image.width, image.height, image.radius, callback);
      });
    };

    const drawMonth = x => {
      const { title } = x.selectedStyle;
      drawText(x.ctx, x.selectedMonth.string, title.x, title.y, title.width, title.size, title.color, title.font, title.style, title.align);
      return x;
    };

    const drawDays = x => {
      const daysName = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
      const { days } = x.selectedStyle;
      let posX = days.x;
      for(let i = 0; i < daysName.length; i++){
          drawText(x.ctx, daysName[i], posX, days.y, days.width, days.size, days.color, days.font, days.style, days.align);
          posX += days.offsetX;
      };
      return x;
    };

    const drawEventsBoxes = x => {
      const { eventsBoxes, dates } = x.selectedStyle;
      const nbrOfRows = Math.ceil((x.selectedMonth.firstDay + x.selectedMonth.nbrOfDays)/7);
      const width = (eventsBoxes.width - (eventsBoxes.columnsGutter * 6)) / 7;
      const height = (eventsBoxes.height - (eventsBoxes.rowsGutter * (nbrOfRows-1))) / nbrOfRows;
      let daysCounter = 0, row = 0, posX = eventsBoxes.x, posY = eventsBoxes.y, dateX = dates.x, dateY = dates.y;
      let firstPreviousDays = x.selectedMonth.previousMonthNbrOfDays - x.selectedMonth.firstDay;

      for(let i = 0, drawed = 1, nextDays = 1; i < nbrOfRows*7; i++){
      
          if(i%7 === 0 && i > 0){
              posY += height + eventsBoxes.rowsGutter;
              dateY += height + eventsBoxes.rowsGutter;
              posX = eventsBoxes.x;
              dateX = dates.x;
          };

          drawRect(x.ctx, posX, posY, eventsBoxes.color, eventsBoxes.radius, width, height, false, eventsBoxes.borderColor, eventsBoxes.borderWeight);
               
          if(i >= x.selectedMonth.firstDay && drawed <= x.selectedMonth.nbrOfDays){
            drawText(x.ctx, drawed, dateX, dateY, dates.width, dates.size, dates.color, dates.font, dates.style, dates.align);
            drawed++;            
          } else if(i < x.selectedMonth.firstDay){
            drawText(x.ctx, firstPreviousDays, dateX, dateY, dates.width, dates.size, dates.clearColor, dates.font, dates.style, dates.align);
            firstPreviousDays++;
          } else if(drawed > x.selectedMonth.nbrOfDays){
            drawText(x.ctx, nextDays, dateX, dateY, dates.width, dates.size, dates.clearColor, dates.font, dates.style, dates.align);
            nextDays++;
          };

          if(x.fetchedData[i+1] !== undefined){
              const eventWidth = (width / 100) * parseInt(eventsBoxes.events.width.substr(0, eventsBoxes.events.width.length-1));
              const marginLeft = (width - eventWidth) / 2;
              for(let j = 0, posJ = posY + eventsBoxes.events.offsetY; j < fetchedData[i+1].length && j < 3; j++){
                drawRect(x.ctx, posX + marginLeft, posJ, fetchedData[i+1][j].color, eventsBoxes.events.radius, eventWidth, eventsBoxes.events.height, false);  
                drawText(x.ctx, fetchedData[i+1][j].eventText ? fetchedData[i+1][j].eventText.substr(0, eventsBoxes.events.text.maxChar) : "", posX + marginLeft, posJ + (eventsBoxes.events.height / 2), eventWidth, eventsBoxes.events.text.size, eventsBoxes.events.text.color, eventsBoxes.events.text.font, eventsBoxes.events.text.style, eventsBoxes.events.text.align, eventsBoxes.events.text.valign);
                  posJ += eventsBoxes.events.height + eventsBoxes.events.gutter;
                }
          };
  
          posX += width + eventsBoxes.columnsGutter;
          dateX += dates.offsetX;
      }                
      return x;
    }
    const sync = pipe(refactorData, addContext, resetContext);
    const async = asyncPipe(drawHeaderImage, drawMonth, drawDays, drawEventsBoxes);
    pipe(sync, async)(data);
  };

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