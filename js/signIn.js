//Initial References
let username = document.getElementById("username");
let password = document.getElementById("password");
let loginBtn = document.getElementById("log_in");
let reg = document.querySelector(".Nothave");
let wrong = document.querySelector(".section-form form p:first-of-type");
let alert = document.querySelector(".section-form form p:nth-of-type(2)");
let a = [];
//show register page when click in not have account
reg.addEventListener("click", () => {
  document.querySelector(".register").style.zIndex = "1";
  document.querySelector(".sign-in").style.zIndex = "0";
});
//get all users in local storage
getUser = JSON.parse(localStorage.getItem("user")) || [];
for (let i = 0; i < getUser.length; i++) {
  a.push(getUser[i].title);
}
//comapre input data of user with data in local storage
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (username.value === "" || password.value === "") {
    alert.style.display = "block";
    username.onfocus = function () {
      alert.style.display = "none";
    };
    password.onfocus = function () {
      alert.style.display = "none";
    };
  } else {
    if (a.indexOf(username.value) === -1) {
      wrong.style.display = "block";
      username.onfocus = function () {
        wrong.style.display = "none";
      };
      password.onfocus = function () {
        wrong.style.display = "none";
      };
    } else {
      for (let i = 0; i < getUser.length; i++) {
        if (getUser[i].title == username.value) {
          if (password.value == getUser[i].password) {
            localStorage.setItem("username", getUser[i].title);
            localStorage.setItem("id", getUser[i].id);
            localStorage.setItem("email", getUser[i].email);
            setTimeout(() => {
              window.location = "../html/home.html";
            }, 1500);
          } else {
            wrong.style.display = "block";
            username.onfocus = function () {
              wrong.style.display = "none";
            };
            password.onfocus = function () {
              wrong.style.display = "none";
            };
          }
        }
      }
    }
  }
});
