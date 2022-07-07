const background = document.querySelector(".side_bar");

background.addEventListener("click", (e) => {
  const input = document.querySelector(".side_btn");
  if (e.target !== e.currentTarget) return;
  input.click();
});

const artistProducts = document.querySelectorAll(".artist_pd");

artistProducts.forEach((el) =>
  el.addEventListener("mouseenter", () => {
    const imgUrl = el.children[0].src;
    document.querySelector(".artist_bg img").src = imgUrl;
  })
);
