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
