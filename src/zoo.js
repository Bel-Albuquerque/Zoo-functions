const { prices } = require('./data');
const data = require('./data');

const especies = data.species;
const { employees } = data;

// -----requisito1--------

function getSpeciesByIds(...ids) {
  return especies.filter((objeto) => ids.includes(objeto.id));
}

// -----requisito2--------

function getAnimalsOlderThan(animal, age) {
  const obj = especies.find((objeto) => objeto.name === animal);
  return obj.residents.every((cadaResidente) => cadaResidente.age >= age);
}

// -----requisito3--------

function getEmployeeByName(employeeName = 0) {
  const resp = employees.find((o) => o.firstName === employeeName || o.lastName === employeeName);
  return (employeeName === 0) ? {} : resp;
}

// -----requisito4--------

function createEmployee(personalInfo, associatedWith) {
  const objeto = Object.assign(personalInfo, associatedWith);
  return objeto;
}

// -----requisito5--------

function isManager(id) {
  return employees.some((objeto) => objeto.managers.includes(id));
}

// -----requisito6--------

function addEmployee(id, firstName, lastName, manager = [], responsFor = []) {
  const obj = {
    id,
    firstName,
    lastName,
    managers: manager,
    responsibleFor: responsFor,
  };
  return employees.push(obj);
}
// -----requisito7--------

function countAnimals(par1 = 0) {
  const resp = {};
  especies.forEach((obj) => {
    resp[obj.name] = obj.residents.length;
  });
  return (par1 !== 0) ? resp[par1] : resp;
}

// -----requisito8--------

function calculateEntry({ Adult = 0, Senior = 0, Child = 0 } = 0) {
  return Adult * 49.99 + Senior * 24.99 + Child * 20.99;
}

// -----requisito9--------

const superObjeto = {};

const sexTrue = (acumuladorDeAnimais, animal, sex) => {
  if (animal.sex === sex) {
    return acumuladorDeAnimais.push(animal.name);
  }
};

const concatNames = (acumuladorEspecie, especie, sex, sort = undefined) => {
  const temp = {};
  temp[especie.name] = especie.residents.reduce(((acumuladorDeAnimais, animal) => {
    if (sex !== undefined) {
      sexTrue(acumuladorDeAnimais, animal, sex);
    } else {
      acumuladorDeAnimais.push(animal.name);
    }
    return acumuladorDeAnimais;
  }), []);
  if (sort !== undefined) temp[especie.name].sort();
  return acumuladorEspecie.push(temp);
};

const base = (string, includeNames = undefined, sex = undefined, sort = undefined) => {
  superObjeto[string] = especies.reduce(((acumuladorEspecie, especie) => {
    if (especie.location === string) {
      if (includeNames === true) {
        concatNames(acumuladorEspecie, especie, sex, sort);
      } else {
        acumuladorEspecie.push(especie.name);
      }
    }
    return acumuladorEspecie;
  }), []);
};

function getAnimalMap(options = 0) {
  base('NE', options.includeNames, options.sex, options.sorted);
  base('NW', options.includeNames, options.sex, options.sorted);
  base('SE', options.includeNames, options.sex, options.sorted);
  base('SW', options.includeNames, options.sex, options.sorted);
  return superObjeto;
}

// -----requisito10--------

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

  if (parametro !== 0) return { [parametro]: resposta[parametro] };

  return resposta;
}

// -----requisito11--------

function getOldestFromFirstSpecies(id) {
  const objFuncionario = employees.find((obj) => obj.id === id);
  const primeiroAnimal = objFuncionario.responsibleFor[0];
  const objAnimal = especies.find((obj) => obj.id === primeiroAnimal);
  const animaisResidentes = objAnimal.residents;
  let resposta = animaisResidentes[0];
  animaisResidentes.forEach((obj) => {
    if (resposta.age < obj.age) {
      resposta = obj;
    }
  });
  return Object.values(resposta);
}

// -----requisito12--------

function increasePrices(valor = 0) {
  const { Adult, Child, Senior } = prices;
  const precoAdulto = Adult * (valor / 100 + 1);
  const precoCrianca = Child * (valor / 100 + 1);
  const precoIdoso = Senior * (valor / 100 + 1);
  prices.Adult = Math.round(precoAdulto * 100) / 100;
  prices.Child = Math.round(precoCrianca * 100) / 100;
  prices.Senior = Math.round(precoIdoso * 100) / 100;
}

// -----requisito13--------

const transformarIdemAnimal = (idAnimal) => {
  let nomeDoAnimal;
  especies.forEach((obj) => {
    if (obj.id === idAnimal) {
      nomeDoAnimal = obj.name;
    }
  });
  return nomeDoAnimal;
};

const proLintFicarFeliz = (obj) => {
  const nomeCompleto = `${obj.firstName} ${obj.lastName}`;
  const arrayAnimais = [];
  obj.responsibleFor.forEach((idAnimal) => {
    arrayAnimais.push(transformarIdemAnimal(idAnimal));
  });
  const temp = {};
  temp[nomeCompleto] = arrayAnimais;
  return temp;
};

function getEmployeeCoverage(idOrName = 0) {
  let array = {};
  if (idOrName === 0) {
    employees.forEach((obj) => {
      array = { ...array, ...proLintFicarFeliz(obj) };
    });
    return array;
  }
  employees.forEach((obj) => {
    if (obj.firstName === idOrName || obj.lastName === idOrName || obj.id === idOrName) {
      array = { ...array, ...proLintFicarFeliz(obj) };
    }
  });
  return array;
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
