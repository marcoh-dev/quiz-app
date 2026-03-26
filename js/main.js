console.log("test");

const questionCard = document.querySelector('[data-js="question-card"]');

if (questionCard) {
  const questionCardAnswerElement = document.querySelector(
    '[data-js="question-card__answer"]',
  );

  const questionCardAnswerToggleButton = document.querySelector(
    '[data-js="question-card__toggle-answer-button"]',
  );

  const questionCardBookmarkToggleButton = document.querySelector(
    '[data-js="question-card__bookmark"]',
  );

  questionCardAnswerToggleButton.addEventListener("click", (e) => {
    questionCard.classList.toggle("question-card--answer-hidden");
    /* aria event? */
  });

  questionCardBookmarkToggleButton.addEventListener("click", (e) => {
    questionCard.classList.toggle("question-card--bookmarked");
    /* aria event? */
  });
}

const newCardForm = document.querySelector('[data-js="new-card__form"]');

if (newCardForm) {
  newCardForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));

    console.log(data);

    e.target.reset();
    //e.target["first-name"].focus();
  });
}
