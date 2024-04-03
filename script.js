const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      {text:"HighText Machine Language", correct: false},
      {text:"HyperText Markup Language", correct: true},
      {text:"Hyperlinks and Text Markup Language", correct: false},
      {text:"HomeTool Markup Language", correct: false},
    ]
  },
  {
    question: "Which attribute is used to specify the URL of the image in the &lt;img&gt; tag?",
    answers: [
      {text:"src", correct: true},
      {text:"alt", correct: false},
      {text:"title", correct: false},
      {text:"href", correct: false},
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      {text:"Creative Style Sheets", correct: false},
      {text:"Computer Style Sheets", correct: false},
      {text:"Colorful Style Sheets", correct: false},
      {text:"Cascading Style Sheets", correct: true},
    ]
  },
  {
    question: "Which CSS property is used to change the text color of an element?",
    answers: [
      {text:"font-color", correct: false},
      {text:"color", correct: true},
      {text:"text-color", correct: false},
      {text:"text-style", correct: false},
    ]
  },
  {
    question: "What does JavaScript primarily add to web pages?",
    answers: [
      {text:"Structure", correct: false},
      {text:"Style", correct: false},
      {text:"Behavior", correct: true},
      {text:"Meta-information", correct: false},
    ]
  },
  {
    question: "What does the DOM stand for in JavaScript?",
    answers: [
      {text:"Data Object Model", correct: false},
      {text:"Document Object Model", correct: true},
      {text:"Document Oriented Model", correct: false},
      {text:"Data Object Management", correct: false},
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  })
}


function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild)
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore (){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    
    showQuestion();
  }else {
    showScore();
  }
}


nextButton.addEventListener("click", ()=> {
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else {
    startQuiz();
  }
})



startQuiz();