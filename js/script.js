const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu").children[0];

function openBurgerMenu() {
   burger.classList.add("active");
   menu.classList.add("is-active");
   document.body.classList.add("hide-scroll");
}

function closeBurgerMenu() {
   burger.classList.remove("active");
   menu.classList.remove("is-active");
   document.body.classList.remove("hide-scroll");
}

burger.addEventListener("click", function () {
   if (menu.classList.contains("is-active")) {
      closeBurgerMenu();
   } else {
      openBurgerMenu();
   }
});

window.addEventListener("orientationchange", () => {
   closeBurgerMenu();
});

const headerLinks = document.querySelectorAll(".header__list-link[data-scroll-to]");

if (headerLinks) {
   window.addEventListener("scroll", (event) => {
      headerLinks.forEach((link) => {
         const section = document.querySelector(link.dataset.scrollTo);
         const header = document.querySelector(".header");
         const sectionOffset = section.offsetTop - header.offsetHeight;
         const sectionHeight = section.offsetHeight;

         if (
            pageYOffset >= sectionOffset &&
            1 + pageYOffset <= sectionOffset + sectionHeight
         ) {
            link.classList.add("header__list-link--active");
         } else link.classList.remove("header__list-link--active");
      });
   });
}

let partnersSlider;
function initSwiper() {
   let screenWidth = window.innerWidth;
   const breakpoint = 576;
   if (screenWidth < (1 + breakpoint) && !partnersSlider) {
      partnersSlider = new Swiper(".partners__slider", {
         // Optional parameters
         loop: false,
         speed: 500,
         slidesPerView: 'auto',
         spaceBetween: 20,
         freeMode: true,
         wrapperClass: "partners__slider-wrapper",
         slideClass: "partners__slide",
         slideActiveClass: "partners__slide--active",
         slideNextClass: "partners__slide-next",
         slidePrevClass: "partners__slide-prev",
         slideVisibleClass: "partners__slide--visible",
      });
   } else if (screenWidth > breakpoint && partnersSlider) {
      partnersSlider.destroy();
      partnersSlider = undefined;
   }
}

//Swiper plugin initialization
initSwiper();

//Swiper plugin initialization on window resize
window.addEventListener("resize", function () {
   initSwiper();
});

const redirectItems = document.querySelectorAll("a[data-scroll-to], button[data-scroll-to]");

if (redirectItems) {
   redirectItems.forEach((item) => {
      item.addEventListener("click", (event) => {
         event.preventDefault();
         const targetItem = document.querySelector(
            event.target.dataset.scrollTo
         );

         if (targetItem) {
            closeBurgerMenu();
            const offsetTop = targetItem.offsetTop;
            const headerHeight = document.querySelector(".header").offsetHeight;

            window.scroll({
               top: offsetTop - headerHeight,
               behavior: "smooth",
            });
         }

         return false;
      });
   });
}

(() => {
   const windowWidth = window.innerWidth;
   const ribbonLines = document.querySelectorAll(".ribbon__line");

   ribbonLines.forEach((line) => {
      const lineWidth = line.offsetWidth;
      const lineContent = line.innerHTML;

      for (let i = 0; i < Math.floor(windowWidth / lineWidth); ++i) {
         line.insertAdjacentHTML("beforeend", lineContent);
      }

      const clonedLine = line.cloneNode(true);
      line.parentElement.appendChild(clonedLine);
   });
})();

const scrollTriggers = document.querySelectorAll(".scroll-trigger");

scrollTriggers.forEach((trigger) => {
   const triggerParent = trigger.parentElement;
   let scrollElement = trigger;
   if (triggerParent.classList.contains("scroll")) scrollElement = triggerParent;

   scrollElement.addEventListener("click", () => {
      let offsetTop = 0;
      let parent = scrollElement;
      while (parent.offsetParent && parent.offsetParent.tagName !== "body") {
         offsetTop += parent.offsetTop;
         parent = parent.offsetParent;
      }

      console.log(offsetTop);

      window.scroll({
         top: offsetTop + 100,
         behavior: "smooth",
      });
   });
});

"use strict";

const da = new DynamicAdapt("max");
da.init();

// parallax.js
const scenes = document.querySelectorAll(".parallax__scene");
scenes.forEach((scene) => {
   const parallaxInstance = new Parallax(scene);

   scene.style = null;
   scene.children.forEach((child) => {
      child.style = null;
   });

   const disableParallax = () => {
      const disableClass = scene.classList.contains("parallax-disable");
      if (window.innerWidth < 1024 && !disableClass) {
         parallaxInstance.disable();
         scene.classList.add("parallax-disable");
      } else if (window.innerWidth >= 1024 && disableClass) {
         parallaxInstance.enable();
         scene.classList.remove("parallax-disable");
      }
   };
   disableParallax();

   window.addEventListener("resize", disableParallax);
});

// elipsis.js
const ellipsis = Ellipsis(
   {
      ellipsis: '…',
      debounce: 500,
      responsive: true,
      lines: 4,
      portrait: null,
      break_word: false,
   }
);
const ellipsisElements = document.querySelectorAll('.partners__slide-description');
ellipsis.add(ellipsisElements);
