const questions = [
  {
    question: "Какой язык работает в браузере?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 4,
  },
  {
    question: "Что означает CSS?",
    answers: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    correct: 2,
  },
  {
    question: "Что означает HTML?",
    answers: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborginis",
    ],
    correct: 1,
  },
  {
    question: "В каком году был создан JavaScript?",
    answers: ["1996", "1995", "1994", "все ответы неверные"],
    correct: 2,
  },
];

const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");

let score = 0;
let questionIndex = 0;

const clearHTML = () => {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
};

const showQuestion = () => {
  const title = `<h2 class="title">${questions[questionIndex]["question"]}</h2>`;

  headerContainer.innerHTML = title;

  for ([index, ansewrText] of questions[questionIndex]["answers"].entries()) {
    const answerHTML = `
					<li>
            <label>
              <input value="${
                index + 1
              }" type="radio" class="answer" name="answer" />
              <span>${ansewrText}</span>
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

  const resaultsTemplate = `
				<h2 class="title">${title}</h2>
        <h3 class="summary">${message}</h3>
        <p class="result">Ваш результат ${score} из ${questions.length}</p>
				`;

  headerContainer.innerHTML += resaultsTemplate;
  submitBtn.innerHTML = "Попробовать заново";
  submitBtn.onclick = function refreshPage() {
    window.location.reload();
  };
};

clearHTML();
showQuestion();
submitBtn.onclick = checkAnswer;
