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

// Handles JSON information
async function fetchJsonData() {
  fetch("../projects.json")
    .then((response) => response.json()) // Parse JSON
    .then((data) => dataJsonHandler(data.projects)) // Work with JSON data
    .catch((error) => console.error("Error fetching JSON:", error));
}

// Receives JSON data and calls other functions to inject HTML information into the index.html file.
function dataJsonHandler(data) {
  let projectArray = [];
  for (let projeto in data) {
    projectArray.push(data[projeto]);
  }
  projectArray = projectArray.reverse();

  for (let i = 0; i < projectArray.length; i++) {
    populateProjects(projectArray[i]);
  }
  populateProjectNavBar(projectArray);
}

// Function that inserts the technologies into the project navigation bar.
function populateProjectNavBar(projectArray) {
  const location = document.querySelector(".project-form");
  let projectSet = new Set();
  for (project in projectArray) {
    let projectItem = projectArray[project];
    let tecs = projectItem.tec.split(" ");
    for (t in tecs) {
      projectSet.add(tecs[t]);
    }
  }

  projectSet.forEach((item) => {
    let htmlItem = `
    <input type="checkbox" id="${item}" name="${item}" value="${item}" onClick = "onSelectTecClick(this)" />
    <label for="${item}">${item}</label><br />
    `;
    location.insertAdjacentHTML("beforeend", htmlItem);
  });
}

// Function that insert the projects present inside the json file.
function populateProjects(project) {
  let listTec = project.tec.split(" ");
  const location = document.querySelector(".project-boxes");

  const tecIcons = listTec
    .map(
      (item) =>
        `<span ><i class="fa-brands fa-${item.toLowerCase()}" title="${item}"></i></span>`
    )
    .join("");

  let htmlProject = `
            <div class="project-item ${project.tec}" id="project-${
    project.tec
  }">
              <a href="${project.link}"
                ><img
                  class="project-picture"
                  src="${
                    project.img ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxEZvUy3439esY4e_JyJMLh8YuSWxCEPpnGw&s"
                  }"
                  alt=""
                />
                <h2>${project.title}</h2>
              </a>
              <div class="project-tecs">
              ${tecIcons}
              </div>
            </div>
`;
  location.insertAdjacentHTML("beforeend", htmlProject);
}

function onSelectTecClick(tec) {
  let checkbox = document.querySelector(`#${tec.id}`);
  let selectedTec = document.querySelectorAll(`.project-item:not(.${tec.id})`);
  let isChecked = checkbox.checked;

  if (isChecked) {
    selectedTec.forEach((item) => {
      item.style.display = "none";
    });
  } else {
    selectedTec.forEach((item) => {
      item.style.display = "initial";
    });
  }
}

fetchJsonData();
