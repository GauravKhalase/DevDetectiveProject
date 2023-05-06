const btnmode = document.querySelector("#btn-mode");
const root = document.documentElement.style;
const modetext = document.querySelector("#mode-text");
const modeicon = document.querySelector("#mode-icon");
const input = document.querySelector("#input");
const noresults = document.querySelector("#noresults");
const submit = document.querySelector("#submit");
// const avatar = document.querySelector("#avatar");
// const name = document.querySelector("#name");
// const user = document.querySelector("#user");
// const date = document.querySelector("#date");
// const bio = document.querySelector("#bio");
// const repos = document.querySelector("#repos");
// const followers = document.querySelector("#followers");
// const following = document.querySelector("#following");
// const location = document.querySelector("#location");
// const page = document.querySelector("#page");
// const twitter = document.querySelector("#twitter");
// const company = document.querySelector("#company");

let darkMode = false;

btnmode.addEventListener("click", function () {
    
    if(darkMode == false){
        darkModeProperties();
    }else{
        lightModeProperties();
    }
});



function darkModeProperties() {
  root.setProperty("--lm-bg", "#141D2F");
  root.setProperty("--lm-bg-content", "#1E2A47");
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  modetext.innerText = "LIGHT";
  modeicon.src = "./assets/images/sun-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(1000%)");
  darkMode = true;
  localStorage.setItem("dark-mode", true);

}

function lightModeProperties() {
  root.setProperty("--lm-bg", "#F6F8FF");
  root.setProperty("--lm-bg-content", "#FEFEFE");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  modetext.innerText = "DARK";
  modeicon.src = "./assets/images/moon-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(100%)");
  darkMode = false;
  localStorage.setItem("dark-mode", false);
}

function init() {
  const value = localStorage.getItem("dark-mode");

  if(value === null) {
    localStorage.setItem("dark-mode", false);
    lightModeProperties();
  }
  else if(value == "true") {
    darkModeProperties();
  }
  else if(value == "false") {
    lightModeProperties();
  }

  // getUserData(url + "thepranaygupta");
}

init();
