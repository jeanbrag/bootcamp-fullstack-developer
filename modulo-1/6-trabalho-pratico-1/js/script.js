window.addEventListener("load", start);

var inputRed = null;
var inputGreen = null;
var inputBlue = null;

var outputRed = null;
var outputGreen = null;
var outputBlue = null;

var square = null;

function start() {
  inputRed = document.querySelector("#inputRed");
  inputGreen = document.querySelector("#inputGreen");
  inputBlue = document.querySelector("#inputBlue");

  outputRed = document.querySelector("#outputRed");
  outputGreen = document.querySelector("#outputGreen");
  outputBlue = document.querySelector("#outputBlue");
  defaultValues();

  activateInput();
}

function defaultValues() {
  inputRed.value = 0;
  inputGreen.value = 0;
  inputBlue.value = 0;
  outputRed.value = 0;
  outputGreen.value = 0;
  outputBlue.value = 0;
}

function activateInput() {
  //funçao que, ao detectar a tecla Enter, chama a funçao inserir
  function handleRed(event) {
    outputRed.value = event.target.value;
    render();
  }
  function handleGreen(event) {
    outputGreen.value = event.target.value;
    render();
  }
  function handleBlue(event) {
    outputBlue.value = event.target.value;
    render();
  }

  inputRed.addEventListener("input", handleRed);
  inputGreen.addEventListener("input", handleGreen);
  inputBlue.addEventListener("input", handleBlue);
}

function render() {
  square = document.getElementById("square");
  square.style.backgroundColor =
    "rgb(" +
    outputRed.value +
    "," +
    outputGreen.value +
    "," +
    outputBlue.value +
    ")";
}
