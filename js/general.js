//preload
var loader = document.querySelector("#preloader");
window.addEventListener("load", () => {
  loader.style.display = "none";
});
//footer
document.querySelector(
  ".footer"
).innerHTML = `Created with love by Aya ©${new Date().getFullYear()}`;

//header
document.querySelector(".header  button").addEventListener("click", (e) => {
  document.querySelector(".header .pages").classList.toggle("open");
  document.querySelector(".header button").classList.toggle("open");
  document.querySelector(".header button").classList.toggle("close");
});
//set name of user if register and store his data in local storage
if (document.querySelector(".user")) {
  document.querySelector(".user").addEventListener("click", (e) => {
    if (localStorage.getItem("username")) {
      document
        .querySelector(".header .icons .user div:nth-of-type(2)")
        .classList.toggle("openname");
      document.querySelector(
        ".header .icons .user div:nth-of-type(2) p:nth-of-type(2)"
      ).textContent = localStorage.getItem("username");
      document.querySelector(".header .icons .user ").classList.toggle("open");
      document.querySelector(
        ".header .icons .user div:nth-of-type(2)"
      ).onclick = function () {
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("id");
        setTimeout(() => {
          window.location = "login.html";
        }, 1500);
      };
    } else {
      document
        .querySelector(".header .icons .user div:first-of-type")
        .classList.toggle("open");
      document.querySelector(".header .icons .user ").classList.toggle("open");
      document.querySelector(
        ".header .icons .user div:first-of-type span"
      ).onclick = function () {
        window.location = "../html/login.html";
      };
    }
  });
}
//go to home when click on logo
document.querySelector(".logo").addEventListener("click", () => {
  window.location = "../html/home.html";
});
//show search input when click on search icon
document.querySelector(".fa-magnifying-glass").addEventListener("click", () => {
  document.querySelector(".search_container").classList.toggle("open");
  document.querySelector(".fa-magnifying-glass").classList.toggle("open");
  if (document.querySelector(".search_container").classList.contains("open")) {
    document.querySelector(".search_container input").focus();
  }
});

//hide cart if no register
if (localStorage.getItem("username")) {
} else {
  document.querySelector(".header .icons ul li:nth-of-type(3)").style.display =
    "none";
  document.querySelector(".header .icons ul li:nth-of-type(4)").style.display =
    "none";
}
// get items for specific user
let itemsUserCart;
if (localStorage.getItem("cartItems")) {
  itemsUserCart = JSON.parse(localStorage.getItem("cartItems")).filter(
    (item) => {
      return item.idUser == localStorage.getItem("id");
    }
  );
}
function updateNumberOfItem() {
  if (localStorage.getItem("cartItems")) {
    let itemsUserCart = JSON.parse(localStorage.getItem("cartItems")).filter(
      (item) => {
        return item.idUser == localStorage.getItem("id");
      }
    );
    let len = 0;
    for (let i = 0; i < itemsUserCart.length; i++) {
      len = len + parseInt(itemsUserCart[i].qty);
    }
    document.querySelector(".itemsOfCart").innerHTML = len;
  }
}
updateNumberOfItem();
//add to cart
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
localStorage.setItem("itemsUserCart", JSON.stringify(itemsUserCart));
function addToCart(id) {
  if (localStorage.getItem("username")) {
    let requiredItem = ToyKidsAll.find((item) => {
      return item.id == id;
    });
    let DuplicatedItem = cartItems.find((item) => {
      return item.id == requiredItem.id && item.idUser == requiredItem.idUser;
    });
    if (DuplicatedItem) {
      DuplicatedItem.qty = DuplicatedItem.qty + 1;
    } else {
      cartItems.push(requiredItem);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    itemsUserCart = JSON.parse(localStorage.getItem("cartItems")).filter(
      (item) => {
        return item.idUser == localStorage.getItem("id");
      }
    );
    localStorage.setItem("itemsUserCart", JSON.stringify(itemsUserCart));
    updateNumberOfItem();
  } else {
    document.querySelector(".popup-overlay ").style.display = "block";
  }
}
//required reqister when user add in cart
if (document.querySelector(".popup-overlay")) {
  document
    .querySelector(".popup-overlay span")
    .addEventListener("click", () => {
      document.querySelector(".popup-overlay ").style.display = "none";
    });
}
//data of comment
function setDataOfUserForComment() {
  NameDom = document.querySelector(".name");
  commentDom = document.querySelector(".text");
  emailDom = document.querySelector(".email");
  if (localStorage.getItem("email")) {
    NameDom.value = localStorage.getItem("username");
    NameDom.disabled = true;
    emailDom.value = localStorage.getItem("email");
    emailDom.disabled = true;
  }
}
