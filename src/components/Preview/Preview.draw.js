import { setTimeout } from "timers";

export function draw(ctx, width, height, style, month, data, imgBlob){
    const nbrOfRows = Math.ceil((month.firstDay+month.nbrOfDays)/7);
    
    ctx.restore();    
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
    ctx.textBaseline="hanging";         

    _drawDaysNames(ctx, style.days);
    _drawEventBoxes(ctx, style.eventsBoxes, style.dates, nbrOfRows, month, data)    
    ctx.save();
    _drawImage(ctx, imgBlob, style.image.x, style.image.y, style.image.width, style.image.height, style.image.radius)
    ctx.restore();
    setTimeout(() => {
        _drawText(ctx, month.string, style.title.x, style.title.y, style.title.width, style.title.size + "px", style.title.color, style.title.font, style.title.style, style.title.align);            
    }, 100)
}

function _drawDaysNames(ctx, style) {
    const daysName = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    let posX = style.x;
    
    for(let i = 0; i < daysName.length; i++){
        _drawText(ctx, daysName[i], posX, style.y, style.width, style.size + "px", style.color, style.font, style.style, style.align);                            
        posX += style.offsetX;
    }
}

function _drawEventBoxes(ctx, boxes, dates, nbrOfRows, month, data){
    const boxHeight = boxes.height / nbrOfRows;
    const width = (boxes.width - (boxes.columnsGutter * 6)) / 7;
    const height = (boxes.height - (boxes.rowsGutter * (nbrOfRows-1))) / nbrOfRows;
    let daysCounter = 0, row = 0, posX = boxes.x, posY = boxes.y, dateX = dates.x, dateY = dates.y;
    let firstPreviousDays = month.previousMonthNbrOfDays - month.firstDay;
    
    for(let i = 0, drawed = 1, nextDays = 1; i < nbrOfRows*7; i++){
        
        if(i%7 === 0 && i > 0){
            posY += height + boxes.rowsGutter;
            dateY += height + boxes.rowsGutter;
            posX = boxes.x;
            dateX = dates.x;
        }
                
        _drawRect(ctx, posX, posY, boxes.color, boxes.radius, width, height, false, boxes.borderColor, boxes.borderWeight);

        ctx.textBaseline="hanging";                 
        if(i >= month.firstDay && drawed <= month.nbrOfDays){
            _drawText(ctx, drawed, dateX, dateY, dates.width, dates.size + "px", dates.color, dates.font, dates.style, dates.align);
            drawed++;            
        } else if(i < month.firstDay){
            _drawText(ctx, firstPreviousDays, dateX, dateY, dates.width, dates.size + "px", dates.clearColor, dates.font, dates.style, dates.align);
            firstPreviousDays++;
        } else if(drawed > month.nbrOfDays){
            _drawText(ctx, nextDays, dateX, dateY, dates.width, dates.size + "px", dates.clearColor, dates.font, dates.style, dates.align);            
            nextDays++;
        }

        if(data[i+1] !== undefined){
            const eventWidth = (width / 100) * parseInt(boxes.events.width.substr(0, boxes.events.width.length-1));
            const marginLeft = (width - eventWidth) / 2;
            for(let j = 0, posJ = posY + boxes.events.offsetY; j < data[i+1].length && j < 3; j++){
                _drawRect(ctx, posX + marginLeft, posJ, data[i+1][j].color, boxes.events.radius, eventWidth, boxes.events.height, false, boxes.events.borderColor, boxes.events.borderWeight);
                ctx.textBaseline="middle";
                _drawText(ctx, data[i+1][j].eventText ? data[i+1][j].eventText.substr(0,boxes.events.text.maxChar) : "", posX + marginLeft, (posJ + boxes.events.height/2), eventWidth, boxes.events.text.size + "px", boxes.events.text.color, boxes.events.text.font, boxes.events.text.style, boxes.events.text.align)
                posJ += boxes.events.height + boxes.events.gutter;
              }
        }

        posX += width + boxes.columnsGutter;
        dateX += dates.offsetX;

    }
}

function _drawRect(ctx, posX, posY, color = "#f2c463", radius = 50, width = 300, height = 100, clip = false, borderColor = "#FFFFFF", borderWeight){
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
    if(clip){
        ctx.clip();
    } else {
        ctx.closePath();        
    }
    if(borderWeight > 0){
        ctx.lineWidth = borderWeight;
        ctx.strokeStyle = borderColor;
        ctx.stroke();
    }
    ctx.fillStyle = color;
    ctx.fill();
}

function _drawImage(ctx, imgBlob, x, y, width, height, radius){

    if(imgBlob && imgBlob.url){
        let img = new Image();        
        img.onload = function(){
            const sh = (this.width / width)*height;
            const imgOffsetY = (this.height-sh)/2; // Center image in view zone
            ctx.drawImage(img, 0, imgOffsetY, this.width, sh, x, y, width, height);
        }
        img.src = imgBlob.url;
    }

    if(radius === null || radius > 0) _drawRect(ctx, x, y, undefined, radius, width, height, true);
}

function _drawText(ctx, text, x, y, width, size, color, font, style, align){
    if(align === "center") {
        x += width / 2;
    }
    ctx.fillStyle = color;
    ctx.font = `${style} ${size} ${font}`;
    ctx.textAlign = align;     
    ctx.fillText(text, x, y);
}