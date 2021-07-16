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
               left: posX - followerSize,
               top: posY - followerSize
            }
         });

         gsap.set(cursor, {
            css: {
               left: mouseX,
               top: mouseY
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

(() => {
   const question = document.querySelector(".quiz__question");
   let answers = null;

   const buttonPrev = document.querySelector(".quiz__button-prev");
   const buttonNext = document.querySelector(".quiz__button-next");

   const bullets = document.querySelectorAll(".quiz__progressbar-bullet");

   let questionIndex = 0;
   let countQuestions = 5;
   let questions = null;

   const selected_answers = [];
   for (let i = 0; i < countQuestions; ++i)
      selected_answers.push(-1);

   function loadQuestion() {
      buttonsStates();

      const currentQuestion = questions[questionIndex].question;
      question.innerHTML = String(questionIndex + 1) + ". " + currentQuestion;

      const answersContainer = document.querySelector(".quiz__answers");
      answersContainer.innerHTML = "";

      for (let index = 0; index < questions[questionIndex].answers.length; ++index) {
         const currentAnswer = questions[questionIndex].answers[index];

         answersContainer.insertAdjacentHTML("beforeend", `
            <div class="quiz__answer">
               <img src="${currentAnswer.answerImage}" alt="Answer image ${index}" class="quiz__answer-image">
               <span class="quiz__answer-text">
                  ${currentAnswer.answerText}
               </span>
            </div>
         `);
      }

      answers = document.querySelectorAll(".quiz__answer");
      answersSelection();
   }

   const updateProgressbar = () => {
      if (selected_answers[questionIndex] === -1)
         bullets[questionIndex].style.borderColor = null;
      else
         bullets[questionIndex].style.borderColor = "#81b29a";
   }

   const buttonsStates = () => {
      if ((1 + questionIndex) == countQuestions)
         buttonNext.classList.add("quiz__button--disabled");
      else buttonNext.classList.remove("quiz__button--disabled");

      if (questionIndex == 0)
         buttonPrev.classList.add("quiz__button--disabled");
      else buttonPrev.classList.remove("quiz__button--disabled");
   }

   const cleanSelectedAnswers = () => {
      for (let ans of answers) {
         ans.classList.remove("quiz__answer--selected");
      }
   }

   const answerToggle = (answer, index) => {
      if (answer.classList.contains("quiz__answer--selected")) {
         answer.classList.remove("quiz__answer--selected");
         selected_answers[questionIndex] = -1;
         return;
      }

      cleanSelectedAnswers();
      answer.classList.add("quiz__answer--selected");
      selected_answers[questionIndex] = index;

      return;
   }

   const updateAlreadySelectedAnswer = (selectedIndex) => {
      cleanSelectedAnswers();

      if (selectedIndex === -1)
         return;

      answerToggle(answers[selectedIndex], selectedIndex);
   }

   const quizIsOver = () => {
      for (let i = 0; i < countQuestions; ++i) {
         if (selected_answers[i] === -1) {
            return false;
         }
      }

      const confirmAnswer = confirm("Узнать стоимось сайта?");
      if (confirmAnswer) {
         // find out the cost MODAL
      }

      return true;
   }

   const answersSelection = () => {
      answers.forEach((answer, index) => {
         const cursor = document.querySelector(".cursor");
         const follower = document.querySelector(".cursor-follower");

         answer.addEventListener("mouseenter", () => {
            cursor.classList.add("cursor__active-option");
            follower.classList.add("active");
         })

         answer.addEventListener("mouseleave", () => {
            cursor.classList.remove("cursor__active-option");
            follower.classList.remove("active");
         })

         answer.addEventListener("click", () => {
            answerToggle(answer, index);
            updateProgressbar();
            quizIsOver();
         })
      })
   }

   const quizUpdate = () => {
      updateAlreadySelectedAnswer(selected_answers[questionIndex]);
      updateProgressbar();
   }

   buttonNext.addEventListener("click", () => {
      if (questionIndex != countQuestions)
         questionIndex++;

      loadQuestion();
      quizUpdate();
   });

   buttonPrev.addEventListener("click", () => {
      if (questionIndex != 0)
         questionIndex--;

      loadQuestion();
      quizUpdate();
   });

   bullets.forEach((bullet, index) => {
      bullet.addEventListener("click", () => {
         questionIndex = index;

         loadQuestion();
         quizUpdate();
      });
   });

   questions = [
      {
         "question": "Какой сайт вам нужен?",
         "answers": [
            {
               "answerImage": "./img/cases/case-1.jpg",
               "answerText": "Одностраничный сайт (Лендинг)"
            },
            {
               "answerImage": "./img/cases/case-2.jpg",
               "answerText": "Многостраничный сайт"
            },
            {
               "answerImage": "./img/cases/case-3.jpg",
               "answerText": "Интернет-магазин"
            }
         ]
      },
      {
         "question": "Что будёт включено в разработку сайта?",
         "answers": [
            {
               "answerImage": "./img/cases/case-1.jpg",
               "answerText": "Дизайн"
            },
            {
               "answerImage": "./img/cases/case-2.jpg",
               "answerText": "Дизайн + Верстка"
            },
            {
               "answerImage": "./img/cases/case-3.jpg",
               "answerText": "Дизайн + Верстка + Контент"
            }
         ]
      },
      {
         "question": "На какую аудиторию будет рассчитан ваш сайт?",
         "answers": [
            {
               "answerImage": "./img/cases/case-1.jpg",
               "answerText": "До 10 000 человек"
            },
            {
               "answerImage": "./img/cases/case-2.jpg",
               "answerText": "До 50 000 человек"
            },
            {
               "answerImage": "./img/cases/case-3.jpg",
               "answerText": "От 100 000 человек"
            }
         ]
      },
      {
         "question": "Как часто нужно техническое обслуживание сайта?",
         "answers": [
            {
               "answerImage": "./img/cases/case-1.jpg",
               "answerText": "Два раза в месяц"
            },
            {
               "answerImage": "./img/cases/case-2.jpg",
               "answerText": "Раз в неделю"
            },
            {
               "answerImage": "./img/cases/case-3.jpg",
               "answerText": "Постоянное обслуживание"
            }
         ]
      },
      {
         "question": "Нужна интеграция рекламы?",
         "answers": [
            {
               "answerImage": "./img/cases/case-1.jpg",
               "answerText": "Да"
            },
            {
               "answerImage": "./img/cases/case-2.jpg",
               "answerText": "Нет"
            }
         ]
      }
   ];

   loadQuestion();
})();

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
