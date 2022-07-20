const background = document.querySelector(".side_bar");

background.addEventListener("click", (e) => {
  const input = document.querySelector(".side_btn");
  if (e.target !== e.currentTarget) return;
  input.click();
});

const sideCloseBtn = document.querySelector(".side_bar .close_box span");

sideCloseBtn.addEventListener("click", () => {
  const input = document.querySelector(".side_btn");
  input.click();
});

//pc헤더
const lnbLists = document.querySelectorAll(".category");

lnbLists.forEach((li) =>
  li.addEventListener("mouseenter", () => {
    if (li.children[1]) {
      li.children[1].style.height = "fit-content";
      li.children[1].style.opacity = "1";
    }
    return;
  })
);

lnbLists.forEach((li) =>
  li.addEventListener("mouseleave", () => {
    if (li.children[1]) {
      li.children[1].style.height = "0";
      li.children[1].style.opacity = "0";
    }
    return;
  })
);

window.addEventListener(
  "scroll",
  () => {
    const sideBar = document.querySelector(".side_bar");
    if (window.pageYOffset >= 64) {
      sideBar.classList.add("fixed");
    } else {
      sideBar.classList.remove("fixed");
      return;
    }
  },
  { passive: true }
);
