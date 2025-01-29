"use strict";
document
  .querySelector(".sign-up-btn")
  .addEventListener("click", () => (window.location.href = "sign-up.html"));
document
  .querySelector(".log-in-btn")
  .addEventListener("click", () => (window.location.href = "log-in.html"));

document
  .querySelector(".logo")
  .addEventListener("click", () => (window.location.href = "landing.html"));

const navLink = document.querySelectorAll(".nav a");
navLink.forEach((e) => {
  e.addEventListener("click", () => {
    navLink.forEach((e) => e.classList.remove("active-link"));
    e.classList.add("active-link");
  });
});
////////////////////////////////
const fields = document.querySelector(`.fields-images`);
const fieldsImages = document.querySelectorAll(`.fields-images .field`);
const prevBtn = document.querySelector(".field-right");
const nextBtn = document.querySelector(".field-left");

let currentIndex = 0;

function showSlide(index) {
  if (index >= fieldsImages.length) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = fieldsImages.length - 1;
  } else {
    currentIndex = index;
  }
  const imageWidth = fieldsImages[currentIndex].clientWidth;
  fields.scrollTo({
    left: -currentIndex * imageWidth,
    behavior: "smooth",
  });
}
prevBtn.addEventListener("click", () => {
  showSlide((currentIndex -= 1));
});
nextBtn.addEventListener("click", () => {
  showSlide((currentIndex += 1));
});
///////////////////////////stories
const stories = document.querySelector(`.stories .story .cards `);
const story = document.querySelectorAll(`.stories .story .cards .card`);
const prevStory = document.querySelector(".prev-story");
const nextStory = document.querySelector(".next-story");
let currentStory = 0;

function showStory(index) {
  if (index >= story.length) {
    currentStory = 0;
  } else if (index < 0) {
    currentStory = story.length - 1;
  } else {
    currentStory = index;
  }

  const storyWidth = story[currentStory].clientWidth;
  stories.scrollTo({
    left: -currentStory * storyWidth,
    behavior: "smooth",
  });
  story.forEach((e) => {
    e.style.opacity = "0.6";
    e.style.height = " 324px";
    e.style.transform = `translateX(${currentStory * 43.7}vw)`;
  });
  console.log(currentStory);
  story[currentStory].style.opacity = "1";
  story[currentStory].style.height = " 296px";
}
prevStory.addEventListener("click", () => {
  showStory((currentStory -= 1));
});
nextStory.addEventListener("click", () => {
  showStory((currentStory += 1));
});
showStory(currentStory);
///////////////////////////stories
////////////////
const Frame = ["Frame1", "Frame2", "Frame3"];
const FrameImages = document.querySelectorAll(".about .images img");
let currentframe = 0;
setInterval(() => {
  FrameImages.forEach((e) => e.classList.add("hidden-images"));
  currentframe = (currentframe + 1) % Frame.length;
  document
    .querySelectorAll(`.${Frame[currentframe]}`)
    .forEach((ele) => ele.classList.remove("hidden-images"));
}, 2000);
///////////////////
///////////////suggested-mentors//////////////
const suggestedCards = document.querySelectorAll(".suggested-mentors .card");
const rate = 0;

suggestedCards.forEach((card, index) => {
  const selectedCard = `.suggested-mentors .card:nth-of-type(${index + 1})`;
  const heart = document.querySelectorAll(
    `${selectedCard} > svg:nth-child(3) path `
  );

  heart.forEach((e) => {
    e.addEventListener("click", () => {
      e.getAttribute("fill") === "#fff"
        ? e.setAttribute("fill", "#ff1d35")
        : e.setAttribute("fill", "#fff");
      e.getAttribute("stroke") === "#98A2B3"
        ? e.setAttribute("stroke", "#ff1d35")
        : e.setAttribute("stroke", "#98A2B3");
    });
  });

  const circle = document.querySelectorAll(`${selectedCard} .prgress-circle`);
  const stars = document.querySelectorAll(`${selectedCard} .stars svg`);
  const starspath = document.querySelectorAll(
    `${selectedCard} .stars svg path`
  );
  circle.forEach((circle) => {
    stars.forEach((star, i) =>
      star.addEventListener("click", () => {
        starspath.forEach((path, n) => {
          n <= i
            ? path.setAttribute("fill", "#FFCF00")
            : path.setAttribute("fill", "#D0D5DD");
        });
        let calcRate = (i + 1) * 20;
        circle.setAttribute(
          "stroke-dasharray",
          `${calcRate}, ${100 - calcRate}`
        );
      })
    );
  });
});
const mentorsLandin = document.querySelector(`.suggested-mentors .cards`);
const mentorLandin = document.querySelectorAll(
  `.suggested-mentors .cards .card`
);
const prevmentor = document.querySelector(".right-mentor");
const nextmentor = document.querySelector(".left-mentor");
let currentMentor = 0;

function showMentor(index) {
  if (index >= mentorLandin.length) {
    currentMentor = 0;
  } else if (index < 0) {
    currentMentor = mentorLandin.length - 1;
  } else {
    currentMentor = index;
  }
  const mentorWidth = mentorLandin[currentMentor].clientWidth;
  mentorsLandin.scrollTo({
    left: -currentMentor * mentorWidth,
    behavior: "smooth",
  });
}
prevmentor.addEventListener("click", () => {
  showMentor((currentMentor -= 1));
});
nextmentor.addEventListener("click", () => {
  showMentor((currentMentor += 1));
});
///////////////////////////////////////////
