//PROMISE

window.addEventListener("load", function () {
  fetch("https://api.github.com/users/jeanbrag")
    .then((res) => {
      res.json().then((data) => {
        showData(data);
      });
    })
    .catch((err) => {
      console.log("ERRO NA REQUISICAO");
    });
});

function showData(data) {
  const user = document.querySelector("#user");
  user.textContent = data.login + " " + data.name;
}

//criando promise
function divisionPromise(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) reject("não é possivel dividir por 0");
    resolve(a / b);
  });
}

function executeDivisionPromise() {
  divisionPromise(12, 0)
    .then((result) => {
      console.log(result);
    })
    .catch((erro) => {
      console.log("Falha na divisao " + erro);
    });
}
