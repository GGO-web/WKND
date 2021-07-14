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

      window.scroll({
         top: offsetTop + 100,
         behavior: "smooth",
      });
   });
});
