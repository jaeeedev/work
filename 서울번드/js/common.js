//pc헤더

const categories = document.querySelector(".inner_pc_header .menus");
const storeBox = categories.querySelector(".category.store");
const craftBox = categories.querySelector(".category.craft");

categories.addEventListener("mouseover", (e) => {
  const store = categories.querySelector(".category.store .lnb_menu_title a");
  const craft = categories.querySelector(".category.craft .lnb_menu_title a");
  if (e.target === store) {
    storeBox.children[1].style.height = "fit-content";
    storeBox.children[1].style.opacity = "1";
  } else if (e.target === craft) {
    craftBox.children[1].style.height = "fit-content";
    craftBox.children[1].style.opacity = "1";
  }
});

categories.addEventListener("mouseout", (e) => {
  const store = categories.querySelector(".category.store .lnb_menu_title a");
  const craft = categories.querySelector(".category.craft .lnb_menu_title a");
  if (e.target === store) {
    storeBox.children[1].style.height = "0";
    storeBox.children[1].style.opacity = "0";
  } else if (e.target === craft) {
    craftBox.children[1].style.height = "0";
    craftBox.children[1].style.opacity = "0";
  }
});
