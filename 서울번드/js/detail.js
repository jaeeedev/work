const background = document.querySelector(".side_bar");

background.addEventListener("click", (e) => {
  const input = document.querySelector(".side_btn");
  if (e.target !== e.currentTarget) return;
  input.click();
});

const quantityChangeBox = document.querySelector(".quantity_change");

const quantityChange = (e) => {
  const plus = quantityChangeBox.querySelector(".quantity_plus");
  const substract = quantityChangeBox.querySelector(".quantity_substract");
  const value = quantityChangeBox.querySelector(".current_quantity");
  if (e.target === plus) {
    if (value.value >= 10) return;
    value.value++;
  } else if (e.target === substract) {
    if (value.value <= 1) return;
    value.value--;
  }
};
quantityChangeBox.addEventListener("click", quantityChange);

const openBtn = document.querySelector(".open");
const closeBtn = document.querySelector(".close");
openBtn.addEventListener("click", () => {
  document.querySelector(".detail_content").classList.add("on");
  openBtn.style.display = "none";
  closeBtn.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  document.querySelector(".detail_content").classList.remove("on");
  closeBtn.style.display = "none";
  openBtn.style.display = "block";
});

const writerName = document.querySelector(".writer_name");

const lastString = writerName.textContent.charAt(
  writerName.textContent.length - 1
);

writerName.textContent = writerName.textContent.replace(lastString, "*");

const swiper = new Swiper(".relative_slide", {
  loop: true,
  autoplay: true,
  slidesPerView: 1,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    400: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    600: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    800: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1100: {
      slidesPerView: 5,
      spaceBetween: 10,
    },
  },
});
