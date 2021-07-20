if (!window.matchMedia("(pointer: coarse)").matches) {
   const cursor = document.querySelector(".cursor");
   const follower = document.querySelector(".cursor-follower");

   let posX = 0,
      posY = 0;

   let mouseX = -100,
      mouseY = -100;

   const followerSize = follower.offsetWidth;

   gsap.to({}, 0.016, {
      repeat: -1,
      onRepeat: function () {
         posX += (mouseX - posX) / 9;
         posY += (mouseY - posY) / 9;

         gsap.set(follower, {
            css: {
               x: posX - followerSize,
               y: posY - followerSize
            }
         });

         gsap.set(cursor, {
            css: {
               x: mouseX,
               y: mouseY
            }
         });
      }
   });

   document.addEventListener("mousemove", function (event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
   });

   // yellow circle
   const links = document.querySelectorAll("a");

   links.forEach(link => {
      link.addEventListener("mouseenter", () => {
         cursor.classList.add("cursor__active-link");
         follower.classList.add("active");
      })
      link.addEventListener("mouseleave", () => {
         cursor.classList.remove("cursor__active-link");
         follower.classList.remove("active");
      })
   });

   const buttons = document.querySelectorAll("button");

   buttons.forEach(button => {
      button.addEventListener("mouseenter", () => {
         cursor.classList.add("cursor__active-button");
         follower.classList.add("active");
      })
      button.addEventListener("mouseleave", () => {
         cursor.classList.remove("cursor__active-button");
         follower.classList.remove("active");
      })
   });

   const ribbons = document.querySelectorAll(".ribbon");

   ribbons.forEach(ribbon => {
      ribbon.addEventListener("mouseenter", () => {
         cursor.classList.add("cursor__active-option");
         follower.classList.add("active");
      })
      ribbon.addEventListener("mouseleave", () => {
         cursor.classList.remove("cursor__active-option");
         follower.classList.remove("active");
      })
   });
}

