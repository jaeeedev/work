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

const fixedNav = document.querySelector(".nav_bar");
const detailContent = document.querySelector(".detail_content");

window.addEventListener(
  "scroll",
  () => {
    const sideBar = document.querySelector(".side_bar");
    if (window.pageYOffset >= 64) {
      sideBar.classList.add("fixed");
    } else {
      sideBar.classList.remove("fixed");
    }

    if (window.pageYOffset >= detailContent.getBoundingClientRect().top) {
      fixedNav.classList.add("fixed");
    } else {
      fixedNav.classList.remove("fixed");
    }

    return;
  },
  { passive: true }
);

//오더 영역
let orderItems = [
  {
    option: "오렌지",
    price: 28000,
  },
  {
    option: "핑크",
    price: 31000,
  },
  { option: "블루", price: 28000 },
];

const selectOption = document.querySelector(".order_option_content select");

let options = `<option>- 필수 옵션을 선택해주세요 -</option>`;
orderItems
  .map((item) => {
    options += `<option>${item.option}</option>`;
  })
  .join("");
selectOption.innerHTML = options;

function changePrice() {
  const totalPrice = document.querySelector(".total_price");
  const optionPrice = document.querySelector(".data-price");
  optionPrice.textContent = orderItems[0].price;
}
changePrice();

let orderContent = "";
orderItems.map((item) => {
  orderContent += `<div class="total_item">
<span class="item_name"
  >[서울번드] WGNB PULL GLASS CUP 풀 고블렛 유리컵</span
>
<div class="item_info">
  <span class="item_option">- ${item.option}</span>
  <div>
    <span class="data-price">${item.price}</span>
    <span class="delete_item"
      ><i class="fa-solid fa-xmark"></i
    ></span>
  </div>
</div>
<div class="quantity_change">
  <button class="quantity_substract">-</button>
  <input
    class="current_quantity"
    type="number"
    min="1"
    max="10"
    value="2"
  />
  <button class="quantity_plus">+</button>
</div>
</div>`;
});
function addItem() {}

selectOption.addEventListener("change", (e) => {});

//상품 후기

//리뷰 영역

//리뷰 개수
const reviews = document.querySelectorAll(".review_box");
const navReview = document.querySelector(".go_review a span");
navReview.textContent = `${reviews.length}`;

//글번호

const topBtn = document.querySelector(".topBtn");
topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
