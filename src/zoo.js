const { prices } = require('./data');
const data = require('./data');

const especies = data.species;
const { employees, hours } = data;

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

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const obj = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
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

// -----requisito8-------- (dica da Mariana Fereira)

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

const { Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, Monday } = hours;

const arrayDestruc = [Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, Monday];

const diasSemana = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'];

function getSchedule(parametro = 0) {
  const resposta = diasSemana.reduce(((acu, valor, index) => {
    const qualquer = acu;
    const temp = Object.values(arrayDestruc[index]);
    if (valor === 'Monday') qualquer[valor] = 'CLOSED';
    else qualquer[valor] = `Open from ${temp[0]}am until ${temp[1] += -12}pm`;
    return qualquer;
  }), {});
  return (parametro !== 0) ? { [parametro]: resposta[parametro] } : resposta;
}

// -----requisito11--------

function getOldestFromFirstSpecies(id) {
  const objFuncionario = employees.find((obj) => obj.id === id);
  const primeiroAnimal = objFuncionario.responsibleFor[0];
  const objAnimal = especies.find((obj) => obj.id === primeiroAnimal);
  const animaisResidentes = objAnimal.residents;
  let resposta = animaisResidentes[0];
  animaisResidentes.forEach((obj) => {
    if (resposta.age < obj.age) resposta = obj;
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

const proLintFicarFeliz = (acuFun = {}, objFun) => {
  const qualquer = acuFun;
  const nome = `${objFun.firstName} ${objFun.lastName}`;
  const responsFor = objFun.responsibleFor;
  const arrayAnimais = responsFor.reduce(((acuAnimal, idAnimal) => {
    const temp = acuAnimal;
    especies.forEach((valor) => {
      if (valor.id === idAnimal) temp.push(valor.name);
    });
    return temp;
  }), []);
  qualquer[nome] = arrayAnimais;
  return qualquer;
};

function getEmployeeCoverage(idOrName = 0) {
  const resposta = employees.reduce(((acuFun, objFun) => proLintFicarFeliz(acuFun, objFun)), {});
  const respParametro = {};
  employees.forEach((obj) => {
    if (obj.firstName === idOrName || obj.lastName === idOrName || obj.id === idOrName) {
      const nome = `${obj.firstName} ${obj.lastName}`;
      respParametro[nome] = resposta[nome];
    }
  });
  return (idOrName !== 0) ? respParametro : resposta;
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
