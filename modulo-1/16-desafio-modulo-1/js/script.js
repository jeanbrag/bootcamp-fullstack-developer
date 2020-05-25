//variaveis de estado
let tabPeople = null;

let allPeople = [];
let peopleSearched = [];

let totalSexoM = 0;
let totalSexoF = 0;
let totalSumAge = 0;
let averageAge = 0;
let pessoasEncontradas = 0;

let tabtotalSexoM = null;
let tabtotalSexoF = null;
let tabtotalSumAge = null;
let tabaverageAge = null;
let tabPessoasEncontradas = null;
let tabStatistic = null;

let nametoSearch = null;

let button = null;

window.addEventListener("load", () => {
  function preventSubmit(event) {
    function handleFormSubmit(event) {
      event.preventDefault();
    }
    var form = document.querySelector("form");
    form.addEventListener("submit", handleFormSubmit);
  }

  tabStatistic = document.querySelector(".statistic");
  button = document.querySelector("#btnBusca");
  tabPessoasEncontradas = document.querySelector("#numeroPessoasEncontradas");
  inputName = document.querySelector("#input-name");

  preventSubmit();
  fetchPeople();
  activateInput();
});

async function fetchPeople() {
  const res = await fetch(
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  );
  const json = await res.json();
  allPeople = json.results.map((person) => {
    const { name, picture, dob, gender } = person;

    return {
      name: name.first + " " + name.last,
      picture: picture.thumbnail,
      age: dob.age,
      gender: gender,
    };
  });
  console.log(allPeople);
}

function render() {
  function renderPeopleList() {
    tabPeople = document.querySelector("#tabPeople");
    let peopleHTML = "<div>";
    peopleSearched.forEach((person) => {
      const { name, picture, age, gender } = person;
      const personHTML = `
      <div class='people'>                
      <div>
      <img src="${picture}" alt="${name}">
      </div>
      <div>
      <ul>
      <li>${name}, ${age} anos</li>
      </ul>
      </div>
      </div>       
      `;

      peopleHTML += personHTML;
    });
    peopleHTML += "</div>";

    tabPeople.innerHTML = peopleHTML;
  }

  function renderSummary() {
    function renderStatistic() {
      let statisticContent = `<h3>Estatísticas</h3>
                  <ul>
                    <li>Sexo masculino: ${totalSexoM}<span id="totalSexoM"></span></li>
                    <li>Sexo feminino: ${totalSexoF}<span id="totalSexoF"></span></li>
                    <li>Soma das idades: ${totalSumAge}<span id="totalSumAge"></span></li>
                    <li>Média das idades: ${averageAge}<span id="average"></span></li>
                  </ul>`;
      let pessoasEncontradasContent = `<h3>${pessoasEncontradas} usuário(s) encontrado(s)</h3><div id="tabPeople"></div>`;
      tabPessoasEncontradas.innerHTML = pessoasEncontradasContent;
      tabStatistic.innerHTML = statisticContent;
    }
    totalSexoM = peopleSearched.filter((person) => {
      return person.gender === "male";
    }).length;

    totalSexoF = peopleSearched.filter((person) => {
      return person.gender === "female";
    }).length;

    totalSumAge = peopleSearched.reduce((accumulator, current) => {
      return accumulator + current.age;
    }, 0);
    averageAge = totalSumAge / peopleSearched.length;
    pessoasEncontradas = peopleSearched.length;
    renderStatistic();
  }
  renderSummary();
  renderPeopleList();
}

function activateInput() {
  function searchName(name) {
    peopleSearched = allPeople.filter((person) => {
      return person.name.toLowerCase().indexOf(nametoSearch.toLowerCase()) > -1;
    });
  }
  //funçao que, ao detectar a tecla Enter, chama a funçao inserir
  function handleTyping(event) {
    if (event.key === "Enter") {
      if (event.target.value.trim() !== "" && !!event.target.value) {
        nametoSearch = event.target.value;
        searchName(nametoSearch);
      }
      render();
      clearInput();
    }
  }

  function handleClick(event) {
    if (inputName.value.trim() !== "" && !!inputName.value) {
      nametoSearch = inputName.value;
      searchName(nametoSearch);
    }
    render();
    clearInput();
  }

  inputName.addEventListener("keyup", handleTyping); //detecta o ativamento da tecla e chama handleTyping
  button.addEventListener("click", handleClick);
  inputName.focus(); //bota o cursor na caixa de texto
}

//funçao para limpar após inserir
function clearInput() {
  inputName.value = "";
  inputName.focus();
}
