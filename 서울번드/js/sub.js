const background = document.querySelector(".side_bar");

background.addEventListener("click", (e) => {
  const input = document.querySelector(".side_btn");
  if (e.target !== e.currentTarget) return;
  input.click();
});

const totalPrice = document.querySelector(".total_price");
const allPrice = document.querySelectorAll(".product_price");
const quantity = document.querySelectorAll(".product_quantity");
//합계는 당근 리듀스지

const checkAll = document.querySelector("#check_all");
const itemCheckBox = document.querySelectorAll(".item_check");

checkAll.addEventListener("change", () => {
  const allInputs = document.querySelectorAll(".item_box input");
  if (checkAll.checked) {
    allInputs.forEach((input) => (input.checked = true));
  } else {
    allInputs.forEach((input) => (input.checked = false));
  }
});

//총 금액 계산
const totalProductPrice = document.querySelector(
  ".total_product_price .total_number"
);
const billPrice = document.querySelector(".total_bill_price");
billPrice.textContent =
  totalProductPrice.textContent * 1 +
  document.querySelector(".ship_price .total_number").textContent * 1;

const cartItems = document.querySelector(".mobile_wrap");

//element.querySelector: 돔 찾는 시간 줄여줌
cartItems.addEventListener("click", (e) => {
  const subsBtn = cartItems.querySelector(".substract");
  const addBtn = cartItems.querySelector(".plus");
});
