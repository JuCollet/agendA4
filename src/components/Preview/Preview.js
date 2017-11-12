/*global Image*/

import React, { Component } from "react";
import bkgImg from "../../assets/img/calPreview_bkg_420x594.png";

export default class Preview extends Component{
  
  constructor(props){
    super(props);
    this.drawDates = this.drawDates.bind(this);
    this.drawPreview = this.drawPreview.bind(this);
    this.drawImage = this.drawImage.bind(this);
  }
  
  componentDidMount(){
    this.drawPreview();
  }

  shouldComponentUpdate(nextprops){

    if((nextprops.imgBlob && !this.props.imgBlob) ||
        ((nextprops.imgBlob && this.props.imgBlob) && 
        (nextprops.imgBlob.url !== this.props.imgBlob.url))){
      return true;
    }

    if(nextprops.selectedMonth !== this.props.selectedMonth ||
       nextprops.fetchedData !== this.props.fetchedData){
      return true;
    } else {
      return false;
    }
    
  }
  
  componentDidUpdate(){
    this.drawPreview();
    this.drawImage();
  }
  
  drawPreview(){
    const c = this.c;
    const ctx = c.getContext("2d");
    
    var imageObj = new Image();
    imageObj.onload = function() {
      ctx.drawImage(imageObj, 0, 0);
    };
    imageObj.src = bkgImg;
    this.drawDates();
  }

  drawDates(){
    const c = this.c;
    const offsetX = 54;
    const offsetY = 54;
    let posX = 49;
    let posY = 263;
    
    var ctx = c.getContext("2d");
    
    if(!ctx)return;
    
    ctx.clearRect(0, 0, this.c.width, this.c.height);
    ctx.fillStyle = "#F7F7F7";
    ctx.fillRect(0, 0, this.c.width, this.c.height);

    ctx.fillStyle = "#2e2e2e";
    ctx.font="bold 16px Lato";
    ctx.textAlign = "center";     
    ctx.fillText(this.props.selectedMonth.string,210,200);
        
    let firstPreviousDays = this.props.selectedMonth.previousMonthNbrOfDays - this.props.selectedMonth.firstDay;
    
    for(let i = 0, drawed = 1, nextDays = 1; i < 42; i++){
      if(i%7 === 0 && i > 0){
        posX = 49;
        posY += offsetY;
      }
      if(i >= this.props.selectedMonth.firstDay && drawed <= this.props.selectedMonth.nbrOfDays){
        ctx.fillStyle = "#777777";
        ctx.font="12px Lato";
        ctx.textAlign = "center";     
        ctx.fillText(drawed,posX,posY);
        drawed++;
      } else if(i < this.props.selectedMonth.firstDay){
        ctx.fillStyle = "#dedede";
        ctx.font="12px Lato";
        ctx.textAlign = "center";     
        ctx.fillText(firstPreviousDays,posX,posY);
        firstPreviousDays++;
      } else if(drawed > this.props.selectedMonth.nbrOfDays){
        ctx.fillStyle = "#dedede";
        ctx.font="12px Lato";
        ctx.textAlign = "center";     
        ctx.fillText(nextDays,posX,posY);
        nextDays++;
      }
      posX += offsetX;
    }
    
    this.drawEvents();
    
  }
  
  drawRoundedEventsRect(posX, posY, color = '#f2c463', text = '', radius = 4, width = 50, height = 7){
    const c = this.c;
    var ctx = c.getContext("2d");
    
    ctx.beginPath();
    ctx.moveTo(posX+(radius/2), posY);
    ctx.lineTo(posX+width-(radius/2), posY);
    ctx.quadraticCurveTo(posX+width,posY,posX+width,posY+(radius/2));
    ctx.lineTo(posX+width, posY+height-(radius/2));
    ctx.quadraticCurveTo(posX+width,posY+height,posX+width-(radius/2),posY+height);
    ctx.lineTo(posX+(radius/2), posY+height);
    ctx.quadraticCurveTo(posX,posY+height,posX,posY+height-(radius/2));
    ctx.lineTo(posX, posY+(radius/2));
    ctx.quadraticCurveTo(posX,posY,posX+(radius/2),posY);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    
    ctx.fillStyle = "white";
    ctx.font="6px Lato";
    ctx.textAlign = "center";     
    ctx.fillText(text,posX+(width/2),posY+(height/2)+1);
  }
  
  drawEvents(){
    const offsetX = 54;
    const offsetY = 54;
    const offsetYEvents = 2;
    const width = 50;
    const height = 7;
    const radius = 4;
    let posX = 23;
    let posY = 271;    
    
    if(!this.props.fetchedData){
      return;
    }
    
    for(let i = 0; i < 42; i++){
      if(i%7 === 0 && i > 0){
        posX = 23;
        posY += offsetY;
      }      
      if(this.props.fetchedData[i+1] !== undefined){
        for(let j = 0, posJ = posY; j < this.props.fetchedData[i+1].length && j < 3; j++){
          this.drawRoundedEventsRect(posX, posJ, this.props.fetchedData[i+1][j].color, this.props.fetchedData[i+1][j].eventText.substr(0, 13), radius, width, height);
          posJ += height+offsetYEvents;
        }
      }
      posX += offsetX;
    }

  }
  
  drawImage(){

    if(this.props.imgBlob.url){
      const c = this.c;
      const offsetX = 20,
            offsetY = 20,
            width = 380,
            height = 150;
      var ctx = c.getContext("2d");

      if(!ctx)return;
      
      let img = new Image();
      img.onload = function(){
        const sh = (this.width / width)*height;
        const imgOffsetY = (this.height-sh)/2; // Center image in view zone
        ctx.drawImage(img, 0, imgOffsetY, this.width, sh, offsetX, offsetY, width, height);
      }
      img.src = this.props.imgBlob.url;
    }
  }
  
  render(){
    return (
      <div className="Preview">
        <canvas width="420" height="598" ref={el=>this.c = el}></canvas>
      </div>
    );    
  }
}