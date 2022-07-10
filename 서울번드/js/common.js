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
