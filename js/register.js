//Initial References
let usernameR = document.getElementById("usernameRegister");
let email = document.getElementById("email");
let passwordR = document.getElementById("passwordRegister");
let registerBtn = document.getElementById("register");
let alertR = document.querySelectorAll(".alert")[1];
let wrongR = document.querySelectorAll(".wrong")[1];
let alertEmail = document.querySelectorAll(".alertInvalid")[0];
let signin = document.querySelector(".have");
let getUser = JSON.parse(localStorage.getItem("user")) || [];
let validEmail = /\w+@\w+.com/g;

//show signin page when click in sign in
signin.addEventListener("click", () => {
  document.querySelector(".register").style.zIndex = "0";
  document.querySelector(".sign-in").style.zIndex = "1";
});
//get all users
arrayOfUser = JSON.parse(localStorage.getItem("user")) || [];
//store user data in local storage and check if it available or  not
registerBtn.addEventListener("click", register);
function register(e) {
  e.preventDefault();
  if (usernameR.value === "" || email.value === "" || passwordR.value === "") {
    alertR.style.display = "block";
    usernameR.onfocus = function () {
      alertR.style.display = "none";
    };
    passwordR.onfocus = function () {
      alertR.style.display = "none";
    };
    email.onfocus = function () {
      alertR.style.display = "none";
    };
  } else if (!email.value.match(validEmail)) {
    alertEmail.style.display = "block";
    email.onfocus = function () {
      alertEmail.style.display = "none";
    };
  } else {
    addUserToArray(usernameR.value, passwordR.value, email.value);
  }
}
let array = [];
let d = window.localStorage.getItem("user");
//store users as array
function addUserToArray(username, pass, email) {
  const user = {
    id: Date.now(),
    title: username,
    password: pass,
    email: email,
  };
  for (let i = 0; i < arrayOfUser.length; i++) {
    array.push(arrayOfUser[i].title);
  }
  if (array.indexOf(user.title) > -1) {
    wrongR.style.display = "block";
    usernameR.onfocus = function () {
      wrongR.style.display = "none";
    };
  } else {
    arrayOfUser.push(user);
    addDtaToLocalStorage(arrayOfUser);
    document.querySelector(".register").style.zIndex = "0";
    document.querySelector(".sign-in").style.zIndex = "1";
  }
}
//to test
if (arrayOfUser == []) {
  addUserToArray("admin", 123, "admin@yahoo.com");
}
//add users to local storage
function addDtaToLocalStorage(arrayOfUser) {
  localStorage.setItem("user", JSON.stringify(arrayOfUser));
  getUser = JSON.parse(localStorage.getItem("user"));
  for (let i = 0; i < getUser.length; i++) {
    a.push(getUser[i].title);
  }
}
