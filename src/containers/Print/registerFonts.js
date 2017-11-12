import LatoBold from "../../assets/fonts/Lato-Bold.ttf";
import LatoRegular from "../../assets/fonts/Lato-Regular.ttf";
import LatoLight from "../../assets/fonts/Lato-Light.ttf";

const fonts = [{ name : 'LatoBold', file : LatoBold}, { name : 'LatoLight', file : LatoLight }, { name : 'LatoRegular', file : LatoRegular}];
let registered = 0;

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