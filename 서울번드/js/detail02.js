let reviewData = [];
let rvImgArr = [];

async function init() {
  await fetchReview();
  writeReview();
  changeBadge();
}
init();

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
    title: "[서울번드] WGNB PULL GLASS CUP 풀 고블렛 유리컵",
    option: "오렌지",
    price: 28000,
    count: 1,
    id: "orange",
    img: "../img/tea01.jpg",
  },
  {
    title: "[서울번드] WGNB PULL GLASS CUP 풀 고블렛 유리컵",
    option: "핑크 (+3000)",
    price: 31000,
    count: 1,
    id: "pink",
    img: "../img/tea01.jpg",
  },
  {
    title: "[서울번드] WGNB PULL GLASS CUP 풀 고블렛 유리컵",
    option: "블루",
    price: 28000,
    count: 1,
    id: "blue",
    img: "../img/tea01.jpg",
  },
];

let set = new Set();
let orderOptions = [];
let totalAmount = 0;

const selectOption = document.querySelector(".order_option_content select");

let options = `<option>- 필수 옵션을 선택해주세요 -</option>`;
orderItems
  .map((item) => {
    options += `<option>${item.option}</option>`;
  })
  .join("");
selectOption.innerHTML = options;

function addItem() {
  const index = selectOption.options.selectedIndex - 1; //option 제일 첫 요소가 placeholder용이라서 제외
  set.add(orderItems[index]);
  orderOptions = [...set];
  if (orderItems.length === orderOptions.length) return;
}
function calcTotal() {
  totalAmount = orderOptions.reduce((acc, cur) => {
    return acc + cur.price * cur.count;
  }, 0);
  const totalPrice = document.querySelector(".total_price");
  totalPrice.textContent = totalAmount;
}
function writeItem() {
  const totalBoxContents =
    orderOptions
      .map((item) => {
        return `<div class="total_item" data-id=${item.id}>
      <span class="item_name"
      >[서울번드] WGNB PULL GLASS CUP 풀 고블렛 유리컵</span
    >
    <div class="item_info">
      <span class="item_option">- ${item.option}</span>
      <div>
        <span class="data-price">${item.price * item.count}</span>
        <span class="delete_item" data-id=${item.id}
          ><i class="fa-solid fa-xmark"></i
        ></span>
      </div>
    </div>
    <div class="quantity_change">
      <button class="quantity_substract">-</button>
      <input
        class="current_quantity"
        type="text"
        readonly="true"
        min="1"
        max="10"
        value="${item.count}"
        data-id=${item.id}
      />
      <button class="quantity_plus">+</button>
    </div>
      </div>`;
      })
      .join("") +
    `<div class="total_price_box">
    <span class="total_title">총 상품금액</span>
    <span class="total_price">56000</span>
  </div>`;

  const totalBox = document.querySelector(".total_box");
  totalBox.innerHTML = totalBoxContents;

  totalItems = document.querySelectorAll(".total_item");

  totalItems.forEach((box, i) => {
    box.addEventListener("click", (e) => {
      const substract = box.querySelector(".quantity_substract");
      const plus = box.querySelector(".quantity_plus");
      const countInput = box.querySelector(".current_quantity");
      const thisTotalPrice = box.querySelector(".data-price");
      const deleteBtn = box.querySelector(".delete_item i");

      if (e.target === deleteBtn) {
        console.log("click");
        deleteItem(e, i);
      } else if (e.target === plus) {
        if (countInput.value >= 10) return;
        countInput.value++;
        orderOptions[i].count++;
        thisTotalPrice.textContent =
          orderOptions[i].price * orderOptions[i].count;
        calcTotal();
      } else if (e.target === substract) {
        if (countInput.value <= 1) return;
        countInput.value--;
        orderOptions[i].count--;
        thisTotalPrice.textContent =
          orderOptions[i].price * orderOptions[i].count;
        calcTotal();
      }
    });
  });
}
let totalItems;

selectOption.addEventListener("change", () => {
  if (selectOption.options[0].selected) return;

  addItem();
  writeItem();
  calcTotal();
});

function deleteItem(e, i) {
  const filter = orderOptions.filter(
    (item) => item.id !== e.target.parentElement.dataset.id
  );
  set.delete(orderOptions[i]);
  orderOptions[i].count = 1; //참조형이라서 초기화해줘야함
  orderOptions = filter;
  writeItem();
  calcTotal();
}

//장바구니로 보내기
//(장바구니로 이동할거냐는 모달 필요,

const cartBtn = document.querySelector(".cart_btn");
const cartModal = document.querySelector(".cart_modal");
cartBtn.addEventListener("click", () => {
  if (orderOptions.length <= 0) {
    document.querySelector(".alert_modal").classList.add("show");

    setTimeout(() => {
      document.querySelector(".alert_modal").classList.remove("show");
    }, 1000);
    return;
  }
  fetchToCart();
  cartModal.classList.add("show");
});
document.querySelector(".stay").addEventListener("click", () => {
  cartModal.classList.remove("show");
});

//리뷰 영역

const openReview = document.querySelector(".write_review");
const reviewArea = document.querySelector(".review_write_box");

openReview.addEventListener("click", () => {
  reviewArea.classList.add("open_box");
});

const fileInput = document.querySelector(".file_input");
fileInput.addEventListener("change", (e) => {
  addFile(e.target);
  setTimeout(() => {
    rvImgArr = [...document.querySelectorAll(".preview")].map((img) => img.src);
    console.log(rvImgArr);
  }, 300);

  //미리보기 요소 생성 후에 실행되도록 지연
});

function addFile(input) {
  const fileBox = document.querySelector(".thumbnail_box");

  const prevThumbnails = document.querySelectorAll(".thumbnail_box img");
  for (let img of prevThumbnails) {
    img.remove();
  } //

  if (input.files) {
    const fileArr = [...input.files];

    fileArr.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = document.createElement("img");
        img.classList.add("preview");
        img.src = e.target.result;
        fileBox.appendChild(img);
      };

      reader.readAsDataURL(file);
    });
  }
}

const star = document.querySelector(".star");
let starRate = 0;

function mouseMoveHandler(e) {
  starRate =
    5 - Math.floor((star.getBoundingClientRect().right - e.pageX) / 19);
  e.target.textContent = "★".repeat(starRate) + "☆".repeat(5 - starRate);
}
let starMoveHandler = star.addEventListener("mousemove", mouseMoveHandler);

let clicked = false;
let starPickHandler = star.addEventListener("click", (e) => {
  if (!clicked) {
    clicked = true;
    star.removeEventListener("mousemove", mouseMoveHandler);
    starRate =
      5 - Math.floor((star.getBoundingClientRect().right - e.pageX) / 19);
    e.target.textContent = "★".repeat(starRate) + "☆".repeat(5 - starRate);
  } else if (
    clicked &&
    starRate ===
      5 - Math.floor((star.getBoundingClientRect().right - e.pageX) / 19)
  ) {
    star.addEventListener("mousemove", mouseMoveHandler);
    clicked = false;
  }
});

function clearInput() {
  reviewArea.reset();
  starRate = 0;
  star.textContent = "☆☆☆☆☆";
  location.reload();
  // setTimeout(() => {
  // }, 500);
}

reviewArea.addEventListener("submit", (e) => {
  e.preventDefault();
  if (star.textContent === "☆☆☆☆☆") {
    alert("별점을 입력해주세요.");
    e.preventDefault();
    return;
  }
  fetchData();
  setTimeout(() => {
    clearInput();
  }, 800);
});

function fetchData() {
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  const writeDate = year + "/" + month + "/" + date;

  const reviewText = document.querySelector(".review_write_text").value;
  const writerName = document.querySelector(".writer_input").value;

  console.log(writeDate);
  console.log(reviewText);
  console.log(writerName);

  if (document.querySelector(".file_input").value) {
    try {
      fetch("https://shop-aac53-default-rtdb.firebaseio.com/orders.json", {
        method: "POST",
        body: JSON.stringify({
          imgSrc: rvImgArr,
          star: starRate,
          date: writeDate,
          text: reviewText,
          writer: writerName,
        }),
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      fetch("https://shop-aac53-default-rtdb.firebaseio.com/orders.json", {
        method: "POST",
        body: JSON.stringify({
          imgSrc: null,
          star: starRate,
          date: writeDate,
          text: reviewText,
          writer: writerName,
        }),
      });
    } catch (e) {
      console.log(e);
    }
  }
}

async function fetchReview() {
  const response = await fetch(
    "https://shop-aac53-default-rtdb.firebaseio.com/orders.json"
  );
  reviewData = await response.json();
}

function getThumbnail(arr) {
  let content = arr
    .map((img) => {
      return `<img src=${img} alt="리뷰 이미지"/>`;
    })
    .join("");

  return content;
}

let reviewArr = [];
function writeReview() {
  //반복문으로 객체 돌려서 배열에 넣어주고
  //그 배열을 다시 큰 문자열로 만들어서 리뷰래퍼 안에 넣어준다
  for (let rv in reviewData) {
    reviewArr.push(reviewData[rv]);
  }

  const reviewContents = reviewArr
    .map(
      (rv) => `
  <div class="review_box">
  <div class="review_writer">
    <span class="writer_name_title">작성자</span
    ><span class="writer_name">${rv.writer}</span>
  </div>

  <div class="review_img">
  ${rv.imgSrc ? getThumbnail(rv.imgSrc) : ``}
  </div>

  <div class="review_text">
    <span class="review_star">${"★".repeat(rv.star)}</span>
    <p>
     ${rv.text}
    </p>
    <span class="review_date">${rv.date}</span>
  </div>
</div>`
    )
    .join("");

  const reviewWrapper = document.querySelector(".review_wrapper");
  reviewWrapper.innerHTML = reviewContents;
}

//리뷰 개수
function changeBadge() {
  const navReview = document.querySelector(".review_count");
  const rateAmount = document.querySelector(".rate_amount");
  const rateNumber = document.querySelector(".rate_number");
  navReview.textContent = `${reviewArr.length}`;
  rateAmount.textContent = `${reviewArr.length}`;
  //평점 계산
  let sumRate = 0;

  for (let rv of reviewArr) {
    sumRate += rv.star;
  }
  let totalRate = sumRate / reviewArr.length;

  rateNumber.textContent = isNaN(totalRate) ? 0 : totalRate.toFixed(1);
}

//리뷰 필터
const showAllBtn = document.querySelector(".review_all_btn");
const showImgBtn = document.querySelector(".review_img_btn");
showAllBtn.addEventListener("click", () => {
  const allReviews = document.querySelectorAll(".review_box");

  showImgBtn.classList.remove("on");
  showAllBtn.classList.add("on");

  for (let review of allReviews) {
    review.style.display = "block";
  }
});

showImgBtn.addEventListener("click", () => {
  const allReviews = document.querySelectorAll(".review_box");

  showAllBtn.classList.remove("on");
  showImgBtn.classList.add("on");

  for (let i = 0; i < allReviews.length; i++) {
    if (!allReviews[i].children[1].childElementCount) {
      allReviews[i].style.display = "none";
    }
  }
});

const topBtn = document.querySelector(".topBtn");
topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

async function fetchToCart() {
  const response = await fetch(
    "https://shop-aac53-default-rtdb.firebaseio.com/cart.json",
    {
      method: "PUT",
      body: JSON.stringify({
        items: orderOptions,
      }),
    }
  );
}

//상품 문의 모양만
const qnaWriteBtn = document.querySelector(".qna .write_qna");
const qnaArea = document.querySelector(".write_qna_area");
qnaWriteBtn.addEventListener("click", () => {
  qnaArea.classList.add("open_box");
});
