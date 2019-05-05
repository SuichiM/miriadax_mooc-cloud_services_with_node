
// Imports user module mod4-quote_of_the_day.js
let my_mod = require("./mod4_quote_of_the_day");

let fs = require("fs");   // Imports file system module

console.log();
console.log(`quote_of_the_day`);
let today_quote = my_mod.quote_of_the_day();
console.log(today_quote);

let delay = ((Math.ceil(Math.random()*5))*1000).toFixed(0);
setTimeout(reflexes, delay);

function reflexes() {
    // ... include code here
    new Promise((resolve, reject) => {
        console.log("\nPress return:");
      
        let start = new Date().getTime();
      
        process.stdin.setEncoding('utf8');
        process.stdin.once('data', function(line) {
          let time = new Date().getTime() - start;
          console.log(`Your time: ${time} ms`);
          resolve();
        })
      })
      .then( () => process.exit());

};