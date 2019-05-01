
    // Imports user module mod4-quote_of_the_day.js
let my_mod = require("./mod4-quote_of_the_day");

let fs = require("fs");   // Imports file system module

console.log();
my_mod.quote_of_the_day();

let delay = ((Math.ceil(Math.random()*5))*1000).toFixed(0);
setTimeout(reflexes, delay);


function reflexes() {

    // ... include code here
};

