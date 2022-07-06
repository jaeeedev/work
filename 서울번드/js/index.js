const main_swiper = new Swiper(".main_slide .swiper", {
  loop: true,
  autoplay: true,

  pagination: {
    el: ".swiper-pagination",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const product_swiper = new Swiper(".product_toggle .swiper", {
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 1,
  spaceBetween: 30,
  breakpoints: {
    375: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
});

const event_swiper = new Swiper(".events .swiper", {
  autoplay: true,
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const kitchen_swiper = new Swiper(".kitchen_toggle .swiper", {
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 1,
  spaceBetween: 30,
  breakpoints: {
    375: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
});

const artistProducts = document.querySelectorAll(".artist_pd");

artistProducts.forEach((el) =>
  el.addEventListener("mouseenter", () => {
    const imgUrl = el.children[0].src;
    document.querySelector(".artist_bg img").src = imgUrl;
  })
);
