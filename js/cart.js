//Initial References
let itemCart = JSON.parse(localStorage.getItem("itemsUserCart")) || [];
let itemsAllCart = JSON.parse(localStorage.getItem("cartItems")) || [];
//draw items of cart in page
function drawCart() {
  document.querySelector(".cartItems").innerHTML = itemCart.map(
    (item, index) => {
      return `
        <tr>
          <td><img src="${item.img}"></td>
          <td class="title "style="cursor: pointer" onclick="ItemId(${
            item.id
          })">${item.title}</td>
          <td>${item.price}</td>
          <td><input type="number" value= "${item.qty}" onchange="updateQTY(${
        item.id
      },${item.idUser},${index})"</input></td>
          <td class="total">${item.qty * item.price}</td>
          <td class="remove" onclick="removedFromCart(${item.id},${
        item.idUser
      })">x</td>
        </tr>`;
    }
  );
}
//store item id
function ItemId(id) {
  localStorage.setItem("ItemId", id);
  window.location = "../html/itemDetails.html";
}
drawCart();
//remove item from cart
function removedFromCart(id, id_user) {
  itemsAllCart = itemsAllCart.filter((item) => {
    return (
      (item.id != id && item.idUser == id_user) ||
      (item.id == id && item.idUser != id_user) ||
      (item.id != id && item.idUser != id_user)
    );
  });
  itemCart = itemCart.filter((item) => {
    return item.id != id && item.idUser == id_user;
  });
  updateNumberOfItem();
  drawCart();
  localStorage.setItem("cartItems", JSON.stringify(itemsAllCart));
  localStorage.setItem("itemsUserCart", JSON.stringify(itemCart));
  window.location.reload();
}
//update total price
function updateTotal() {
  let t = 0;
  document.querySelectorAll(".total").forEach((e) => {
    t = t + +e.innerHTML;
  });
  document.querySelector(".sub_total").innerHTML = `${t.toFixed(3)} EGP`;
  document.querySelector(".totalAll").innerHTML = `${(+t + 70).toFixed(3)} EGP`;
}
updateTotal();
let itemCartUpdate = itemCart || [];
let itemCartAll = itemsAllCart || [];
//update qty of items in cart
function updateQTY(id, idUser, i) {
  itemCartUpdate = itemCart.find((e) => {
    return e.id == id && e.idUser == idUser;
  });
  itemCartAll = itemsAllCart.find((e) => {
    return e.id == id && e.idUser == idUser;
  });
  localStorage.setItem("itemsUserCart", JSON.stringify(itemCart));
  localStorage.setItem("cartItems", JSON.stringify(itemsAllCart));
  itemCartUpdate.qty = parseInt(document.querySelectorAll("td input")[i].value);
  itemCartAll.qty = parseInt(document.querySelectorAll("td input")[i].value);
  document.querySelector(".itemsOfCart").innerHTML =
    document.querySelector(".itemsOfCart").innerHTML;
  if (parseInt(document.querySelectorAll("td input")[i].value) <= 0) {
    removedFromCart(itemCartUpdate.id, itemCartUpdate.idUser);
  }
  localStorage.setItem("itemsUserCart", JSON.stringify(itemCart));
  localStorage.setItem("cartItems", JSON.stringify(itemsAllCart));
  let total = (itemCartAll.qty * itemCartAll.price).toFixed(3);
  document.querySelectorAll(".total")[i].innerHTML = total;
  updateTotal();
  updateNumberOfItem();
}
//clear cart
document.querySelector(".clear").addEventListener("click", () => {
  itemsAllCart = itemsAllCart.filter((item) => {
    return item.idUser != localStorage.getItem("id");
  });
  itemCart = [];
  updateNumberOfItem();
  drawCart();
  localStorage.setItem("cartItems", JSON.stringify(itemsAllCart));
  localStorage.setItem("itemsUserCart", JSON.stringify(itemCart));
  window.location.reload();
});
