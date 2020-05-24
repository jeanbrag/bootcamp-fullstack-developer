window.addEventListener("load", () => {
  doSpread();
  doRest();
  doDestructuring();
});

//spread = espalhar os elementos
function doSpread() {
  const marriedMen = people.results.filter(
    (person) => person.name.title === "Mr"
  );
  const marriedWomen = people.results.filter(
    (person) => person.name.title === "Ms"
  );

  const marriedPeople = [...marriedMen, ...marriedWomen];
  console.log(marriedPeople);
}

//rest = agrupa os elementos
function doRest() {
  function superSum(...numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
  }
  console.log(superSum(1, 2, 3, 4));
  console.log(superSum(1, 2, 3, 4, 5));
  console.log(superSum(1, 2, 3, 4, 5, 1000));
}

function doDestructuring() {
  const first = people.results[0];
  //repetitivo
  //const username = first.login.username;
  //const password = first.login.password
  const { username, password } = first.login;
  console.log(username);
  console.log(password);
}
