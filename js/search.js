//search in items
let productItemDom = document.querySelectorAll(".shop_section .item");
document.querySelector(".search_container").addEventListener("input", (e) => {
  localStorage.setItem("text", e.target.value.trim());
  window.location = "../html/shop.html";
});
