window.addEventListener("load", () => {
  doMap();
  doFilter();
  doForEach();
  doReduce();
  doFind();
  doSome();
  doEvery();
  doSort();
});

//mapeia um novo vetor com o filtro especificado
function doMap() {
  const nameEmailArray = people.results.map((person) => {
    return {
      name: person.name,
      email: person.email,
    };
  });
  console.log(nameEmailArray);
  return nameEmailArray;
}

//retorna os valores de acordo com o filtro especificado
function doFilter() {
  const olderThan18 = people.results.filter((person) => {
    return person.dob.age > 50;
  });
  console.log(olderThan18);
}

//atua diretamente no vetor incluindo nova propriedade
function doForEach() {
  const mappedPeople = doMap();
  mappedPeople.forEach((person) => {
    person.nameSize =
      person.name.title.length +
      person.name.first.length +
      person.name.last.length;
  });
  console.log(mappedPeople);
}

//faz o somatório dos valores;
function doReduce() {
  const totalAges = people.results.reduce((sum, current) => {
    return sum + current.dob.age;
  }, 0);
  console.log(totalAges);
}

//retorna o primeiro valor encontrado
function doFind() {
  const found = people.results.find((person) => {
    return person.location.state === "Minas Gerais";
  });
  console.log(found);
}

//retorna um valor booleano se existir a busca especificada
function doSome() {
  const found = people.results.some((person) => {
    return person.location.state === "Amazonas";
  });
  console.log(found);
}

//retorna um valor booleano se todos possuem a busca especificada
function doEvery() {
  const found = people.results.every((person) => {
    return person.nat === "BR";
  });
  console.log(found);
}

//ordena um array
function doSort() {
  const mappedNames = people.results
    .map((person) => {
      return person.name.first;
    })
    .filter((person) => {
      return person.startsWith("A");
    })
    .sort();
  console.log(mappedNames);
}
