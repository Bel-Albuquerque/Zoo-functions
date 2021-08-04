const data = require('./data');

const especies = data.species;
const { employees } = data;

function getSpeciesByIds(...ids) {
  const array = [];
  ids.forEach((umId) => {
    especies.forEach((objeto) => {
      if (objeto.id === umId) {
        array.push(objeto);
      }
    });
  });
  return array;
}

function getAnimalsOlderThan(animal, age) {
  let residentes;
  especies.forEach((objeto) => {
    if (objeto.name === animal) {
      residentes = objeto.residents;
    }
  });
  return residentes.every((cadaResidente) => cadaResidente.age >= age);
}

function getEmployeeByName(employeeName) {
  let objetoResposta = {};
  employees.forEach((objeto) => {
    if (objeto.firstName === employeeName || objeto.lastName === employeeName) {
      objetoResposta = objeto;
    }
  });
  return objetoResposta;
}

function createEmployee(personalInfo, associatedWith) {
  const objeto = Object.assign(personalInfo, associatedWith);
  return objeto;
}

function isManager(id) {
  let pessoa = false;
  employees.forEach((objeto) => {
    objeto.managers.forEach((manager) => {
      if (manager === id) {
        pessoa = true;
      }
    });
  });
  return pessoa;
}

function addEmployee(id, firstName, lastName, managers = 0, respFor = 0) {
  const obj = {
    id,
    firstName,
    lastName,
  };
  obj.managers = (managers === 0) ? obj.managers = [] : obj.managers = managers;
  obj.responsibleFor = (respFor === 0) ? obj.responsibleFor = [] : obj.responsibleFor = respFor;
  employees.push(obj);
}

function countAnimals(species) {
  // seu código aqui
}

function calculateEntry(entrants) {
  // seu código aqui
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
