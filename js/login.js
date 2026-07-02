/*=========================================
KORA LOGIN
=========================================*/

const loginForm = document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit",function(e){

e.preventDefault();

const email=document.getElementById("email").value.trim();

const password=document.getElementById("password").value.trim();

let username="";

if(email==="admin@kora.ai" && password==="KORA@2026"){

username="Administrator";

}

else if(email==="demo@kora.ai" && password==="Demo@123"){

username="Demo User";

}

else if(email==="research@kora.ai" && password==="Plants@2026"){

username="Research Team";

}

else{

alert("Invalid Email or Password");

return;

}

localStorage.setItem("koraLoggedIn","true");

localStorage.setItem("koraUserEmail",email);

localStorage.setItem("koraUserName",username);

window.location.href="dashboard.html";

});

}