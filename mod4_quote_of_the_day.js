'use strict';
//const fs = require('fs');
let quotes = require('./mod4_quotes_of_the_day.json');

module.exports.quote_of_the_day = function (){
    // retrieve a random number between 0 and the quotes length
    let pos = Math.ceil( Math.random() * quotes.length) - 1; 
    return quotes[pos];
};


