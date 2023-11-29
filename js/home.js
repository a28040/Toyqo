//start landing page
let landingPagesArray = [
  "../photo/slide4.jpg",
  "../photo/slide5.jpg",
  "../photo/slide6.jpg",
];
let bg = [
  "rgb(255 153 204 / 77%)",
  "rgb(0 196 204 / 77%)",
  "var(--ground--color)",
];
let hlandingpage = [
  "Toys for all kids",
  "PLAY AND LEARN",
  "BEAST toys for kids",
];
//Initial References
let counter = 0;
let btnright = document.querySelector(".landing-page .right-arrow");
let btnleft = document.querySelector(".left-arrow");
//left icon
btnleft.addEventListener("click", (e) => {
  counter--;
  checker();
  slider();
});
//rigth icon
btnright.addEventListener("click", (e) => {
  counter++;
  checker();
  slider();
});
slider();
function slider() {
  document.querySelector(
    ".landing-page"
  ).style.backgroundImage = `url(${landingPagesArray[counter]})`;
  document
    .querySelector(".landing-page p")
    .appendChild(document.createElement("span"));
  document.querySelector(".landing-page h2").style.background = bg[counter];
  document.querySelector(".landing-page h2").innerHTML = hlandingpage[counter];
}
//if reached to last img--->back to first img and reverse
function checker() {
  if (counter == -1) {
    counter = 2;
  }
  if (counter == 3) {
    counter = 0;
  }
}
setInterval(function () {
  counter++;
  checker();
  slider();
}, 3000);

//end landing page
//Featured Collection
//draw Featured Collection in page
let FeaturedToy = ToyKidsAll;
FeaturedToy.length = 8;
document.querySelector(".shop_section").innerHTML = FeaturedToy.map((e) => {
  return `
    <div class="item">
                <img src="${e.img}">
                <div>
                    <h2 onclick="ItemId(${e.id})">${e.title}</h2>
                    <p>${e.price} EGP</p>
                    <p class="description">${e.description}
                    </p>
                    <button onclick="addToCart(${e.id})">Add to cart</button>
                </div>
    </div>
    `;
}).join("");
//store id of choosen item
function ItemId(id) {
  localStorage.setItem("ItemId", id);
  window.location = "../html/itemDetails.html";
}
//blog
//draw all article in page
blog.length = 3;
document.querySelector(".blog").innerHTML = blog
  .map((article) => {
    return `
      <div class="article_container">
            <div class="img">
                <img src="${article.img}">
            </div>
            <div class="info">
                <p>${article.date} | ${article.owner}</p>
                <h2 onclick="articleId(${article.id})">${article.title}</h2>
                <p  onclick="articleId(${article.id})"><i class="fa-solid fa-arrow-right"></i>READ MORE</p>
            </div>
        </div>
    `;
  })
  .join("");
//store id of choosen article
function articleId(id) {
  localStorage.setItem("articleId", id);
  window.location = "../html/articleDetails.html";
}
//brands
let w;
function resizeIcon() {
  document.querySelectorAll(".carousel img").forEach((e) => {
    e.style.height = `${e.width}px`;
    w = e.width;
  });
}
resizeIcon();
window.addEventListener("resize", resizeIcon);
const carousal = document.querySelector(".carousel");
//icon scrolling
let firstimg = document.querySelectorAll(".carousel img")[0];
firstimgWidth = firstimg.width + 14;
document.querySelectorAll(".brand i").forEach((e) => {
  e.addEventListener("click", (e) => {
    if (e.target.classList.contains("left") == true) {
      carousal.scrollLeft -= firstimgWidth;
      if (carousal.scrollLeft == 0) {
        carousal.scrollLeft = carousal.scrollWidth - carousal.clientWidth;
      }
    } else {
      carousal.scrollLeft += firstimgWidth;
      if (
        carousal.scrollLeft >=
        carousal.scrollWidth - carousal.clientWidth - 10
      ) {
        carousal.scrollLeft = 0;
      }
    }
  });
});

//draw best product
let bestProduct = JSON.parse(localStorage.getItem("ToyKids")).slice(1, 6);
document.querySelector(".best_seller .slider .slide1").innerHTML =
  bestProduct.map((e) => {
    return `
  <div class="item">
            <div class="img">
              <img src=${e.img}>
            </div>
            <div class="info">
              <h3 onclick="ItemId(${e.id})">${e.title}</h3>
              <p>${e.price} EGP</p>
            </div>
          </div>
  
  `;
  });
let bestProduct2 = JSON.parse(localStorage.getItem("ToyKids")).slice(6, 11);
document.querySelector(".best_seller .slider .slide2").innerHTML =
  bestProduct2.map((e) => {
    return `
  <div class="item">
            <div class="img">
              <img src=${e.img}>
            </div>
            <div class="info">
              <h3 onclick="ItemId(${e.id})">${e.title}</h3>
              <p>${e.price} EGP</p>
            </div>
          </div>
  
  `;
  });
//draw onsale product
let onSaleProduct = JSON.parse(localStorage.getItem("ToyKids")).slice(5, 10);
document.querySelector(".on_sale .slider .slide1").innerHTML =
  onSaleProduct.map((e) => {
    return `
  <div class="item">
            <div class="img">
              <img src=${e.img}>
            </div>
            <div class="info">
              <h3 onclick="ItemId(${e.id})">${e.title}</h3>
              <p>${e.price} EGP</p>
            </div>
          </div>
  
  `;
  });
let onSaleProduct2 = JSON.parse(localStorage.getItem("ToyKids")).slice(11, 16);
document.querySelector(".on_sale .slider .slide2").innerHTML =
  onSaleProduct2.map((e) => {
    return `
  <div class="item">
            <div class="img">
              <img src=${e.img}>
            </div>
            <div class="info">
              <h3 onclick="ItemId(${e.id})">${e.title}</h3>
              <p>${e.price} EGP</p>
            </div>
          </div>
  
  `;
  });
//best sale product slider
const slideBest = document.querySelectorAll(".slider")[0];
//icon scrolling
let firstSlideBest = document.querySelectorAll(".best_seller .slider >div")[0];
let firstSlideBestWidth = firstSlideBest.clientWidth;
document.querySelectorAll(".best_seller i").forEach((e) => {
  e.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-arrow-left") == true) {
      slideBest.scrollLeft -= firstSlideWidth;
    } else {
      slideBest.scrollLeft += firstSlideWidth;
    }
  });
});
//on sale product slider
const slide = document.querySelectorAll(".slider")[1];
//icon scrolling
let firstSlide = document.querySelectorAll(".slider >div")[0];
console.log(firstSlide.clientWidth);
let firstSlideWidth = firstSlide.clientWidth;
document.querySelectorAll(".on_sale i").forEach((e) => {
  e.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-arrow-left") == true) {
      slide.scrollLeft -= firstSlideWidth;
    } else {
      slide.scrollLeft += firstSlideWidth;
    }
  });
});
//go to shop
document.querySelector(".product img ").addEventListener("click", (e) => {
  window.location = "../html/shop.html";
});
