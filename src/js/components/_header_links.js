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
