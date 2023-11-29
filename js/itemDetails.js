//Initial References
let ItemDetailsDom = document.querySelector(".ItemDetails");
let id_user = localStorage.getItem("id");
let viewed = JSON.parse(localStorage.getItem("viewed")) || [];
let ItemId = localStorage.getItem("ItemId");
// choosen item
let choosenItem = ToyKidsAll.find((item) => {
  return item.id == ItemId;
});
let viewedItem = viewed.find((item) => {
  return item.id == choosenItem.id && item.idUser == choosenItem.idUser;
});
if (viewedItem) {
} else {
  viewed.push(choosenItem);
}
localStorage.setItem("viewed", JSON.stringify(viewed));
// draw item details in page
ItemDetailsDom.innerHTML = `
  <div class="img image-container" id="image-container">
    <img src="${choosenItem.img}"  id="product-image" >
  </div>
  <div id="mouse-overlay"></div>
  <div id="overlay"></div>
  <div class="Iteminfo">
    <h2>${choosenItem.title}</h2>
    <p class="price">${choosenItem.price} EGP</p>
    <p class="available">Availability: <span>In Stock</span></p>
    <p>${choosenItem.description}</p>
    <!-- <p class="size"><span></span></p> -->
    <button onclick="addToCart(${choosenItem.id})"> Add to cart</button>
  </div>`;
document.querySelector(
  "#overlay"
).style.background = `url("${choosenItem.img}")`;
//zoom in image when hover on it
//Initial References
let imageContainer = document.getElementById("image-container");
let productImage = document.getElementById("product-image");
let overlay = document.getElementById("overlay");
let mouseOverlay = document.getElementById("mouse-overlay");
//events object(stores events for touch,mouse)
let events = {
  mouse: {
    move: "mousemove",
  },
  touch: {
    move: "touchmove",
  },
};
//initially blank
let deviceType = "";
//Checks for device type
function isTouchDevice() {
  try {
    //We try to create touch event (it would fail for desktops and throw error)
    deviceType = "touch";
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
}
//hides overlay
const hideElement = () => {
  overlay.style.display = "none";
  mouseOverlay.style.display = "none";
};
isTouchDevice();
imageContainer.addEventListener(events[deviceType].move, (e) => {
  try {
    var x = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
    var y = !isTouchDevice() ? e.pageY : e.touches[0].pageY;
  } catch (e) {}
  let imageWidth = imageContainer.offsetWidth;
  let imageHeight = imageContainer.offsetHeight;
  if (
    imageWidth - (x - imageContainer.offsetLeft) < 15 ||
    x - imageContainer.offsetLeft < 15 ||
    imageHeight - (y - imageContainer.offsetTop) < 15 ||
    y - imageContainer.offsetTop < 15
  ) {
    hideElement();
  } else {
    overlay.style.display = "block";
    mouseOverlay.style.display = "inline-block";
  }
  var posX = ((x - imageContainer.offsetLeft) / imageWidth).toFixed(4) * 100;
  var posY = ((y - imageContainer.offsetTop) / imageHeight).toFixed(4) * 100;
  overlay.style.backgroundPosition = posX + "%" + posY + "%";
  //move the overlay with cursor
  mouseOverlay.style.top = y + "px";
  mouseOverlay.style.left = x + "px";
});
//TABS
//Initial References
let tabsDom = document.querySelectorAll(".tabs h2");
let tabsContentDom = document.querySelectorAll(".tabs_content > div");
//show data of choosen tap
tabsDom.forEach((tab, index) => {
  tab.addEventListener("click", (e) => {
    tabsDom.forEach((e) => {
      e.classList.remove("active");
    });
    tabsContentDom.forEach((e) => {
      e.classList.remove("active");
    });
    tabsDom[index].classList.add("active");
    tabsContentDom[index].classList.add("active");
  });
});
// info about comment user
let NameDom, commentDom, emailDom;
setDataOfUserForComment();
let comment = JSON.parse(localStorage.getItem("comment")) || [];
drawComment();
//add review of user in page
document
  .querySelector(".add_comment form button ")
  .addEventListener("click", (e) => {
    e.preventDefault();
    if (NameDom.value == "" || emailDom.value == "" || commentDom.value == "") {
      document.querySelector(".add_comment form p ").style.display = "block";
      NameDom.onfocus = function () {
        document.querySelector(".add_comment form p ").style.display = "none";
      };
      emailDom.onfocus = function () {
        document.querySelector(".add_comment form p ").style.display = "none";
      };
      commentDom.onfocus = function () {
        document.querySelector(".add_comment form p ").style.display = "none";
      };
    } else {
      let commentUser = {
        id_item: ItemId,
        id_comment: Date.now() + 1,
        id_user: localStorage.getItem("id") || Date.now(),
        img: "",
        name: NameDom.value,
        email: emailDom.value,
        date: new Date().toUTCString().slice(0, 16),
        review: commentDom.value,
      };
      comment.push(commentUser);
      localStorage.setItem("comment", JSON.stringify(comment));
      drawComment();
    }
  });
//draw comment in page
function drawComment() {
  document.querySelector(".review").innerHTML = comment
    .map((e) => {
      if (
        //allow delet comment
        e.id_user == localStorage.getItem("id") &&
        e.id_item == localStorage.getItem("ItemId")
      ) {
        return `                   
        <div class="review_user">
          <div class="img">
            <img src="../photo/user.jpg">
          </div>
          <div class="comment">
            <h2>${e.name} - <span class="date">${e.date}</span></h2>
            <p>${e.review}</p>
            <button onclick="removeComment(${e.id_comment})">delete</button>
          </div>
        </div>`;
      } else if (
        e.id_user != localStorage.getItem("id") &&
        e.id_item == localStorage.getItem("ItemId")
      ) {
        return `
        <div class="review_user">
          <div class="img">
            <img src="../photo/user.jpg">
          </div>
          <div class="comment">
            <h2>${e.name} - <span class="date">${e.date}</span></h2>
            <p>${e.review}</p>
          </div>
        </div>`;
      }
    })
    .join("");
}
//remove comment
function removeComment(id) {
  comment = comment.filter((item) => {
    return item.id_comment != id;
  });
  localStorage.setItem("comment", JSON.stringify(comment));
  drawComment();
}
