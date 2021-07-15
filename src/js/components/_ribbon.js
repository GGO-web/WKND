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

      setTimeout(() => {
         line.style.animationPlayState = "running";
         clonedLine.style.animationPlayState = "running";
      }, 1000);
   });
})();
