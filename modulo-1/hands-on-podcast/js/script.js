window.addEventListener("load", start);

function start() {
  console.log("DOM Loaded");

  var divPodcasts = document.querySelector("#divPodcasts");
  var inputFrequency = document.querySelector("#inputFrequency");
  var inputRange = document.querySelector("#inputRange");

  inputRange.addEventListener("input", handleInputRange);
}

function handleInputRange(event) {
  var currentFrequency = event.target.value;
  inputFrequency.value = currentFrequency;

  showPodcastFromFrequency(currentFrequency);
}

function showPodcastFromFrequency(frequency) {
  divPodcasts.textContent - "Tem podcast";
}
