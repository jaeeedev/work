const background = document.querySelector(".side_bar");

background.addEventListener("click", (e) => {
  const input = document.querySelector(".side_btn");
  if (e.target !== e.currentTarget) return;
  input.click();
});

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
    count: 1,
    id: "orange",
  },
  {
    option: "핑크 (+3000)",
    price: 31000,
    count: 1,
    id: "pink",
  },
  {
    option: "블루",
    price: 28000,
    count: 1,
    id: "blue",
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
        <span class="data-price">${item.price}</span>
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
        //input 의 value는 orderoptions의 count값으로 렌더링되고있어서 count 잡아줘야하는데,,, 참조 타입이라 삭제할때 골치라 어떻게 짜야할지가 고민
        //삭제할때 카운트 초기화시켜
        orderOptions[i].count++;
      } else if (e.target === substract) {
        if (countInput.value <= 1) return;
        countInput.value--;
      }
    });
  });
}
let totalItems;

//옵션 선택하면 -> 아이템 추가되고 -> 총계 연산하고 -> 화면에 그려짐

selectOption.addEventListener("change", () => {
  if (selectOption.options[0].selected) return;

  addItem();
  writeItem();
  calcTotal();
});

//변화 발생하면 -> 변동사항 발생하고 -> 총계 연산하고 -> 다시 화면에 그려짐(변화의 경우 -> input 수량 변경 / 요소 삭제)

function changeAmount() {}

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

//상품 후기

//리뷰 영역

function readURL(input) {
  if (input.files && input.files[0]) {
    // console.log(input.files);
    var reader = new FileReader();
    reader.onload = function (e) {
      document.querySelector(
        ".thumbnail_box"
      ).innerHTML = `<img class="preview" alt="" src="" />`;

      document.querySelector(".preview").src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    document.querySelector(".preview").src = "";
  }
}

async function fetchData() {
  await fetch("https://shop-aac53-default-rtdb.firebaseio.com/orders.json", {
    method: "POST",
    body: JSON.stringify({
      //imgSrc : 사진주소
      //star: 별점
      //
      test: "Hi",
    }),
  });
}

async function fetchReview() {
  const response = await fetch(
    "https://shop-aac53-default-rtdb.firebaseio.com/orders.json"
  );
  const data = await response.json();
  console.log(data);
}

// fetchData();
// fetchReview();

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
