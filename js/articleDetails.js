// choosen article
let choosenArticle = blog.find((e) => {
  return e.id == localStorage.getItem("articleId");
});
// draw article details in page
document.querySelector(".blog_details").innerHTML = `
<div class="img">
                <img src="${choosenArticle.img}">
            </div>
            <h2>${choosenArticle.title}</h2>
            <p>By ${choosenArticle.owner} | ${choosenArticle.date} |<span>${choosenArticle.no_comment} </span> COMMENTS</p>
            <p> ${choosenArticle.p1}
            </p>
            <p class="qoute">
                ${choosenArticle.quote}
            </p>
            <p>${choosenArticle.p2}
            </p>
`;
// info about comment user
let NameDom, commentDom, emailDom;
setDataOfUserForComment();
let commentArticle = JSON.parse(localStorage.getItem("commentArticle")) || [];
//number of comments
function noComments() {
  let Comments = commentArticle.filter((e) => {
    return e.id_article == localStorage.getItem("articleId");
  });
  document.querySelector(".reviews>h2:first-of-type span").innerHTML =
    Comments.length;
}
//draw comment in page
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
        id_article: localStorage.getItem("articleId"),
        id_comment: Date.now() + 1,
        id_user: localStorage.getItem("id") || Date.now(),
        img: "",
        name: NameDom.value,
        email: emailDom.value,
        date: new Date().toUTCString().slice(0, 16),
        review: commentDom.value,
      };
      commentArticle.push(commentUser);
      localStorage.setItem("commentArticle", JSON.stringify(commentArticle));
      drawComment();
      noComments();
    }
  });
function drawComment() {
  document.querySelector(".review").innerHTML = commentArticle
    .map((e) => {
      if (
        e.id_user == localStorage.getItem("id") &&
        e.id_article == localStorage.getItem("articleId")
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
        e.id_article == localStorage.getItem("articleId")
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
drawComment();
noComments();
//remove comment
function removeComment(id) {
  commentArticle = commentArticle.filter((item) => {
    return item.id_comment != id;
  });
  localStorage.setItem("commentArticle", JSON.stringify(commentArticle));
  drawComment();
  noComments();
}
