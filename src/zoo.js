const { prices } = require('./data');
const data = require('./data');

const especies = data.species;
const { employees } = data;

// -----requisito1--------

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

// -----requisito2--------

function getAnimalsOlderThan(animal, age) {
  let residentes;
  especies.forEach((objeto) => {
    if (objeto.name === animal) {
      residentes = objeto.residents;
    }
  });
  return residentes.every((cadaResidente) => cadaResidente.age >= age);
}

// -----requisito3--------

function getEmployeeByName(employeeName) {
  let objetoResposta = {};
  employees.forEach((objeto) => {
    if (objeto.firstName === employeeName || objeto.lastName === employeeName) {
      objetoResposta = objeto;
    }
  });
  return objetoResposta;
}

// -----requisito4--------

function createEmployee(personalInfo, associatedWith) {
  const objeto = Object.assign(personalInfo, associatedWith);
  return objeto;
}

// -----requisito5--------

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

// -----requisito6--------

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
// -----requisito7--------

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
// -----requisito8--------

function calculateEntry(entrants = 0) {
  const adulto = (entrants.Adult) ? entrants.Adult * 49.99 : 0;
  const idoso = (entrants.Senior) ? entrants.Senior * 24.99 : 0;
  const criança = (entrants.Child) ? entrants.Child * 20.99 : 0;

  return (entrants === 0) ? 0 : adulto + idoso + criança;
}

// -----requisito9--------

const superObjeto = {};

const base = (callback, string, sex = undefined, sort = undefined) => {
  superObjeto[string] = especies.reduce(((acu, valor) => {
    if (valor.location === string) {
      callback(acu, valor, sex, sort);
    }
    return acu;
  }), []);
};

const concatGeraRegi = (acu, valor) => acu.push(valor.name);

const condiSex = (a, v, sex) => {
  if (v.sex === sex) {
    return a.push(v.name);
  }
};

const concatNames = (acu, valor, sex, sort = undefined) => {
  const temp = {};
  temp[valor.name] = valor.residents.reduce(((a, v) => {
    if (sex !== undefined) {
      condiSex(a, v, sex);
    } else {
      a.push(v.name);
    }
    return a;
  }), []);
  if (sort !== undefined) {
    temp[valor.name].sort();
  }
  return acu.push(temp);
};

const gerarRegioes = (string) => base(concatGeraRegi, string);

const fififonfon = (string, sex, sort) => base(concatNames, string, sex, sort);

const multiplica4 = (callback, sex, sort) => {
  callback('NE', sex, sort);
  callback('NW', sex, sort);
  callback('SE', sex, sort);
  callback('SW', sex, sort);
};

function getAnimalMap(options = 0) {
  if (options === 0) {
    multiplica4(gerarRegioes);
    return superObjeto;
  }

  if (options.includeNames === true) {
    multiplica4(fififonfon, options.sex, options.sorted);
    return superObjeto;
  }
  multiplica4(gerarRegioes);
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

  if (parametro !== 0) {
    return { [parametro]: resposta[parametro] };
  }
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
