/*=========================================
        KORA LOGIN SYSTEM
=========================================*/

const loginForm = document.getElementById("loginForm");

if (loginForm) {

loginForm.addEventListener("submit", function (e) {

e.preventDefault();

const email = document.getElementById("email").value.trim();

const password = document.getElementById("password").value.trim();

if (email === "" || password === "") {

alert("Please enter both email and password.");

return;

}

/*-----------------------------------------
Simple Login
-----------------------------------------*/

localStorage.setItem("koraLoggedIn", "true");

localStorage.setItem("koraUserEmail", email);

/*-----------------------------------------
Optional Name
-----------------------------------------*/

const username = email.split("@")[0];

localStorage.setItem("koraUserName", username);

/*-----------------------------------------
Redirect
-----------------------------------------*/

window.location.href = "dashboard.html";

});

}

/*=========================================
LOGOUT FUNCTION
=========================================*/

function logout() {

localStorage.removeItem("koraLoggedIn");

localStorage.removeItem("koraUserEmail");

localStorage.removeItem("koraUserName");

window.location.href = "login.html";

}

/*=========================================
CHECK LOGIN
=========================================*/

function checkLogin() {

const loggedIn = localStorage.getItem("koraLoggedIn");

if (loggedIn !== "true") {

window.location.href = "login.html";

}

}

/*=========================================
UPDATE NAVBAR
=========================================*/

function updateNavbar() {

const loginButton = document.querySelector(".login-btn");

const loggedIn = localStorage.getItem("koraLoggedIn");

if (!loginButton) return;

if (loggedIn === "true") {

loginButton.innerHTML = "Dashboard";

loginButton.href = "dashboard.html";

loginButton.classList.remove("login-btn");

loginButton.classList.add("dashboard-btn");

}

}

document.addEventListener("DOMContentLoaded", updateNavbar);