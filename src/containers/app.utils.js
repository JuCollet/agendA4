// FP concepts learned thanks to an Hackages HackJam Meetup.

const asyncPipe = (...fn) => fn.reduce((f,g) => x => f(x).then(x => g(x)));

const Box = x => ({
    map : f => Box(f(x)),
    fold : f => f(x)
});

const fetch = (url, cb) => {
    try {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.onload = function(){
        if(xhr.status === 200){
            cb({url : URL.createObjectURL(xhr.response)});
        }
        }
        xhr.send();
    } catch(err) {
        console.log(err);
    }
};

const objectMap = (obj, filter, fn) => {
    let newObject = {};
    for(let key in obj){
        if(Object.prototype.toString.call(obj[key]) == "[object Object]"){
            newObject = {...newObject, [key] : objectMap(obj[key], filter, fn)};
        } else {
            let newValue = null;
            if(filter.indexOf(key) !== -1){
                newValue = fn(obj[key]);
            }
            newObject = {...newObject, [key] : newValue ? newValue : obj[key]};
        }
    }
    return newObject;
}

const pipe = (...fn) => fn.reduce((f,g) => x => g(f(x)));

export {
    asyncPipe, 
    Box, 
    fetch,
    objectMap, 
    pipe
}