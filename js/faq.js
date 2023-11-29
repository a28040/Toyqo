//show or hide answer of choosen question
document.querySelectorAll(".faq div button").forEach((e) => {
  e.addEventListener("click", (e) => {
    e.stopPropagation();
    e.target.children[1].classList.toggle("fa-plus");
    e.target.classList.toggle("open");
    document.querySelectorAll(".faq div  p").forEach((p) => {
      if (p.dataset.n == e.target.dataset.n) {
        p.classList.toggle("open");
      }
    });
  });
});
