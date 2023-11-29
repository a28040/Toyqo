let viewedItems = JSON.parse(localStorage.getItem("viewed")) || [];
let ViewedUser = [] || JSON.parse(localStorage.getItem("viewedForUser"));
//draw items that viewed in page
drawViewed();
function drawViewed() {
  let ToyKidsviewedDom = viewedItems
    .map((e) => {
      if (e.idUser == localStorage.getItem("id")) {
        ViewedUser.push(e);
        return `
        <div class="item">
          <img src="${e.img}">
            <span class="remove" onclick="removeFromViewed(${e.id},${e.idUser})">Remove</span>
            <h2 onclick="ItemId(${e.id})">${e.title}</h2>
            <p>${e.price} EGP</p>
            <p>${e.describtion}</p>
          <button onclick="addToCart(${e.id})">Add to cart</button>
        </div>    
    `;
      }
    })
    .join("");
  localStorage.setItem("viewedForUser", JSON.stringify(ViewedUser));
  document.querySelector(".shop_section").innerHTML = ToyKidsviewedDom;
  if (ViewedUser.length == 0) {
    document.querySelector(".Not_viewed").style.display = "block";
  }
}
//get id of item that viewd
function ItemId(id) {
  localStorage.setItem("ItemId", id);
  window.location = "../html/itemDetails.html";
}
//remove item from view
let viewedForUser = JSON.parse(localStorage.getItem("viewedForUser")) || [];
function removeFromViewed(id, id_user) {
  viewedItems = viewedItems.filter((item) => {
    return (
      (item.id != id && item.idUser == id_user) ||
      (item.id == id && item.idUser != id_user) ||
      (item.id != id && item.idUser != id_user)
    );
  });
  localStorage.setItem("viewed", JSON.stringify(viewedItems));
  drawViewed();
  viewedForUser = viewedForUser.filter((item) => {
    return item.id != id && item.idUser == id_user;
  });
  localStorage.setItem("viewedForUser", JSON.stringify(viewedForUser));
  if (JSON.parse(localStorage.getItem("viewedForUser")).length == 0) {
    document.querySelector(".Not_viewed").style.display = "block";
  }
}
