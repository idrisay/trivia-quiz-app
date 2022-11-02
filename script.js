let numberOfQuestionElm = document.getElementById("number-of-question");
let categoryElm = document.getElementById("category");
let difficultyElm = document.getElementById("difficulty");
let startBtn = document.getElementById("start");
let loadingWrapper = document.getElementById("loading-wrapper");
let selection = document.getElementById("selection");
// let numberOfQuestion = 10;
// let category = '9';
// let difficulty = 'easy';
let questions = [];
let numberOfCurrentQuestion = 0;

startBtn.onclick = () => {
  loadingWrapper.style.display = "block";
  selection.style.display = "none";
  let numberOfQuestion = numberOfQuestionElm.value;
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
  showQuestions();
};

const showQuestions = () => {
  loadingWrapper.style.display = "none";

  console.log("sq", questions[0]);
};
