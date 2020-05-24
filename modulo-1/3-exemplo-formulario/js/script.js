//console.log("oi porra");

window.addEventListener("load", start);

function start() {
  console.log("sou lenda");
  console.log("carregou porra");
  var nameInput = document.querySelector("#input1"); //seleciona o name ipnut pelo DOM
  nameInput.addEventListener("keyup", countName);

  var form = document.querySelector("form");
  form.addEventListener("submit", preventSubmit);
}

function countName(event) {
  var count = event.target.value;
  var span = document.querySelector("#nameLength");
  span.textContent = count.length;
}

function preventSubmit(event) {
  event.preventDefault();
  var nameInput = document.querySelector("#input1"); //seleciona o name ipnut pelo DOM
  alert(nameInput.value + " cadastrado porra");
}
