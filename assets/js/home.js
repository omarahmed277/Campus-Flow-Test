function updateCircle(id, newRating, ratingId) {
    const circle = document.getElementById(id);
    const ratingValue = document.getElementById(ratingId);

    const offset = 628 - (newRating / 5) * 628;
    circle.style.strokeDashoffset = offset;
    ratingValue.textContent = newRating;
}


updateCircle('circle1', 0.1, 'ratingValue1');
updateCircle('circle2', 3, 'ratingValue2');
updateCircle('circle3', 5, 'ratingValue3');
updateCircle('circle4', 2.5,'ratingValue4');
updateCircle('circle5', 1, 'ratingValue5');
updateCircle('circle6', 2, 'ratingValue6');



// document.getElementById("toggleDropdown").addEventListener("click", function () {
//     const dropdown = document.querySelector(".dropdown-list");
//     dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
//   });
document.getElementById("langA").addEventListener("click", function () {
  const dropdownL = document.querySelector(".dropdown-menu2");
  const arrow = this.querySelector("img");

  // تبديل عرض القائمة
  dropdownL.style.display = dropdownL.style.display === "block" ? "none" : "block";

  // تدوير السهم
  arrow.classList.toggle("rotate");
});

document.getElementById("A2").addEventListener("click", function () {
  const dropdownL = document.querySelector(".dropdown-menu3");
  const arrow = this.querySelector("img");

  // تبديل عرض القائمة
  dropdownL.style.display = dropdownL.style.display === "block" ? "none" : "block";

  // تدوير السهم
  arrow.classList.toggle("rotate");
});

document.getElementById("A3").addEventListener("click", function () {
  const dropdownL = document.querySelector(".dropdown-menu4");
  const arrow = this.querySelector("img");

  // تبديل عرض القائمة
  dropdownL.style.display = dropdownL.style.display === "block" ? "none" : "block";

  // تدوير السهم
  arrow.classList.toggle("rotate");
});

document.getElementById("toggleDropdown").addEventListener("click", function () {
  const dropdown = document.querySelector(".dropdown-list");
  const container = document.querySelector(".filter-container");
  const arrow = this;

  const isDropdownOpen = dropdown.style.display === "block";

  // تبديل عرض القائمة الرئيسية
  dropdown.style.display = isDropdownOpen ? "none" : "block";

  // تبديل الزوايا للقائمة الرئيسية
  if (isDropdownOpen) {
    container.classList.remove("open");
    dropdown.classList.remove("open");
    arrow.classList.remove("rotate");
  } else {
    container.classList.add("open");
    dropdown.classList.add("open");
    // arrow.classList.add("rotate");
  }
});

document.getElementById("heart-path").addEventListener("click", function () {
  const redheart = document.getElementById("heart-path")
  redheart.style.stroke = "#f80606";
  redheart.style.fill = "#f80606";
})

document.addEventListener("DOMContentLoaded", function () {
 
  const row = document.querySelector(".row");
  const leftBtn = document.querySelector(".arrow-left button");
  const rightBtn = document.querySelector(".arrow-right button");

  let currentPosition = 0;
  const cardWidth = document.querySelector(".card").offsetWidth + 24;
  const visibleCards = 6;
  
  const totalCards = document.querySelectorAll(".card").length;
  const maxScroll = -(totalCards - visibleCards) * cardWidth;


  

  leftBtn.addEventListener("click", () => {
    if (currentPosition > maxScroll) {
      currentPosition -= cardWidth;
      row.style.transform = `translateX(${currentPosition}px)`;
    }
  });

  rightBtn.addEventListener("click", () => {
    if (currentPosition < 0) {
      currentPosition += cardWidth;
      row.style.transform = `translateX(${currentPosition}px)`;
    }
  });
});
