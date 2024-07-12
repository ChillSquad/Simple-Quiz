const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");

let questions = [];
let score = 0;
let questionIndex = 0;

const fetchQuestions = async () => {
  const response = await fetch("https://9af697c175fbd382.mokky.dev/questions");
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  questions = data;
  showQuestion();
};

const clearHTML = () => {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
};

const showQuestion = () => {
  if (questions.length === 0) {
    headerContainer.innerHTML = "<h2 class='title'>Вопросы не загружены</h2>";
    return;
  }

  const title = `<h2 class="title">${questions[questionIndex]["question"]}</h2>`;
  headerContainer.innerHTML = title;

  for (const [index, answerText] of questions[questionIndex][
    "answers"
  ].entries()) {
    const answerHTML = `
      <li>
        <label>
          <input value="${
            index + 1
          }" type="radio" class="answer" name="answer" />
          <span>${answerText}</span>
        </label>
      </li>`;

    listContainer.innerHTML += answerHTML;
  }
};

const checkAnswer = () => {
  const checkedRadio = listContainer.querySelector(
    "input[type='radio']:checked"
  );

  if (!checkedRadio) {
    submitBtn.blur();
    return;
  }

  const userAnswer = parseInt(checkedRadio.value);

  if (userAnswer === questions[questionIndex]["correct"]) {
    score++;
  }

  if (questionIndex !== questions.length - 1) {
    questionIndex++;
    submitBtn.blur();
    clearHTML();
    showQuestion();
  } else {
    submitBtn.blur();
    clearHTML();
    showResults();
  }
};

const showResults = () => {
  let title, message;

  if (score === questions.length) {
    title = "Поздравляем!";
    message = "Вы отетили верно на все вопросы!";
  } else if ((score * 100) / questions.length >= 50) {
    title = "Неплохой результат!";
    message = "Вы дали более половины правильных ответов!";
  } else {
    title = "Стоит постараться!";
    message = "Вы дали меньше половины правильных ответов!";
  }

  const resultsTemplate = `
    <h2 class="title">${title}</h2>
    <h3 class="summary">${message}</h3>
    <p class="result">Ваш результат ${score} из ${questions.length}</p>
  `;

  headerContainer.innerHTML += resultsTemplate;
  submitBtn.innerHTML = "Попробовать заново";
  submitBtn.onclick = function refreshPage() {
    window.location.reload();
  };
};

clearHTML();
fetchQuestions();
submitBtn.onclick = checkAnswer;
