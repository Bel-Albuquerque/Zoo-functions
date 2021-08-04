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

function countAnimals(par1 = 0) {
  const objResp = {};
  especies.forEach((obj) => {
    const nome = obj.name;
    const quantidade = obj.residents.length;
    objResp[nome] = quantidade;
  });
  if (par1 !== 0) {
    return objResp[par1];
  }
  return objResp;
}

function calculateEntry(entrants = 0) {
  const adulto = (entrants.Adult) ? entrants.Adult * 49.99 : 0;
  const idoso = (entrants.Senior) ? entrants.Senior * 24.99 : 0;
  const criança = (entrants.Child) ? entrants.Child * 20.99 : 0;

  return (entrants === 0) ? 0 : adulto + idoso + criança;
}

function getAnimalMap(options) {
  // seu código aqui
}
const { hours } = data;

const { Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = hours;

const arrayDestruc = [Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday];

const arrayDiasSemana = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function getSchedule(parametro = 0) {
  const resposta = {};
  arrayDiasSemana.forEach((valor, index) => {
    const temp = Object.values(arrayDestruc[index]);
    if (temp[1] > 12) {
      const temp2 = temp[1];
      temp[1] = 12 - (24 - temp2);
    }
    resposta[valor] = (`Open from ${temp[0]}am until ${temp[1]}pm`);
  });
  resposta.Monday = 'CLOSED';

  if (parametro !== 0) {
    return { [parametro]: resposta[parametro] };
  }
  return resposta;
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
