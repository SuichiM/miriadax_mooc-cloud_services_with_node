const stockClosure = require('./mod3_stock_obj_closure');
const stockClass = require('./mod3_stock_obj_class_es6');


/* STOCK implemented with closures*/
//let my_shop_cl = stockClosure.stock("My shop closure"); 

/* STOCK implemented with ES6 classes*/
let my_shop_cl = new stockClass("My shop class");

/* MAIN*/
console.log(); 

/* creting forks*/
my_shop_cl.new_p('a1', 'fork'); 
my_shop_cl.add('a1', 3); 
console.log("-> my_shop.new_p('a1', 'fork')"); 
console.log("-> my_shop.add('a1', 3)"); 


/* creating spoons*/
my_shop_cl.new_p('a4', 'spoon'); 
my_shop_cl.add('a4', 7); 
console.log("-> my_shop.new_p('a4', 'spoon')"); 
console.log("-> my_shop.add('a4', 7)"); 

/* consulting*/
console.log(); 
console.log("There are " + my_shop_cl.number() + " prods"); 
console.log(); 
console.log("_stock= " + my_shop_cl.getJSON()); 
console.log(); 
console.log();

/* creating from file*/
console.log(`-> my_shop.addJSON({ "a1":{"n":2}, "a2":{"code":"a2", "desc":"knife", "n": 3}, "zz":{"desc": "pears", "n": 99 }}`); 
my_shop_cl.addJSON('{ "a1":{"n":2}, "a2":{"code":"a2", "desc":"knife", "n": 3}, "zz":{"desc": "pears", "n": 99 }}'); 
console.log(); 

console.log("_stock= " + my_shop_cl.getJSON(true)); 
console.log(); 

console.log(); 
console.log("-> my_shop.rem('a1', 4)");
my_shop_cl.rem('a1', 4); 
console.log(my_shop_cl.get_p('a1'));

console.log();
console.log(`getting inexistent product => ${my_shop_cl.get_p('zzasssqw')} `);

console.log(); 
console.log(`del producto "a1" => ${my_shop_cl.del_p('a1')} `);
; 