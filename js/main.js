console.log("hi");

const questionCard = document.querySelector('[data-js="question-card"]');

const questionCardAnswerElement = document.querySelector(
  '[data-js="question-card__answer"]',
);

const questionCardAnswerToggleButton = document.querySelector(
  '[data-js="question-card__toggle-answer-button"]',
);

const questionCardBookmarkToggleButton = document.querySelector(
  '[data-js="question-card__bookmark"]',
);

console.log(questionCardAnswerToggleButton);
console.log(document.body);

questionCardAnswerToggleButton.addEventListener("click", (e) => {
  questionCard.classList.toggle("question-card--answer-hidden");
  /* aria event? */
});

questionCardBookmarkToggleButton.addEventListener("click", (e) => {
  questionCard.classList.toggle("question-card--bookmarked");
  /* aria event? */
});
