const background = document.querySelector(".side_bar");

background.addEventListener("click", (e) => {
  const input = document.querySelector(".side_btn");
  if (e.target !== e.currentTarget) return;
  console.log(e.target);
  console.log(e.currentTarget);
  input.click();
});

const totalPrice = document.querySelector(".total_price");
const allPrice = document.querySelectorAll(".product_price");
const quantity = document.querySelectorAll(".product_quantity");
//합계는 당근 리듀스지

const checkAll = document.querySelector("#check_all");

checkAll.addEventListener("change", () => {
  const allInputs = document.querySelectorAll(".item_box input");
  if (checkAll.checked) {
    allInputs.forEach((input) => (input.checked = true));
  } else {
  }
});

//부하를 최소화하기위해 이번에는 이벤트리스너 막 남발하지 않겟습니다,,,,
//html에서 같은 값을 보여줄 숫자는 같은 태그로 리팩토링하슈

const cartItems = document.querySelector(".mobile_wrap");

//element.querySelector: 돔 찾는 시간 줄여줌
cartItems.addEventListener("click", (e) => {
  const subsBtn = cartItems.querySelector(".substract");
  const addBtn = cartItems.querySelector(".plus");
});
