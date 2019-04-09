
function greeting(){
	let hora =new Date().getHours();
	var saludo = `Good Morning it's ${hora} o'clock` ;	
	
	if(hora >=13 && hora <22 )
		saludo = `Good Afternoon it's ${hora} o'clock` ;
	else if(hora > 22 || 6 > hora)
		saludo = `Good Night it's ${hora} o'clock` ;
	return saludo;
}

function printNumberCasted(n, filter){
	
	if (! filter )
		return console.log(`${n} =>	dec = ${n}	hex = ${n.toString(16)}	oct = ${n.toString(8)}	bin = ${n.toString(2)}`);

	if(filter ==='odd')
		if(n % 2 === 1 )
			return console.log(`${n} =>	dec = ${n}	hex = ${n.toString(16)}	oct = ${n.toString(8)}	bin = ${n.toString(2)}`);
	
	if(filter ==='even')
		if(n % 2 === 0 )
			return console.log(`${n} =>	dec = ${n}	hex = ${n.toString(16)}	oct = ${n.toString(8)}	bin = ${n.toString(2)}`);
}

/*Main*/
// puntos 1 y 2
console.log();
var saludo = greeting();
console.log(saludo);

//puntos 3 y 4
console.log();
const PI = Math.PI.toFixed(6);
console.log(`Number PI with 6 decimals: ${PI}`);

// puntos 5 y 6
console.log();
for (let i = 0; i < 23; i++) {
	printNumberCasted(i);	
}

//puntos 7 y 8
console.log();
for (let i = 0; i < 10; i++) {
	printNumberCasted(i, 'odd');	
}
printNumberCasted(21, 'odd');

//puntos 9 y 10
console.log();
console.log(`Hi in Chinese is written as:\u55e8\uff0c\u4f60\u597d\u5417`);

//puntos 11 y 12
console.log();
console.log("The program has finished");