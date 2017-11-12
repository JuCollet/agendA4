import React, { Component } from "react";
import registerFonts from "./registerFonts"

import bkgImg from "../../assets/img/cal.png";

import PDFDocument from "./pdfkit";
import downloadjs from "downloadjs";
import blobStream from "blob-stream";

import Button from "../../components/Button/Button";
import { posix } from "path";

export default class Print extends Component {

    constructor(props){
        super(props);
        this.buildCalendar = this.buildCalendar.bind(this);
        this.drawDates = this.drawDates.bind(this);
        this.drawEvents = this.drawEvents.bind(this);
        this.drawImages = this.drawImages.bind(this);
    }
    
    buildCalendar(){

        const doc = new PDFDocument({
            size: "A4",
            margin : 0
        });
        
        const stream = doc.pipe(blobStream());
        doc.rect(0, 0, 595, 840).fill('#aeebef');
                
        registerFonts(doc, () => {
            this.drawImages(doc, function(){
                doc.fill('#2E2E2E');
                doc.font('LatoBold', 25).text(this.props.selectedMonth.string, 0, 265, {
                    align : 'center',
                    width : 595.28
                });
                this.drawDates(doc);
                doc.end();
                stream.on('finish', () => {
                    const blob = stream.toBlob('application/pdf');
                    downloadjs(blob, "Mon calendrier", "application/pdf");
                })
            }.bind(this));
        })
    }

    drawDates(doc){
        const offsetX = 76.5, offsetY = 77.8;
        let posX = 43, posY = 363;

        let firstPreviousDays = this.props.selectedMonth.previousMonthNbrOfDays - this.props.selectedMonth.firstDay;

        for(let i = 0, drawed = 1, nextDays = 1; i < 42; i++){
            if(i%7 === 0 && i > 0){
                posX = 43;
                posY += offsetY;
            }

            doc.font('LatoLight', 18);

            if(i >= this.props.selectedMonth.firstDay && drawed <= this.props.selectedMonth.nbrOfDays){ 
                doc.fill('#2e2e2e').text(drawed, posX, posY, {
                    align : 'center',
                    width: 50
                });
                drawed++;
            } else if(i < this.props.selectedMonth.firstDay){
                doc.fill('#dedede').text(firstPreviousDays, posX, posY, {
                    align : 'center',
                    width: 50
                });
                firstPreviousDays++;
            } else if(drawed > this.props.selectedMonth.nbrOfDays){
                doc.fill('#dedede').text(nextDays, posX, posY, {
                    align : 'center',
                    width : 50
                });
                nextDays++;
            }                
            posX+=offsetX;
        }

        this.drawEvents(doc);

    } // End drawDates

    drawEvents(doc){
        const offsetX = 76.75, offsetY = 78.1, offsetYEvents = 2, width = 70, height = 12, radius = 3;
        let posX = 33, posY = 384;
        
        if(!this.props.fetchedData){
            return;
        }

        for(let i = 0; i < 42; i++){
            if(i%7 === 0 && i > 0){
              posX = 33;
              posY += offsetY;
            }
            if(this.props.fetchedData[i+1] !== undefined){
                for(let j = 0, posJ = posY; j < this.props.fetchedData[i+1].length && j < 3; j++){
                    doc.roundedRect(posX, posJ, width, height, radius)
                       .fill(this.props.fetchedData[i+1][j].color);

                    doc.font('LatoLight', 8)
                       .fillColor('#ffffff')                 
                       .text(this.props.fetchedData[i+1][j].eventText.substr(0,13), posX, posJ+1, {
                            align : 'center',
                            width : width
                        });
                        
                    posJ += height+offsetYEvents;
                }
            }
            posX += offsetX;
        }
    }

    drawImages(doc, cb){

        const drawBkgImage = function(){
            doc.image(bkgImg, 0, 0, {width : 595.28});            
        }.bind(this);

        if(this.props.imgBlob && this.props.imgBlob.url){
            const xhr = new XMLHttpRequest();
            xhr.open("GET", this.props.imgBlob.url, true);
            xhr.responseType = "arraybuffer";
            xhr.onload = e => {
                const arraybuffer = xhr.response;
                if(arraybuffer){
                    doc.image(arraybuffer, 0, 0, {
                        width : 580});
                }
                drawBkgImage();
                cb();
            }
            xhr.send();
        } else {
            drawBkgImage();
            cb();
        }
    }
    
    render(){
        return (
            <Button clickHandler={this.buildCalendar} title={"Print !"}/>
        );
    }
    
    
}