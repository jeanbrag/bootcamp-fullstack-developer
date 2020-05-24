"use strict"; //o js acusa mais erros

//var x let

//var escopo abrangente
//let escopo reduzido

function withVar() {
  for (var i = 0; i < 10; i++) {
    console.log(i);
  }
  i = 20;
  console.log(i);
}

function withLet() {
  for (let i = 0; i < 10; i++) {
    console.log(i);
  }
  //i = 20;
  //console.log(i);
}

withVar();
withLet();

//const = não podemos reatribuir valores

const c = 10;
//c = 20; //acusa erro

const d = [];
d.push(1); //nao acusa erro pois o conteudo do array pode ser modificado
console.log(d);

//funçao anonima
const sum = function (a, b) {
  return a + b;
};

//arrow function
const sum2 = (a, b) => {
  return a + b;
};

//arrow function reduzida -> quando é apenas um comando
const sum3 = (a, b) => a + b;

//Template literals

//sem template literals
const name = "jean";
const sobrenome = "braga";
const text1 = "meu nome é " + name + " " + sobrenome;
console.log(text1);

//com template literals
const text2 = `meu nome é ${name} ${sobrenome}`;
console.log(text2);

//Default parameters
const sum4 = (a, b = 10) => a + b;

//Manipulação de ARRAYS
