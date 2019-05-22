
const Sequelize = require('sequelize');

const {log, biglog, errorlog, colorize} = require("./out");

const {models} = require('./model');

const validateId = id =>{
    return new Promise((resolve, reject)=>{

        if(typeof id === "undefined")
            return reject('falta el parametro {id}')

            id = parseInt(id);

            if(Number.isNaN(id))
                return reject('El valor del parametro id no es un numero.')
            
            resolve(id);
    });
}

/**
 * Muestra la ayuda.
 *
 * @param rl Objeto readline usado para implementar el CLI.
 */
exports.helpCmd = rl => {
    log("Commandos:");
    log("  h|help - Muestra esta ayuda.");
    log("  list - Listar los quizzes existentes.");
    log("  show <id> - Muestra la pregunta y la respuesta el quiz indicado.");
    log("  add - Añadir un nuevo quiz interactivamente.");
    log("  delete <id> - Borrar el quiz indicado.");
    log("  edit <id> - Editar el quiz indicado.");
    log("  test <id> - Probar el quiz indicado.");
    log("  p|play - Jugar a preguntar aleatoriamente todos los quizzes.");
    log("  credits - Créditos.");
    log("  q|quit - Salir del programa.");
    rl.prompt();
};


/**
 * Lista todos los quizzes existentes en el modelo.
 *
 * @param rl Objeto readline usado para implementar el CLI.
 */
exports.listCmd = rl => {
    
    models.quiz.findAll()
    .each(quiz=>log(`[${colorize(quiz.id,'magenta')}]: ${quiz.question}`))
    .catch(err=> error.log(err.message))
    .then(()=>rl.prompt())
};


/**
 * Muestra el quiz indicado en el parámetro: la pregunta y la respuesta.
 *
 * @param rl Objeto readline usado para implementar el CLI.
 * @param id Clave del quiz a mostrar.
 */
exports.showCmd = (rl, id) => {
    
    validateId(id)
    .then(id => models.quiz.findById(id))
    .then(quiz =>{
        if(!quiz)
            reject(`No existe un quiz asociado al id: ${id}`);
        
        log(`${colorize(quiz.question,'magenta')} => ${quiz.answer}`)
    })
    .catch(err => console.log(err))
    .then(() => rl.prompt)
};


const makeQuestion = (rl, text)=>{
    return new Sequelize.Promise((resolve, reject)=>{
        rl.question(colorize(text, 'red'), answer => {
            resolve(answer.trim())
        });
    });
}
/**
 * Añade un nuevo quiz al módelo.
 * Pregunta interactivamente por la pregunta y por la respuesta.
 *
 * Hay que recordar que el funcionamiento de la funcion rl.question es asíncrono.
 * El prompt hay que sacarlo cuando ya se ha terminado la interacción con el usuario,
 * es decir, la llamada a rl.prompt() se debe hacer en la callback de la segunda
 * llamada a rl.question.
 *
 * @param rl Objeto readline usado para implementar el CLI.
 */
exports.addCmd = rl => {
    makeQuestion(rl, 'Introduzca una pregunta: ')
    .then(question => {
        return makeQuestion(rl, 'Introduzca una respuesta: ')
        .then(answer =>{
            return {question, answer}
        });
    })
    .then(quiz =>{
        return models.quiz.create(quiz);
    })
    .then(quiz=>{
        log(`se ha añadido: ${colorize(quiz.question,'magenta')} => ${quiz.answer}`)
    })
    .catch(Sequelize.ValidationError, error =>{
        errorlog('quiz erroneo');
        error.errors.forEach(({msg})=>errorlog(msg))
    })
    .then(()=>{
        rl.prompt();
    })
    
};


/**
 * Borra un quiz del modelo.
 *
 * @param rl Objeto readline usado para implementar el CLI.
 * @param id Clave del quiz a borrar en el modelo.
 */
exports.deleteCmd = (rl, id) => {
    
    validateId(id)
    .then(id => models.quiz.destroy({where:{id}}))
    .catch(err => console.log(err))
    .then(() => rl.prompt)

};


/**
 * Edita un quiz del modelo.
 *
 * Hay que recordar que el funcionamiento de la funcion rl.question es asíncrono.
 * El prompt hay que sacarlo cuando ya se ha terminado la interacción con el usuario,
 * es decir, la llamada a rl.prompt() se debe hacer en la callback de la segunda
 * llamada a rl.question.
 *
 * @param rl Objeto readline usado para implementar el CLI.
 * @param id Clave del quiz a editar en el modelo.
 */
exports.editCmd = (rl, id) => {
    if (typeof id === "undefined") {
        errorlog(`Falta el parámetro id.`);
        rl.prompt();
    } else {
        try {
            const quiz = model.getByIndex(id);

            process.stdout.isTTY && setTimeout(() => {rl.write(quiz.question)},0);

            rl.question(colorize(' Introduzca una pregunta: ', 'red'), question => {

                process.stdout.isTTY && setTimeout(() => {rl.write(quiz.answer)},0);

                rl.question(colorize(' Introduzca la respuesta ', 'red'), answer => {
                    model.update(id, question, answer);
                    log(` Se ha cambiado el quiz ${colorize(id, 'magenta')} por: ${question} ${colorize('=>', 'magenta')} ${answer}`);
                    rl.prompt();
                });
            });
        } catch (error) {
            errorlog(error.message);
            rl.prompt();
        }
    }
};


/**
 * Prueba un quiz, es decir, hace una pregunta del modelo a la que debemos contestar.
 *
 * @param rl Objeto readline usado para implementar el CLI.
 * @param id Clave del quiz a probar.
 */
exports.testCmd = (rl, id) => {
    log('Probar el quiz indicado.', 'red');
    rl.prompt();
};


/**
 * Pregunta todos los quizzes existentes en el modelo en orden aleatorio.
 * Se gana si se contesta a todos satisfactoriamente.
 *
 * @param rl Objeto readline usado para implementar el CLI.
 */
exports.playCmd = rl => {
    log('Jugar.', 'red');
    rl.prompt();
};


/**
 * Muestra los nombres de los autores de la práctica.
 *
 * @param rl Objeto readline usado para implementar el CLI.
 */
exports.creditsCmd = rl => {
    log('Autores de la práctica:');
    log('Nombre 1', 'green');
    log('Nombre 2', 'green');
    rl.prompt();
};


/**
 * Terminar el programa.
 *
 * @param rl Objeto readline usado para implementar el CLI.
 */
exports.quitCmd = rl => {
    rl.close();
};

