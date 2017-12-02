import LatoBold from "../../assets/fonts/Lato-Bold.ttf";
import LatoRegular from "../../assets/fonts/Lato-Regular.ttf";
import LatoLight from "../../assets/fonts/Lato-Light.ttf";

const fonts = [{ name : 'Latobold', file : LatoBold}, { name : 'Latolight', file : LatoLight }, { name : 'Lato', file : LatoRegular}];
let registered = 0;

const registerFont = x => {
    let registered = 0;    
    return new Promise((resolve, reject) => {
        for(let i = 0; i < x.fonts.length; i++){
            const xhr = new XMLHttpRequest();
            xhr.open("GET", x.fonts[i].file, true);
            xhr.responseType = "arraybuffer";
            xhr.onload = e => {
                const arraybuffer = xhr.response;
                if(arraybuffer){
                    x.doc.registerFont(x.fonts[i].name, arraybuffer);
                    registered++;
                }
                if(registered === fonts.length){
                    resolve(x);
                    registered = 0;
                }
            }
            xhr.send();
        }
    })
}

export default function(doc, cb){
    for(let i = 0; i < fonts.length; i++){
        const xhr = new XMLHttpRequest();
        xhr.open("GET", fonts[i].file, true);
        xhr.responseType = "arraybuffer";
        xhr.onload = e => {
            const arraybuffer = xhr.response;
            if(arraybuffer){
                doc.registerFont(fonts[i].name, arraybuffer);
                registered++;
            }
            if(registered === fonts.length){
                cb();
                registered = 0;
            }
        }
        xhr.send();
    }
}