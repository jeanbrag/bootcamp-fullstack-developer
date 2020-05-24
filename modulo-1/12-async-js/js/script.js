//setTimeout -> executa após X milissegundos
//setInterval -> repete a cada X milissegundos

window.addEventListener("load", () => {
  const timer = document.querySelector("#timer");
  let count = 0;
  const interval = setInterval(() => {
    timer.textContent = ++count;

    if (count === 10) {
      clearInterval(interval);
      //break;
      return;
    }

    if (count % 5 === 0) {
      setTimeout(() => {
        timer.textContent = count + 0.5;
      }, 500);
    }
  }, 1000);
});
