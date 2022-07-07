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
