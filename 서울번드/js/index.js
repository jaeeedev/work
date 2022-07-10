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

//이달의 ~~
new Swiper(".swiper_new", {
  loop: true,
  autoplay: true,
  slidesPerView: 2,
  spaceBetween: 10,

  breakpoints: {
    510: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
  },
});

new Swiper(".swiper_best", {
  loop: true,
  autoplay: true,
  slidesPerView: 2,
  spaceBetween: 10,

  breakpoints: {
    510: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
  },
});

const monthlyBtns = document.querySelector(".product_btns");
monthlyBtns.addEventListener("click", (e) => {
  const newBtn = monthlyBtns.querySelector(".product_new");
  const bestBtn = monthlyBtns.querySelector(".product_best");
  const newSlide = document.querySelector(".swiper_new");
  const bestSlide = document.querySelector(".swiper_best");

  if (e.target === newBtn) {
    newSlide.classList.add("active");
    bestSlide.classList.remove("active");
    newBtn.classList.add("active");
    bestBtn.classList.remove("active");
  } else if (e.target === bestBtn) {
    bestSlide.classList.add("active");
    newSlide.classList.remove("active");
    bestBtn.classList.add("active");
    newBtn.classList.remove("active");
  }
});

//프로모션
new Swiper(".event_slide", {
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

//작가

const artistPdBox = document.querySelector(".artist_product");
console.log(window.getComputedStyle(artistPdBox).height);

//번더의 취향

new Swiper(".swiper_wellness", {
  loop: true,
  autoplay: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
  },
});

new Swiper(".swiper_kitchen", {
  loop: true,
  autoplay: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
  },
});

//공지사항 슬라이드

const eventSlide = document.querySelector(".notice_slide");
const slideNodes = document.querySelectorAll(".notice_slide .slide");
const cloneFirst = slideNodes[0].cloneNode(true);
const cloneLast = slideNodes[slideNodes.length - 1].cloneNode(true);
let currentMove = 0;
eventSlide.append(cloneFirst);
eventSlide.insertBefore(cloneLast, slideNodes[0]);

console.log(currentMove);

setInterval(() => {
  currentMove += 60;
  eventSlide.style.transform = `translateY(-${currentMove}px)`;
  eventSlide.style.transition = "all 2s 1s";

  if (currentMove >= 300) {
    setTimeout(() => {
      eventSlide.style.transition = "none";
      currentMove = 0;
      eventSlide.style.transform = `translateY(-${currentMove})`;
    }, 2900);
  }
}, 3000);
