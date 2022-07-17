let cartData = [];
let localData = [];
let bingoCount = 0;
let pdSum = 0;
const totalPrice = document.querySelector(".total_price");
const allPrice = document.querySelectorAll(".product_price");
const quantity = document.querySelectorAll(".product_quantity");

async function init() {
  await fetchCartData();
  drawCart();
  boxEventHandler();
  checkAll();
  drawTotal();
  // memorize();
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

  const cartContents = localData
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
      ><span class="whole_price_price">0</span>
    </div>
    <div>
      <span class="whole_price_title">배송비</span
      ><span class="shipping_price">4,000</span>
    </div>
    <hr />
    <div class="total_box">
      <span class="whole_price_title">결제예정금액</span
      ><span class="total_price">4,000</span>
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

//체크박스

function checkAll() {
  const checkAll = document.querySelector("#check_all");

  checkAll.addEventListener("change", () => {
    const allInputs = document.querySelectorAll(".item_box input");
    if (checkAll.checked) {
      allInputs.forEach((input) => (input.checked = true));
      pdSum = localData.reduce((acc, cur) => {
        return acc + cur.price * 1 * cur.count * 1;
      }, 0);
      drawTotal();
      bingoCount = allInputs.length;
    } else {
      allInputs.forEach((input) => (input.checked = false));
      pdSum = 0;
      drawTotal();
    }
  });
}

function boxEventHandler() {
  const cartItems = document.querySelector(".mobile_wrap");
  const itembox = cartItems.querySelectorAll(".item_box");

  itembox.forEach((box, i) =>
    box.addEventListener("click", (e) => {
      const subsBtn = box.querySelector(".substract");
      const addBtn = box.querySelector(".plus");
      let amount = box.querySelector(".product_quantity");
      let price = box.querySelector(".product_price");
      const checkbox = box.querySelector(".item_check");

      const delBtn = box.querySelector(".cancel i");

      if (e.target === subsBtn) {
        if (amount.textContent <= 1) return;

        amount.textContent--;
        localData[i].count--;

        price.textContent = localData[i].price * localData[i].count;
        if (checkbox.checked) {
          pdSum -= localData[i].price;
        }
        drawTotal();
      } else if (e.target === addBtn) {
        if (amount.textContent >= 10) return;

        amount.textContent++;
        localData[i].count++;
        price.textContent = localData[i].price * localData[i].count;

        if (checkbox.checked) {
          pdSum += localData[i].price;
        }
        drawTotal();
      } else if (e.target === delBtn) {
        deleteItem(i);
        //이벤트 풀려서 다시 걸어줘야함
      } else if (e.target === checkbox) {
        const checkbox = box.querySelector(".item_check");

        if (checkbox.checked) {
          pdSum += localData[i].count * localData[i].price;
          bingoCount++;
        } else {
          pdSum -= localData[i].count * localData[i].price;
          bingoCount--;
        }
        drawTotal();
      }
    })
  );
}

function drawTotal() {
  const productSum = document.querySelector(".total_number");
  const totalBill = document.querySelector(".total_bill_price");
  document.querySelector(".whole_price_price").textContent = pdSum;
  productSum.textContent = pdSum;
  document.querySelector(".total_price").textContent = pdSum + 4000;
  totalBill.textContent = pdSum + 4000;
}

function deleteItem(index) {
  localData.splice(index, 1);
  drawCart();
  drawTotal();
  boxEventHandler(); //이벤트리스너 풀려서 다시 설정
}

// function memorize() {
//   window.addEventListener("beforeunload", () => {
//     fetch("https://shop-aac53-default-rtdb.firebaseio.com/cart.json", {
//       method: "PUT",
//       body: JSON.stringify({
//         items: localData,
//       }),
//     });
//   });
// }
