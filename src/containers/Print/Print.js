import React, { Component } from "react";

import PDFDocument from "./pdfkit";
import downloadjs from "downloadjs";
import blobStream from "blob-stream";

import { asyncPipe, Box, objectMap, pipe } from "../app.utils";

export default class Print extends Component {

    constructor(props){
        super(props);
        this.buildCalendar = this.buildCalendar.bind(this);
        this.drawText = this.drawText.bind(this);
    }
    
    buildCalendar(){

        const { selectedStyle, selectedMonth, fetchedData, imgBlob } = this.props;        
        
        const data = {
            selectedStyle,
            selectedMonth,
            fetchedData,
            imgBlob
        }

        const resizeDataElements = x => {
            const keysToConvert = ['x', 'y', 'size', 'offsetX', 'offsetY', 'width', 'height', 'columnsGutter', 'rowsGutter', 'gutter', 'borderWeight', 'radius'];            
            const convertToA4 = size =>
                Box(size)
                    .map(i => i/10.16) // 4 inches
                    .map(i => i*720) // 10 x 72dpi
                    .map(i => Math.round(i))
                    .fold(i => i / 100)
            return {
                ...x,
                selectedStyle : objectMap(x.selectedStyle, keysToConvert, convertToA4)
            }
        };

        const addDocAndStream = x => {            
            const doc = new PDFDocument({size: [x.selectedStyle.format.width, x.selectedStyle.format.height], margin : 0});
            const stream = doc.pipe(blobStream());
            return {...x, doc, stream}
        };

        const registerFonts = x => {
            let registered = 0;    
            return new Promise((resolve, reject) => {
                for(let i = 0; i < x.selectedStyle.fonts.length; i++){
                    const xhr = new XMLHttpRequest();
                    xhr.open("GET", x.selectedStyle.fonts[i].file, true);
                    xhr.responseType = "arraybuffer";
                    xhr.onload = e => {
                        const arraybuffer = xhr.response;
                        if(arraybuffer){
                            x.doc.registerFont(x.selectedStyle.fonts[i].name, arraybuffer);
                            registered++;
                        }
                        if(registered === x.selectedStyle.fonts.length){
                            resolve(x);
                            registered = 0;
                        }
                    }
                    xhr.send();
                }
            });
        };

        const drawImages = x => {
            return new Promise((resolve, reject) => {
                if(x.imgBlob && x.imgBlob.url){
                    const xhr = new XMLHttpRequest();
                    xhr.open("GET", x.imgBlob.url, true);
                    xhr.responseType = "arraybuffer";
                    xhr.onload = e => {
                        const arraybuffer = xhr.response;
                        if(arraybuffer){
                            let img = new Image();
                            img.onload = function(){
                                const ratioHeight = (x.selectedStyle.image.width / this.width) * this.height;
                                const imgOffsetY = (ratioHeight - x.selectedStyle.image.height) / 2;
                                x.doc.save();
                                x.doc.roundedRect(x.selectedStyle.image.x, x.selectedStyle.image.y, x.selectedStyle.image.width, x.selectedStyle.image.height, x.selectedStyle.image.radius)
                                     .clip()
                                x.doc.image(arraybuffer, x.selectedStyle.image.x, x.selectedStyle.image.y - imgOffsetY, {width : x.selectedStyle.image.width});
                                x.doc.restore();
                                resolve(x);
                            }
                            img.src = x.imgBlob.url;
                        }
                    }
                    xhr.send();
                } else {
                    resolve(x);
                }
            });
        };

        const drawMonth = x => {
            this.drawText(x.doc, x.selectedMonth.string, x.selectedStyle.title.x, x.selectedStyle.title.y, x.selectedStyle.title.width, x.selectedStyle.title.size, x.selectedStyle.title.color, x.selectedStyle.title.font, x.selectedStyle.title.style, x.selectedStyle.title.align);            
            return x;
        }

        const drawDays = x => {
            const daysName = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
            let posX = x.selectedStyle.days.x;
            for(let i = 0; i < daysName.length; i++){
                this.drawText(x.doc, daysName[i], posX, x.selectedStyle.days.y, x.selectedStyle.days.width, x.selectedStyle.days.size, x.selectedStyle.days.color, x.selectedStyle.days.font, x.selectedStyle.days.style, x.selectedStyle.days.align);                            
                posX += x.selectedStyle.days.offsetX;
            }
            return x;
        }

        const drawEventsBoxes = x => {
            const nbrOfRows = Math.ceil((x.selectedMonth.firstDay + x.selectedMonth.nbrOfDays)/7);
            const width = (x.selectedStyle.eventsBoxes.width - (x.selectedStyle.eventsBoxes.columnsGutter * 6)) / 7;
            const height = (x.selectedStyle.eventsBoxes.height - (x.selectedStyle.eventsBoxes.rowsGutter * (nbrOfRows-1))) / nbrOfRows;
            let daysCounter = 0, row = 0, posX = x.selectedStyle.eventsBoxes.x, posY = x.selectedStyle.eventsBoxes.y, dateX = x.selectedStyle.dates.x, dateY = x.selectedStyle.dates.y;
            let firstPreviousDays = x.selectedMonth.previousMonthNbrOfDays - x.selectedMonth.firstDay;

            for(let i = 0, drawed = 1, nextDays = 1; i < nbrOfRows*7; i++){
            
                if(i%7 === 0 && i > 0){
                    posY += height + x.selectedStyle.eventsBoxes.rowsGutter;
                    dateY += height + x.selectedStyle.eventsBoxes.rowsGutter;
                    posX = x.selectedStyle.eventsBoxes.x;
                    dateX = x.selectedStyle.dates.x;
                }

                x.doc.roundedRect(posX, posY, width, height, x.selectedStyle.eventsBoxes.radius)
                     .lineWidth(x.selectedStyle.eventsBoxes.borderWeight)
                     .fillAndStroke(x.selectedStyle.eventsBoxes.color, x.selectedStyle.eventsBoxes.borderColor)
                     
                if(i >= x.selectedMonth.firstDay && drawed <= x.selectedMonth.nbrOfDays){
                    this.drawText(x.doc, drawed, dateX, dateY, x.selectedStyle.dates.width, x.selectedStyle.dates.size, x.selectedStyle.dates.color, x.selectedStyle.dates.font, x.selectedStyle.dates.style, x.selectedStyle.dates.align);
                    drawed++;            
                } else if(i < x.selectedMonth.firstDay){
                    this.drawText(x.doc, firstPreviousDays, dateX, dateY, x.selectedStyle.dates.width, x.selectedStyle.dates.size, x.selectedStyle.dates.clearColor, x.selectedStyle.dates.font, x.selectedStyle.dates.style, x.selectedStyle.dates.align);                    
                    firstPreviousDays++;
                } else if(drawed > x.selectedMonth.nbrOfDays){
                    this.drawText(x.doc, nextDays, dateX, dateY, x.selectedStyle.dates.width, x.selectedStyle.dates.size, x.selectedStyle.dates.clearColor, x.selectedStyle.dates.font, x.selectedStyle.dates.style, x.selectedStyle.dates.align);                    
                    nextDays++;
                }

                if(x.fetchedData[i+1] !== undefined){
                    const eventWidth = (width / 100) * parseInt(x.selectedStyle.eventsBoxes.events.width.substr(0, x.selectedStyle.eventsBoxes.events.width.length-1));
                    const marginLeft = (width - eventWidth) / 2;
                    for(let j = 0, posJ = posY + x.selectedStyle.eventsBoxes.events.offsetY; j < fetchedData[i+1].length && j < 3; j++){
                        x.doc.roundedRect(posX + marginLeft, posJ, eventWidth, x.selectedStyle.eventsBoxes.events.height, x.selectedStyle.eventsBoxes.events.radius)
                             .fill(fetchedData[i+1][j].color)
                        this.drawText(x.doc, fetchedData[i+1][j].eventText ? fetchedData[i+1][j].eventText.substr(0,x.selectedStyle.eventsBoxes.events.text.maxChar) : "", posX + marginLeft, posJ + x.selectedStyle.eventsBoxes.events.text.offsetY, eventWidth, x.selectedStyle.eventsBoxes.events.text.size, x.selectedStyle.eventsBoxes.events.text.color, x.selectedStyle.eventsBoxes.events.text.font, x.selectedStyle.eventsBoxes.events.text.style, x.selectedStyle.eventsBoxes.events.text.align);
                        posJ += x.selectedStyle.eventsBoxes.events.height + x.selectedStyle.eventsBoxes.events.gutter;
                      }
                }                
        
                posX += width + x.selectedStyle.eventsBoxes.columnsGutter;
                dateX += x.selectedStyle.dates.offsetX;
            }                
            return x;
        }

        const download = x => {
            x.doc.end();
            x.stream.on('finish', () => {
                const blob = x.stream.toBlob('application/pdf');
                downloadjs(blob, "Mon calendrier", "application/pdf");
            });
        };

        const sync = pipe(resizeDataElements, addDocAndStream);
        const async = asyncPipe(registerFonts, drawImages, drawMonth, drawDays, drawEventsBoxes, download);
        pipe(sync, async)(data);
    }

    drawText(doc, text, x, y, width, size, color, font, style, align){
        doc.fontSize(size)
           .font(font+style)
           .fillColor(color)
           .text(text, x, y, {align, width});
    }
    
    render(){
        return (
            <div className="preview-btn" onClick={() => this.buildCalendar()}>Télécharger</div>
        );
    };
};