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
  let newCardIndex = 0;

  newCardForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));

    console.log(data);

    e.target.reset();
    //e.target["first-name"].focus();

    // create new element
    newCardIndex++;

    const newQuestionCard = document.createElement("section");
    newQuestionCard.classList.add(
      "question-card",
      "question-card--answer-hidden",
    );
    newQuestionCard.tabIndex = 0;
    newQuestionCard.ariaLabel = "Question";
    newQuestionCard.dataset.js = "question-card";

    const newQuestionCardQuestion = document.createElement("h2");
    newQuestionCardQuestion.id = `q${newCardIndex}h2`;
    newQuestionCardQuestion.classList.add("question-card__question");
    const newQuestionCardQuestionPre = document.createElement("pre");
    newQuestionCardQuestionPre.textContent = data.questionInput;

    newQuestionCardQuestion.append(newQuestionCardQuestionPre);

    const newQuestionCardAnswer = document.createElement("div");
    newQuestionCardAnswer.classList.add("question-card__answer");
    newQuestionCardAnswer.dataset.js = "question-card__answer";

    const newQuestionCardAnswerParagraph = document.createElement("p");
    const newQuestionCardAnswerPre = document.createElement("pre");
    newQuestionCardAnswerPre.textContent = data.answerInput;

    newQuestionCardAnswerParagraph.append(newQuestionCardAnswerPre);
    newQuestionCardAnswer.append(newQuestionCardAnswerParagraph);

    const newQuestionCardToggleAnswerButton = document.createElement("button");
    newQuestionCardToggleAnswerButton.type = "button";
    newQuestionCardToggleAnswerButton.classList.add(
      "question-card__toggle-answer-button",
    );
    newQuestionCardToggleAnswerButton.js =
      "question-card__toggle-answer-button";

    const newQuestionCardAnswerShowText = document.createElement("span");
    newQuestionCardAnswerShowText.classList.add(
      "question-card__answer-show-text",
    );
    newQuestionCardAnswerShowText.textContent = "Show answer";

    const newQuestionCardAnswerHideText = document.createElement("span");
    newQuestionCardAnswerHideText.classList.add(
      "question-card__answer-hide-text",
    );
    newQuestionCardAnswerHideText.textContent = "Hide answer";

    const newQuestionCardBookmark = document.createElement("button");
    newQuestionCardBookmark.type = "button";
    newQuestionCardBookmark.classList.add("question-card__bookmark");
    newQuestionCardBookmark.js = "question-card__bookmark";

    const newQuestionCardBookmarkIcon = document.createElement("span");
    newQuestionCardBookmarkIcon.classList.add("question-card__bookmark-icon");

    const newQuestionCardCategories = document.createElement("ul");
    newQuestionCardCategories.classList.add("question-card__categories");

    const newQuestionCardCategory = document.createElement("li");
    newQuestionCardCategory.classList.add("question-card__category");
    newQuestionCardCategory.textContent = data.tagInput;

    newQuestionCardToggleAnswerButton.append(
      newQuestionCardAnswerShowText,
      newQuestionCardAnswerHideText,
    );
    newQuestionCardBookmark.append(newQuestionCardBookmarkIcon);
    newQuestionCardCategories.append(newQuestionCardCategory);
    newQuestionCard.append(
      newQuestionCardQuestion,
      newQuestionCardAnswer,
      newQuestionCardToggleAnswerButton,
      newQuestionCardBookmark,
      newQuestionCardCategories,
    );
    document.querySelector("main").append(newQuestionCard);
  });
}
