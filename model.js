
Sequelize = require('sequelize');

const options = { logging: false, operatorsAliases: false};
const sequelize = new Sequelize("sqlite:db.sqlite", options);

sequelize.define(
  'quiz', 
  { question: { 
      type: Sequelize.STRING,
      unique: { msg: "The question already exists"},
      validate: {  notEmpty:{msg:'La pregunta no puede estar vacia.'} }
    },
    answer: {
      type: Sequelize.STRING,
      validate: {  notEmpty:{msg:'La respuesta no puede estar vacia.'} }
    }
  }
);

sequelize.sync()
.then(() => sequelize.models.quiz.count())
.then((count) => {
  if (count===0) {
    
    return sequelize.models.quiz.bulkCreate([
      { question: 'Capital Espana',     answer: 'Madrid'},
      { question: 'Capital Francia',    answer: 'Paris'},
      { question: 'Capital Rusia',      answer: 'Moscu'}
    ])

  } else {
    console.log(`  DB exists & has ${count} elems`);
  }
})
.catch( err => console.log(`${err}`));


module.exports = sequelize;

