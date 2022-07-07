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

const swiper = new Swiper(".swiper1", {
  loop: true,
  autoplay: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

new Swiper(".swiper2", {
  loop: true,
  slidesPerView: 2,
  pagination: {
    el: ".swiper-pagination",
  },
});
