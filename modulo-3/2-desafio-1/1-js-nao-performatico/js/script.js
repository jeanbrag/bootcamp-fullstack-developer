window.addEventListener("load", start);

const clickArray = [];

function start() {
    const button = document.querySelector("#btnClick");
    button.addEventListener("click", handleButtonClick);
    console.log("DOM Carregado");
}

function handleButtonClick() {
    clickArray.push(getNewTimestamp());
    render();
}

function render() {
    const ul = document.querySelector("#data");
    ul.innerHTML = "";
    let lis = "";
    clickArray.map((item) => {
        lis += `<li>${item}</li>`;
    });
    ul.innerHTML = lis;

    document.title = clickArray.length;
}
