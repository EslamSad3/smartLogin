// signUp variables
var signUpUserName = document.getElementById("signUpUserName");
var signUpUserEmail = document.getElementById("signUpUserEmail");
var signUpUserPassword = document.getElementById("signUpUserPassword");
var signUpBtn = document.getElementById("signUpBtn");
var succestext = document.getElementById("succestext");
var userExists = document.getElementById("userExists");

// login variables
var loginUserEmail = document.getElementById("loginUserEmail");
var loginUserPassword = document.getElementById("loginUserPassword");
var invalidUser = document.getElementById("invalidUser");
var loginBtn = document.getElementById("loginBtn");

//  Users in localStorage
var users = JSON.parse(localStorage.getItem("users")) || [];

// Prevent home page access if not logged in
document.addEventListener("DOMContentLoaded", function () {
  // Check if we are not on the login page
  if (window.location.pathname !== "smartLogin/login.html") {
    var loggedUser = localStorage.getItem("loggedUser");
    if (!loggedUser) {
      window.location.href = "smartLogin/login.html";
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
