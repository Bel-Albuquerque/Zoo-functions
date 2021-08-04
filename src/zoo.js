const data = require('./data');

const especies = data.species;

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

// tentei usar o find e n consegui, refatorar!!!
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
  // seu código aqui
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
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
