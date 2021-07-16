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
