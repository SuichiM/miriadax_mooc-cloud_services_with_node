// Type your code here

let [nodeRoute, fileRoute, ...params] = process.argv;

// main
console.log();
console.log(`Route to Node.JS: ${nodeRoute}`);
console.log(`Route to this file: ${fileRoute}`);

//console.log(params);
let excludeList = params.reduce((acc, el, idx, arr) => (el === '-r')? acc.concat(arr[idx+1]):acc, []);

let filtrados = params.filter((el, idx, arr) => {
    return el !== '-r' && excludeList.every(val => val !== el ) 
});

filtrados.sort().reduce(
    (acc, elem, idx, arr)  => { 
        if((elem !== arr[idx-1] && idx > 0) || idx === arr.length-1 ){
            if( idx === arr.length-1) acc+=1;
            console.log(`${arr[idx - 1]}: ${acc}`);
            acc = 1;
        }else{
            acc++;
        }
        return acc;    
    }, 0);