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
