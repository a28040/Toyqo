//draw all items of shop in page
document.querySelector(".shop_section").innerHTML = ToyKidsAll.map((e) => {
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
//virtical
//active class on selected icon
document.querySelectorAll(".icon_grid i").forEach((e) => {
  e.addEventListener("click", (el) => {
    document.querySelectorAll(".icon_grid i").forEach((e) => {
      e.classList.remove("active");
    });
    el.target.classList.add("active");
    virtical();
  });
});
//virtical mode
function virtical() {
  if (
    document.querySelectorAll(".icon_grid i")[1].classList.contains("active")
  ) {
    document.querySelector(".shop_section").classList.add("virtical");
    document.querySelectorAll(".item").forEach((e) => {
      e.classList.add("virtical");
    });
    document.querySelectorAll(".item img").forEach((e) => {
      e.classList.add("virtical");
    });
    document.querySelectorAll(".item>div").forEach((e) => {
      e.classList.add("virtical");
    });
    document.querySelectorAll(".description").forEach((e) => {
      e.classList.add("virtical");
    });
    search();
  } else {
    document.querySelector(".shop_section").classList.remove("virtical");
    document.querySelectorAll(".item").forEach((e) => {
      e.classList.remove("virtical");
    });
    document.querySelectorAll(".item img").forEach((e) => {
      e.classList.remove("virtical");
    });
    document.querySelectorAll(".item>div").forEach((e) => {
      e.classList.remove("virtical");
    });
    document.querySelectorAll(".description").forEach((e) => {
      e.classList.remove("virtical");
    });
    search();
  }
}
//search in items
let productItemDom = document.querySelectorAll(".shop_section .item");

if (localStorage.getItem("text")) {
  document.querySelector(".search_container").classList.add("open");
  document.querySelector(".search_container input").value =
    localStorage.getItem("text");
  document.querySelector(".search_container input").focus();

  search();
}
document
  .querySelector(".search_container input")
  .addEventListener("input", search);
function search() {
  for (let i = 0; i < ToyKidsAll.length; i++) {
    if (
      ToyKidsAll[i].title
        .toLowerCase()
        .includes(
          document
            .querySelector(".search_container input")
            .value.toLowerCase()
            .trim()
        ) == false
    ) {
      productItemDom[i].style.display = "none";
    } else {
      if (
        document
          .querySelectorAll(".icon_grid i")[1]
          .classList.contains("active")
      ) {
        productItemDom[i].style.display = "flex";
      } else {
        productItemDom[i].style.display = "block";
      }
    }
  }
  if (window.location.reload) {
    localStorage.removeItem("text");
  }
}
