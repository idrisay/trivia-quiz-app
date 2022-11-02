let numberOfQuestionElm = document.getElementById("number-of-question");
let categoryElm = document.getElementById("category");
let difficultyElm = document.getElementById("difficulty");
let startBtn = document.getElementById("start");
let loadingWrapper = document.getElementById("loading-wrapper");
let quizWrapper = document.getElementById("quiz-wrapper");
let selection = document.getElementById("selection");
let numberOfQuestion = 10;
// let category = '9';
// let difficulty = 'easy';
let questions = [];
let numberOfCurrentQuestion = 0;
let selections = { correct: 0, wrong: 0 };

startBtn.onclick = () => {
  loadingWrapper.style.display = "block";
  selection.style.display = "none";
  numberOfQuestion = numberOfQuestionElm.value;
  let category = categoryElm.value;
  let difficulty = difficultyElm.value;
  fetchQuestions(numberOfQuestion, category, difficulty);
};

const fetchQuestions = async (numberOfQuestion, category, difficulty) => {
  let response = await fetch(
    "https://opentdb.com/api.php?amount=" +
      numberOfQuestion +
      "&category=" +
      category +
      "&difficulty=" +
      difficulty +
      "&type=multiple"
  );
  response = await response.json();
  questions = response.results;
  console.log(questions);
  showQuestions();
};

const showQuestions = () => {
  if (selections.correct + selections.wrong == numberOfQuestion) {
    quizWrapper.innerHTML =
      "<div>Correct : " +
      selections.correct +
      "<br> Wrong :" +
      selections.wrong +
      "<br>" +
      "<button id='again'>Play Again</button>" +
      "</div>";

      document.getElementById('again').onclick = () =>{
        location.reload();
      }
  } else {
    loadingWrapper.style.display = "none";
    let question = questions[numberOfCurrentQuestion];
    //   2 + 2

    let correctAnswerIndex = generateRandomNumber(0, 3);
    //   1

    let answers = [...question.incorrect_answers];
    //   [1,5,8]

    answers.splice(correctAnswerIndex, 0, question.correct_answer);
    //   [1, 4, 5, 8]

    let newQuestionElm = '<div id="new-question">';

    newQuestionElm += "<h2>" + question.question + "</h2>";
    newQuestionElm +=
      "<h3> Correct: <span id='correct'>" + selections.correct + "</span></h3>";
    newQuestionElm +=
      "<h3> Wrong: <span  id='wrong'>" + selections.wrong + "</span></h3>";

    answers.forEach((element) => {
      newQuestionElm += '<p class="option">' + element + "</p>";
    });

    newQuestionElm += "</div>";

    quizWrapper.innerHTML = newQuestionElm;

    addClickEvent();
  }
};

function generateRandomNumber(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const addClickEvent = () => {
  let options = document.getElementsByClassName("option");
  console.log(options);

  for (let index = 0; index < options.length; index++) {
    const element = options[index];
    let question = questions[numberOfCurrentQuestion];
    element.addEventListener("click", function () {
      console.log(element.innerHTML);
      if (element.innerHTML === question.correct_answer) {
        selections.correct = selections.correct + 1;

        correctSelection();
      } else {
        selections.wrong = selections.wrong + 1;
        wrongSelection();
      }
      quizWrapper.innerHTML += '<button id="next" >Next</button>';

      document.querySelector("#next").onclick = () => {
        numberOfCurrentQuestion++;
        showQuestions();
      };
    });
  }
};

const correctSelection = () => {
  console.log("correct_answer");
  quizWrapper.innerHTML += "<p>Bravo</p>";
  document.getElementById("correct").innerHTML = selections.correct;
};

const wrongSelection = () => {
  console.log("yanlis cevap");
  document.getElementById("wrong").innerHTML = selections.wrong;
  quizWrapper.innerHTML += "<p>Try again</p>";
};
