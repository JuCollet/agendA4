// Based on Hackages HackJam course. ^^

const asyncPipe = (...fn) => fn.reduce((f,g) => x => f(x).then(x => g(x)));

const Box = x => ({
    map : f => Box(f(x)),
    fold : f => f(x)
});

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
    objectMap, 
    pipe
}