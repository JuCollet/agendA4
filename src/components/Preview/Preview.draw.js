export function drawRect(ctx, posX, posY, color = "#f2c463", radius = 50, width = 300, height = 100, clip = false, borderColor = "#FFFFFF", borderWeight){
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

export function drawImage(ctx, imgBlob, x, y, width, height, radius, callback){    
    
    if(radius === null || radius > 0) drawRect(ctx, x, y, undefined, radius, width, height, true);            
    if(!imgBlob || !imgBlob.url) return callback();
    let img = new Image();        
    img.onload = function(){
        const sh = (this.width / width)*height;
        const imgOffsetY = (this.height-sh)/2; // Center image in view zone
        ctx.drawImage(img, 0, imgOffsetY, this.width, sh, x, y, width, height);
        callback();
    }
    img.src = imgBlob.url;
}

export function drawText(ctx, text, x, y, width, size, color, font, style, align, valign = "hanging"){
    if(align === "center") {
        x += width / 2;
    }
    ctx.textBaseline = valign;         
    ctx.fillStyle = color;
    ctx.font = `${style} ${size} ${font}`;
    ctx.textAlign = align;     
    ctx.fillText(text, x, y);
}