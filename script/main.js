const helloWorld = document.getElementsByClassName("hello-world")[0];
const resumee = document.getElementsByClassName("resumee")[0];
helloWorld.style.display = "";
resumee.style.display = "none";

function clicktocontinue() {
  helloWorld.style.display = "none";
  resumee.style.display = "initial";
}

document.addEventListener("click", clicktocontinue);

// Loads particles
particlesJS.load("particles-js", "assets/particlesjs-config.json", function () {
  console.log("callback - particles.js config loaded");
});
