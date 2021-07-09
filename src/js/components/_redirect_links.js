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
