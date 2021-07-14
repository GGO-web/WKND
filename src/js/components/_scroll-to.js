const redirectItems = document.querySelectorAll("a[data-scroll-to], button[data-scroll-to]");
redirectItems.forEach(item => {
   item.addEventListener("click", event => {
      event.preventDefault();
      const targetItem = document.querySelector(event.target.dataset.scrollTo);

      if (targetItem) {
         const offsetTop = targetItem.offsetTop;

         window.scroll({
            top: offsetTop,
            behavior: "smooth",
         });
      }

      return false;
   });
});
