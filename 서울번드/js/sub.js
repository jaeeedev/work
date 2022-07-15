let cartData = [];
let localData = [];

async function init() {
  await fetchCartData();
  drawCart();
  changeAmount();
  checkAll();
  checkEach();
}

init();

async function fetchCartData() {
  const response = await fetch(
    "https://shop-aac53-default-rtdb.firebaseio.com/cart.json"
  );
  const data = await response.json();
  cartData = data.items;
  localData = [...cartData];
}

function drawCart() {
  const cartBox = document.querySelector(".mobile_wrap");

  const cartContents = cartData
    .map(
      (data) => `<div class="item_box">
  <input type="checkbox" class="item_check" />
  <div class="item_detail">
    <div class="img_box">
      <img src=${data.img} alt="제품 썸네일" />
    </div>
    <div class="text_box">
      <div class="title_box">
        <h4><a href="./detail.html">${data.title}</a></h4>
        <button class="cancel"><i class="fa-solid fa-x"></i></button>
        <span class="option">[옵션: ${data.option}]</span>
      </div>
      <div class="price_box">
        <div class="price_calc">
          <button class="substract">-</button
          ><span class="product_quantity">${data.count}</span>
          <button class="plus">+</button>
        </div>
        <span class="product_price">${data.price * data.count}</span>
      </div>
    </div>
  </div>
</div>`
    )
    .concat(
      `<div class="whole_price">
    <div>
      <span class="whole_price_title">총 상품금액</span
      ><span class="whole_price_price">84,000</span>
    </div>
    <div>
      <span class="whole_price_title">배송비</span
      ><span class="shipping_price">4,000</span>
    </div>
    <hr />
    <div class="total_box">
      <span class="whole_price_title">결제예정금액</span
      ><span class="total_price">88,000</span>
    </div>
    <div class="price_btns">
      <button class="buy_pick">선택상품구매</button>
      <button class="buy_all">전체상품구매</button>
    </div>
  </div>`
    )
    .join("");

  cartBox.innerHTML = cartContents;
}

const totalPrice = document.querySelector(".total_price");
const allPrice = document.querySelectorAll(".product_price");
const quantity = document.querySelectorAll(".product_quantity");

//체크박스

let bingoCount = 0;

function checkAll() {
  const checkAll = document.querySelector("#check_all");

  checkAll.addEventListener("change", () => {
    const allInputs = document.querySelectorAll(".item_box input");
    const productSum = document.querySelector(".total_number");
    const billPrice = document.querySelector(".total_bill_price");

    if (checkAll.checked) {
      allInputs.forEach((input) => (input.checked = true));
      drawTotal();
      bingoCount = allInputs.length;
    } else {
      allInputs.forEach((input) => (input.checked = false));
      productSum.textContent = 0;
      billPrice.textContent = 4000;
      bingoCount = 0;
    }
  });
}

function checkEach() {
  const checkboxes = document.querySelectorAll(".item_check");
  const productSum = document.querySelector(".total_number");
  const checkAll = document.querySelector("#check_all");
  const totalBill = document.querySelector(".total_bill_price");

  checkboxes.forEach((cb, i) => {
    cb.addEventListener("change", () => {
      if (cb.checked) {
        productSum.textContent =
          productSum.textContent * 1 +
          localData[i].price * 1 * localData[i].count;
        bingoCount++;
        if (bingoCount === checkboxes.length) {
          checkAll.checked = true;
        }
      } else {
        productSum.textContent =
          productSum.textContent * 1 -
          localData[i].price * 1 * localData[i].count;
        bingoCount--;
        checkAll.checked = false;
      }
    });
  });
}

function drawTotal() {
  const productSum = document.querySelector(".total_number");
  const billPrice = document.querySelector(".total_bill_price");

  productSum.textContent = localData.reduce(
    (acc, data) => acc + data.count * data.price,
    0
  );

  billPrice.textContent = productSum.textContent * 1 + 4000;
}

//총 금액 계산 (데이터가 있을 경우 계산 시 절대 화면의 textContent로 계산하지 말것)

function changeAmount() {
  const cartItems = document.querySelector(".mobile_wrap");
  const itembox = cartItems.querySelectorAll(".item_box");

  itembox.forEach((box, i) =>
    box.addEventListener("click", (e) => {
      const subsBtn = box.querySelector(".substract");
      const addBtn = box.querySelector(".plus");
      let amount = box.querySelector(".product_quantity");
      let price = box.querySelector(".product_price");
      const checkboxes = document.querySelectorAll(".item_check");

      if (e.target === subsBtn) {
        if (amount.textContent <= 1) return;

        amount.textContent--;
        localData[i].count--;
        price.textContent = localData[i].price * localData[i].count;

        if (checkboxes[i].checked) {
          drawTotal();
        }
      } else if (e.target === addBtn) {
        if (amount.textContent >= 10) return;

        amount.textContent++;
        localData[i].count++;
        price.textContent = localData[i].price * localData[i].count;
        if (checkboxes[i].checked) {
          drawTotal();
        }
      }
    })
  );
}

//마지막에 이 화면에서 벗어나려고 하면 로컬데이터 호다닥 put해주기
