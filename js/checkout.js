//data of checkout
itemCheckOut = JSON.parse(localStorage.getItem("itemsUserCart"));
let itemCheckOutDom = itemCheckOut.map((e) => {
  return `
    <tr>
      <td>
        ${e.title} × <span style="font-weight:bold">${e.qty}</span>
      </td>
      <td>
        ${(e.qty * e.price).toFixed(3)} EGP
      </td>
    </tr>
    `;
});
document.querySelector(".items_checkout").innerHTML = itemCheckOutDom.join("");
t = 0;
itemCheckOut.map((e) => {
  return (t = e.price * e.qty + t);
});
document.querySelector(".total").innerHTML = `${t.toFixed(3)} EGP`;
document.querySelector(".subtotal").innerHTML = `${(t + 70).toFixed(3)} EGP`;
