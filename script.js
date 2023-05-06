const btnmode = document.querySelector("#btn-mode");
const root = document.documentElement.style;
const modetext = document.querySelector("#mode-text");
const modeicon = document.querySelector("#mode-icon");
const input = document.querySelector("#input");
const noresults = document.querySelector("#no-results");
const submit = document.querySelector("#submit");
const avatar = document.querySelector("#avatar");
const username = document.querySelector("#name");
const user = document.querySelector("#user");
const date = document.querySelector("#date");
const bio = document.querySelector("#bio");
const repos = document.querySelector("#repos");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");
const user_location = document.querySelector("#location");
const page = document.querySelector("#page");
const twitter = document.querySelector("#twitter");
const company = document.querySelector("#company");
const url = "https://api.github.com/users/";
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let darkMode = false;

btnmode.addEventListener("click", function () {
    
    if(darkMode == false){
        darkModeProperties();
    }else{
        lightModeProperties();
    }
});

submit.addEventListener("click", function (){
  if (input.value !== ""){
    getUserData(url + input.value);
  }
}
)

input.addEventListener( "keydown", function(e){
  if(e.key == "Enter"){
    if (input.value !== ""){
      getUserData(url + input.value);
    }
  }
});

input.addEventListener("input", function () {
  noresults.style.display = "none";
});

function getUserData(gitUrl) {
  fetch(gitUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      updateProfile(data);
    })
    .catch((error) => {
      throw error;
    });
}

function updateProfile(data) {
  if (data.message !== "Not Found") {
    noresults.style.display = "none";
    function checkNull(param1, param2) {
      if (param1 === "" || param1 === null) {
        param2.style.opacity = 0.5;
        param2.previousElementSibling.style.opacity = 0.5;
        return false;
      } else {
        return true;
      }
    }
    avatar.src = `${data.avatar_url}`;
    username.innerText = data.name === null ? data.login : data.name;
    user.innerText = `${data.login}`;
    user.href = `${data.html_url}`;

    // datesegments = data.created_at.split("T");
    // date.innerText = `Joined ${datesegments[0]}`;
    datesegments = data.created_at.split("T").shift().split("-");
    date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
    
    bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
    repos.innerText = `${data.public_repos}`;
    followers.innerText = `${data.followers}`;
    following.innerText = `${data.following}`;
    // user_location.innerText = data.location !== null ? data.location : "Not Available";
    user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
    page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
    page.href = checkNull(data.blog, page) ? data.blog : "#";
    twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
    twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
    company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
  } else {
    noresults.style.display = "block";
  }
}

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

  getUserData(url + "gauravkhalase");
}

init();
