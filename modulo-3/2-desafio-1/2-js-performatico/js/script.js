window.addEventListener("load", start);

const clickArray = [];

function start() {
    const button = document.querySelector("#btnClick");
    button.addEventListener("click", handleButtonClick);
    console.log("DOM Carregado");
}

function handleButtonClick() {
    const item = getNewTimestamp();
    clickArray.push(item);
    render(item);
}

function render(item) {
    const ul = document.querySelector("#data");

    const li = document.createElement("li");
    li.textContent = item;

    ul.appendChild(li);

    document.title = clickArray.length;
}
