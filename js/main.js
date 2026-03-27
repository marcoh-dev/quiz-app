function userInputCleanUp(string) {
  // escape text
  const escapeObj = document.createElement("div");
  escapeObj.textContent = string.trim();

  // replace backticks with html code tag
  const stringArray = escapeObj.innerHTML.split("`");
  let stringHtml = "";
  for (let i = 0; i < stringArray.length; i++) {
    if (i !== 0 && i % 2 && i + 1 != stringArray.length) {
      stringHtml += "<code>" + stringArray[i];
    } else if (i !== 0 && !(i % 2)) {
      stringHtml += "</code>" + stringArray[i];
    } else {
      stringHtml += stringArray[i];
    }
  }

  // replace newlines and carriage returns with html br tag
  stringHtml = stringHtml.replace(/(?:\r\n|\r|\n)/g, "<br>");

  return stringHtml;
}

function questionCardEventBinder(element) {
  const questionCardAnswerToggleButton = element.querySelector('[data-js="question-card__toggle-answer-button"]');

  const questionCardBookmarkToggleButton = element.querySelector('[data-js="question-card__bookmark"]');

  questionCardAnswerToggleButton.addEventListener("click", (e) => {
    element.classList.toggle("question-card--answer-hidden");
    /* aria event? */
  });

  questionCardBookmarkToggleButton.addEventListener("click", (e) => {
    element.classList.toggle("question-card--bookmarked");
    /* aria event? */
    if (document.body.classList.contains("bookmarks")) {
      setTimeout(() => {
        element.remove();
      }, 1000);
    }
  });
}

/*
const questionCard = document.querySelector('[data-js="question-card"]');
if (questionCard) {
  questionCardEventBinder(questionCard);
}
*/
const questionCards = document.querySelectorAll('[data-js="question-card"]');
questionCards.forEach((questionCard) => {
  questionCardEventBinder(questionCard);
});

function formInputCounter(element) {
  const maxLen = element.maxLength;
  const counter = document.querySelector('[data-js="' + element.dataset.js + '-counter"]');
  if (maxLen > 0 && counter) {
    counter.textContent = maxLen - element.value.length;
  }
}

const newCardQuestionInput = document.querySelector('[data-js="question-input"]');
if (newCardQuestionInput) {
  newCardQuestionInput.addEventListener("input", (e) => {
    formInputCounter(e.target);
  });
  formInputCounter(newCardQuestionInput);
}

const newCardAnswerInput = document.querySelector('[data-js="answer-input"]');
if (newCardAnswerInput) {
  newCardAnswerInput.addEventListener("input", (e) => {
    formInputCounter(e.target);
  });
  formInputCounter(newCardAnswerInput);
}

function newCardCreator(data, newCardIndex) {
  const newQuestionCard = document.createElement("section");
  newQuestionCard.classList.add("question-card", "question-card--answer-hidden");
  newQuestionCard.tabIndex = 0;
  newQuestionCard.ariaLabel = "Question";
  newQuestionCard.dataset.js = "question-card";

  const newQuestionCardInnerDiv = document.createElement("div");

  const newQuestionCardQuestion = document.createElement("h2");
  newQuestionCardQuestion.id = `q${newCardIndex}h2`;
  newQuestionCardQuestion.classList.add("question-card__question");
  newQuestionCardQuestion.innerHTML = userInputCleanUp(data.questionInput);

  const newQuestionCardAnswer = document.createElement("div");
  newQuestionCardAnswer.classList.add("question-card__answer");
  newQuestionCardAnswer.dataset.js = "question-card__answer";

  const newQuestionCardAnswerInnerDiv = document.createElement("div");
  const newQuestionCardAnswerParagraph = document.createElement("p");
  //newQuestionCardAnswerParagraph.textContent = data.answerInput.trim();
  newQuestionCardAnswerParagraph.innerHTML = userInputCleanUp(data.answerInput);

  newQuestionCardAnswerInnerDiv.append(newQuestionCardAnswerParagraph);
  newQuestionCardAnswer.append(newQuestionCardAnswerInnerDiv);

  const newQuestionCardToggleAnswerButton = document.createElement("button");
  newQuestionCardToggleAnswerButton.type = "button";
  newQuestionCardToggleAnswerButton.classList.add("question-card__toggle-answer-button");
  newQuestionCardToggleAnswerButton.dataset.js = "question-card__toggle-answer-button";

  const newQuestionCardAnswerShowText = document.createElement("span");
  newQuestionCardAnswerShowText.classList.add("question-card__answer-show-text");
  newQuestionCardAnswerShowText.textContent = "Show answer";

  const newQuestionCardAnswerHideText = document.createElement("span");
  newQuestionCardAnswerHideText.classList.add("question-card__answer-hide-text");
  newQuestionCardAnswerHideText.textContent = "Hide answer";

  const newQuestionCardBookmark = document.createElement("button");
  newQuestionCardBookmark.type = "button";
  newQuestionCardBookmark.classList.add("question-card__bookmark");
  newQuestionCardBookmark.dataset.js = "question-card__bookmark";

  const newQuestionCardBookmarkIcon = document.createElement("span");
  newQuestionCardBookmarkIcon.classList.add("question-card__bookmark-icon");

  const newQuestionCardCategories = document.createElement("ul");
  newQuestionCardCategories.classList.add("question-card__categories");

  const newQuestionCardCategory = document.createElement("li");
  newQuestionCardCategory.classList.add("question-card__category");
  newQuestionCardCategory.textContent = data.tagInput.trim();

  newQuestionCardToggleAnswerButton.append(newQuestionCardAnswerShowText, newQuestionCardAnswerHideText);
  newQuestionCardBookmark.append(newQuestionCardBookmarkIcon);
  newQuestionCardCategories.append(newQuestionCardCategory);
  newQuestionCardInnerDiv.append(
    newQuestionCardQuestion,
    newQuestionCardAnswer,
    newQuestionCardToggleAnswerButton,
    newQuestionCardBookmark,
    newQuestionCardCategories,
  );

  newQuestionCard.append(newQuestionCardInnerDiv);
  questionCardEventBinder(newQuestionCard);
  return newQuestionCard;
}

const newCardForm = document.querySelector('[data-js="new-card__form"]');
let newCardIndex = 0;

if (newCardForm) {
  newCardForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));

    console.log(data);

    e.target.reset();
    //e.target["question-input"].focus();

    // create new element
    document.querySelector("main").append(newCardCreator(data, newCardIndex));
    newCardIndex++;
  });
}

const darkmodeToggle = document.querySelector('[data-js="darkmode"]');
if (darkmodeToggle) {
  darkmodeToggle.addEventListener("input", (e) => {
    console.log(e.target.checked);

    if (e.target.checked) {
      document.body.dataset.forcemode = e.target.value;
    } else {
      document.body.dataset.forcemode = "";
    }
  });
}
