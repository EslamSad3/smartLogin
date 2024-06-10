// signUp variables
var signUpUserName = document.getElementById("signUpUserName");
var signUpUserEmail = document.getElementById("signUpUserEmail");
var signUpUserPassword = document.getElementById("signUpUserPassword");
var signUpBtn = document.getElementById("signUpBtn");
var succestext = document.getElementById("succestext");
var userExists = document.getElementById("userExists");

var header = document.getElementById("header");

// login variables
var loginUserEmail = document.getElementById("loginUserEmail");
var loginUserPassword = document.getElementById("loginUserPassword");
var invalidUser = document.getElementById("invalidUser");
var loginBtn = document.getElementById("loginBtn");

// logout
var logOutBtn = document.getElementById("logOutBtn");

//  Users in localStorage
var users = JSON.parse(localStorage.getItem("users")) || [];
var loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

if (loggedUser) {
  header.innerHTML = `Welcom ${loggedUser}`;
}

// Determine the base path dynamically
const basePath = window.location.hostname === 'localhost' ? '' : '/smartLogin';

// Prevent home page access if not logged in
document.addEventListener("DOMContentLoaded", function () {
  const loginPage = `${basePath}/login.html`;
  const registerPage = `${basePath}/register.html`;
  const currentPath = window.location.pathname;

  // Check if we are not on the login or register page
  if (currentPath !== loginPage && currentPath !== registerPage) {
    if (!loggedUser) {
      window.location.href = loginPage;
    }
  }
});
// signUp
function signUp() {
  // Check if user exists
  var existEmail = users.find((user) => user.email === signUpUserEmail.value);
  if (!existEmail) {
    var user = {
      name: signUpUserName.value,
      email: signUpUserEmail.value,
      password: signUpUserPassword.value,
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    succestext.classList.replace("d-none", "d-block");
    userExists.classList.replace("d-block", "d-none");
    clear();
  } else {
    userExists.classList.replace("d-none", "d-block");
    succestext.classList.replace("d-block", "d-none");
  }
}

signUpBtn?.addEventListener("click", function () {
  signUp();
});

// Login function
function login() {
  var existEmail = users.find(
    (user) =>
      user.email === loginUserEmail.value &&
      user.password === loginUserPassword.value
  );

  if (existEmail) {
    var loggedInUserData = existEmail.name;
    localStorage.setItem("loggedUser", JSON.stringify(loggedInUserData));
    window.location.href = "/index.html";
  } else {
    invalidUser.classList.replace("d-none", "d-block");
  }
}

loginBtn?.addEventListener("click", function () {
  login();
});

function clear() {
  signUpUserName.value = "";
  signUpUserEmail.value = "";
  signUpUserPassword.value = "";
}

logOutBtn?.addEventListener("click", function () {
  localStorage.removeItem("loggedUser");
  window.location.href = "/login.html";
});

// api

let basUrl = "https://forkify-api.herokuapp.com/api/search?";
let allMeals = [];

// btns
var pizaa = document.getElementById("pizaa");
var carrot = document.getElementById("carrot");
var broccoli = document.getElementById("broccoli");
var corn = document.getElementById("corn");
var all = document.getElementById("all");
var mealsHeadr = document.getElementById("mealsHeadr");

// Generalized function to fetch meals based on query
async function getMeals(query) {
  try {
    const response = await fetch(`${basUrl}q=${query}`);
    const { recipes } = await response.json();
    allMeals.push(...recipes);
  } catch (error) {
    console.log(error);
  }
  showAllMeals();
}

// Fetch and show all meals sequentially
async function fetchAllMeals() {
  await getMeals("pizza");
  await getMeals("carrot");
  await getMeals("corn");
  await getMeals("broccoli");
  // You can check the contents of allMeals here
}

// Function to display all meals
function showAllMeals() {
  let container = ``;
  for (let i = 0; i < allMeals.length; i++) {
    container += `
      <div class="col-md-6 col-lg-3">
          <div class="card" style="width: 15rem;">
            <img src="${allMeals[i].image_url}" class="card-img-top" alt="${allMeals[i].publisher}" />
            <div class="card-body">
              <p class="card-title">${allMeals[i].publisher}</p>
            </div>
          </div>
      </div>
    `;
  }
  document.getElementById("allMealsRow").innerHTML = container;
  mealsHeadr.innerHTML = `All meeals : ${allMeals.length} `;
}

// Start fetching meals
fetchAllMeals();

all.addEventListener("click", function () {
  fetchAllMeals();
  showAllMeals();
});

// Get meals by query

async function getOnlyPizza() {
  const response = await fetch(`${basUrl}q=pizza`);
  const { recipes } = await response.json();
  allMeals = [];
  allMeals.push(...recipes);
  showAllMeals();
  mealsHeadr.innerHTML = `pizza meeals : ${allMeals.length} `;
}

pizaa.addEventListener("click", function () {
  getOnlyPizza();
});

async function getOnlyCorn() {
  const response = await fetch(`${basUrl}q=corn`);
  const { recipes } = await response.json();
  allMeals = [];
  allMeals.push(...recipes);
  showAllMeals();
  mealsHeadr.innerHTML = `corn meeals : ${allMeals.length} `;
}

corn.addEventListener("click", function () {
  getOnlyCorn();
});

async function getOnlyCarrot() {
  const response = await fetch(`${basUrl}q=carrot`);
  const { recipes } = await response.json();
  allMeals = [];
  allMeals.push(...recipes);
  showAllMeals();
    mealsHeadr.innerHTML = `corn carrot : ${allMeals.length} `;

}

carrot.addEventListener("click", function () {
  getOnlyCarrot();
});

async function getOnlyBroccoli() {
  const response = await fetch(`${basUrl}q=broccoli`);
  const { recipes } = await response.json();
  allMeals = [];
  allMeals.push(...recipes);
  showAllMeals();
    mealsHeadr.innerHTML = `broccoli meals : ${allMeals.length} `;

}

broccoli.addEventListener("click", function () {
  getOnlyBroccoli();
});
