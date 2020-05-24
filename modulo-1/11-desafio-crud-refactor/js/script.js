let globalNames = [];
let inputName = null;
let isEditing = false;
let currentIndex = null;

window.addEventListener("load", () => {
  inputName = document.querySelector("#inputName");
  preventSubmit();
  activateInput();
});

//função para prevenir o recarregamento da página
function preventSubmit(event) {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  var form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmit);
}

function activateInput() {
  //funçao que insere o nome na lista
  function insertName(name) {
    //globalNames.push(name);
    globalNames = [...globalNames, name];
  }

  function editName(newName) {
    globalNames[currentIndex] = newName;
  }

  //funçao que, ao detectar a tecla Enter, chama a funçao inserir
  function handleTyping(event) {
    if (event.key === "Enter") {
      if (event.target.value.trim() !== "" && !!event.target.value) {
        if (isEditing) {
          editName(event.target.value);
        } else insertName(event.target.value);
      }
      render();
      isEditing = false;
      clearInput();
    }
  }

  inputName.addEventListener("keyup", handleTyping); //detecta o ativamento da tecla e chama handleTyping
  inputName.focus(); //bota o cursor na caixa de texto
}

//funçao para renderizar a tabela de nomes
function render() {
  //funcao para criar o botao de delete
  function createDeleteButton(index) {
    function deleteName() {
      globalNames = globalNames.filter((name, i) => i !== index);
      render(); //renderiza novamente
    }

    var button = document.createElement("button");
    button.classList.add("deleteButton");
    button.textContent = "x";
    button.addEventListener("click", deleteName);
    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      currentIndex = index;
      inputName.value = span.textContent;
      inputName.focus();
      isEditing = true;
    }
    var span = document.createElement("span");
    span.textContent = name;
    span.classList.add("clickable");
    span.addEventListener("click", editItem);

    return span;
  }

  var divNames = document.querySelector("#names");
  divNames.innerHTML = ""; //limpa o div

  //criar ul
  var ul = document.createElement("ul");

  // fazer n li's, conforme tamanho de globalNames
  for (var i = 0; i < globalNames.length; i++) {
    var li = document.createElement("li");

    var button = createDeleteButton(i);

    var span = createSpan(globalNames[i], i);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}

const clearInput = () => {
  inputName.value = "";
  inputName.focus();
};
