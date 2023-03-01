let current = 0;
let target = 0;
let ease = 0.1;

let windowWidth, containerHeight, imageHeight, skewDiff;
let container = document.querySelector(".content");
const scrollWrapper = document.querySelector(".smooth-scroll-wrapper");

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

console.log(lerp(5, 10, 0.5));

function setTransform(el, transform) {
  el.style.transform = transform;
}

function setupAnimation() {
  windowWidth = window.innerWidth;
  console.log(windowWidth);
  containerHeight = container.getBoundingClientRect().height;
  console.log(containerHeight);
  // imageHeight =
  //   containerHeight / (windowWidth > 760 ? images.length / 2 : images.length);

  document.body.style.height = `${containerHeight}px`;

  smoothScroll();
}

function smoothScroll() {
  current = lerp(current, target, ease);
  current = parseFloat(current.toFixed(2));
  target = window.scrollY;
  setTransform(container, `translateY(${-current}px)`);
  requestAnimationFrame(smoothScroll);
}

// if (window.matchMedia("(min-width: 1024px)").matches) {
// scrollWrapper.classList.add("active");

// } else {
//   scrollWrapper.classList.remove("active");
// }

// const scroll = new LocomotiveScroll({
//   el: document.querySelector("[data-scroll-container]"),
//   smooth: true,
// });

// add header styles on scroll
const headerScroll = () => {
  const headerElement = document.querySelector(".header");
  window.scrollY >= 30
    ? headerElement.classList.add("active")
    : headerElement.classList.remove("active");
};
window.addEventListener("scroll", headerScroll);

// open and close the menu on click btn
// const menuToggler = document.querySelector("#menu-toggler");
// const navbarMenu = document.querySelector(".navbar__menu");
// const toggleMenu = () => {
//   navbarMenu.classList.toggle("active");
//   menuToggler.classList.toggle("active");
// };
// menuToggler.addEventListener("click", toggleMenu);

// const linksToggleMenu = (e) => {
//   if (e.target.classList.contains("navbar__list-link")) {
//     navbarMenu.classList.remove("active");
//     menuToggler.classList.remove("active");
//   }
// };

// window.addEventListener("click", linksToggleMenu);

// // Grab elements
const selectElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) return element;
  throw new Error(
    `Something went wrong, make sure that ${selector} exists or is typed correctly`
  );
};

// swiper
const swiper = new Swiper(".myswiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

// Switch theme/add to local storage

const bodyElement = document.body;
const themeToggleBtn = selectElement("#theme-toggle-btn");
const currentTheme = localStorage.getItem("currentTheme");

if (currentTheme) {
  bodyElement.classList.add("light-theme");
}

themeToggleBtn.addEventListener("click", () => {
  bodyElement.classList.toggle("light-theme");

  if (bodyElement.classList.contains("light-theme")) {
    localStorage.setItem("currentTheme", "themeActive");
  } else {
    localStorage.removeItem("currentTheme");
  }
});

// const letters = "ABCDEFGHIJKMNOPQRSTUVWXYZ";
// document.querySelector(".showcase__title").onmouseover = (event) => {
//   let iterations = 0;
//   setInterval(() => {
//     event.target.innerText = event.target.innerText
//       .split("")
//       .map((letter) => letters[Math.floor(Math.random() * 26)])
//       .join("");
//     if (iterations >= 9) clearInterval(interval);
//     iterations += 1;
//   }, 30);
// };

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

function meshLetters(event) {
  let iteration = 0;

  clearInterval(interval);

  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return event.target.dataset.value[index];
        }

        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= event.target.dataset.value.length) {
      clearInterval(interval);
    }

    iteration += 1 / 3;
  }, 22);
}
document.querySelector(".text-effect2").onmouseover = (event) => {
  meshLetters(event);
};

document.querySelector(".text-effect").onmouseover = (event) => {
  meshLetters(event);
  // let iteration = 0;
  // clearInterval(interval);
  // interval = setInterval(() => {
  //   event.target.innerText = event.target.innerText
  //     .split("")
  //     .map((letter, index) => {
  //       if (index < iteration) {
  //         return event.target.dataset.value[index];
  //       }
  //       return letters[Math.floor(Math.random() * 26)];
  //     })
  //     .join("");
  //   if (iteration >= event.target.dataset.value.length) {
  //     clearInterval(interval);
  //   }
  //   iteration += 1 / 3;
  // }, 22);
};

const blob = document.getElementById("blob");

document.body.onpointermove = (event) => {
  const { clientX, clientY } = event;

  blob.animate(
    {
      left: `${clientX}px`,
      top: `${clientY}px`,
    },
    { duration: 6000, fill: "forwards" }
  );
};

// scroll reveal

const sr = ScrollReveal({
  distance: "60px",
  duration: 1500,
  easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
});

sr.reveal(
  ".showcase__title,.showcase__title2, .header, .showcase__image, .section-metadata, .swiper",
  {
    origin: "top",
    interval: 150,
  }
);

sr.reveal(".services__image-wrapper,.about__information, .post--left", {
  origin: "left",
});

sr.reveal(
  ".services__list,.about__images, .post--left, .post--right, .projects-wrapper",
  {
    origin: "right",
  }
);

sr.reveal(".projects__container", {
  origin: "top",
});

// var scroll = new SmoothScroll('a[href*="#"]');

// second menu

let menuToggle = document.querySelector(".menu-toggle");
let menuClose = document.querySelector(".menu-close");
let menu = document.querySelector(".second-menu");

let navLinks = Array.from(document.querySelectorAll(".nav-link"));

menuToggle.addEventListener("click", openMenu);
menuClose.addEventListener("click", closeMenu);

function openMenu() {
  menu.classList.add("active");
  navLinks.forEach((link, idx) => {
    setTimeout(() => {
      link.classList.add("active");
    }, (idx + 1) * 170);
  });
}

const linksToggleMenu2 = (e) => {
  if (e.target.classList.contains("nav-link")) {
    menu.classList.remove("active");
    // menuToggler.classList.remove("active");
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });
  }
};

window.addEventListener("click", linksToggleMenu2);

function closeMenu() {
  menu.classList.remove("active");

  setTimeout(() => {
    navLinks.forEach((link) => {
      setTimeout(() => {
        link.classList.remove("active");
      }, 100);
    });
  });
}

// filtering posts animation

const btns = document.querySelectorAll(".btn--project");
const imgs = [...document.querySelectorAll(".projects-wrapper img")];
const imgWrapper = document.querySelector(".projects-wrapper");

let imgsCopy = [...imgs];

function delay(t) {
  return new Promise((resolve) => setTimeout(resolve, t));
}

function removingImage(img) {
  img.classList.remove("img-expand");
  img.classList.add("img-shrink");
}

function addingImage(img) {
  img.classList.remove("img-shrink");
  img.classList.add("img-expand");
}

async function filterImg(e) {
  setActiveBtns(e);
  const btnType = parseInt(e.target.dataset.btn);
  const reverseArray = imgsCopy.slice().reverse();

  for (let img of reverseArray) {
    await removingImage(img);
    await delay(100);
  }

  imgWrapper.innerHTML = "";

  imgsCopy = imgs.filter((img) => +img.dataset.img === btnType);

  imgWrapper.append(...imgsCopy);

  for (let img of imgsCopy) {
    await delay(100);
    await addingImage(img);
    await delay(100);
  }
}

for (let i = 1; i < btns.length; i++) {
  btns[i].addEventListener("click", filterImg);
}

function setActiveBtns(e) {
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });

  e.target.classList.add("active");
}

btns[0].addEventListener("click", async (e) => {
  setActiveBtns(e);
  const reverseArray = imgsCopy.slice().reverse();

  for (let img of reverseArray) {
    await removingImage(img);
    await delay(100);
  }
  imgsCopy = [...imgs];
  imgWrapper.innerHTML = "";
  imgWrapper.append(...imgsCopy);
  await delay(100);
  imgs.forEach((img, idx) => {
    setTimeout(() => {
      img.classList.remove("img-shrink");
      img.classList.add("img-expand");
    }, idx * 100);
  });
});

// window.addEventListener(
//   "load",
//   function () {
//     setTimeout(() => {
//       setupAnimation();
//     });
//   },
//   50
// );
