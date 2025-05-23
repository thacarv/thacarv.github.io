const helloWorld = document.getElementsByClassName("hello-world")[0];
const resumee = document.getElementsByClassName("resumee")[0];
helloWorld.style.display = "";
resumee.style.display = "none";

function clicktocontinue() {
  helloWorld.style.display = "none";
  resumee.style.display = "initial";
}

document.addEventListener("click", clicktocontinue);

// Checks if the document is loaded.
document.addEventListener("DOMContentLoaded", () => {
  // Uses IntersectionObserver API to check if objects are on screen.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        return;
      }
    });
  });

  // Inside HTML you can put a specific class to mark the element to the API.
  // API checks every element that contains the animate class.
  const allAnimatedElements = document.querySelectorAll(".animate");

  // Adds the observer to each element with animate class.
  allAnimatedElements.forEach((element) => observer.observe(element));
});
