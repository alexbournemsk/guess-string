const startButton = document.querySelector('#start-button');
const myAudio = document.querySelector('#my-audio');
const answerBlock = document.querySelector('#answer');
const scoreBlock = document.querySelector('.score-block');
const scoreCount = scoreBlock.querySelector('span');
const progress = document.querySelector('.progress');
const questionNumber = progress.querySelector('span');

//*Генерация следующего вопроса после клика на кнопку ответа
//*Отображать номер вопроса

//Отображение правильный ответ или нет
//Повтор звука после нажатия кнопки Play
//Заменить play на start. кнопка исчезает после начала игры



// https://akkordam.ru/nastrojka/zvuki-strun-dlya-nastrojki-gitary

//DATA

//поиск по массиву объектов 
// teacherId = teachers.find(item => item.eName == teacherEnglishNameGet).id;
 
progress.style.display = "none"

let currentScore = 0;
let questionNumberCount = 0;

const updateScore = () => {
  scoreCount.innerHTML = currentScore;
}

updateScore();

const notes = [
  {
    name: "1",
    sound: "1str.mp3",    
  }, 

  {
    name: "2",
    sound: "2str.mp3", 
  }
]

let correctAnswer = 100;
let answer = 0;

const generateQuestion = () => {
  questionNumberCount++;
  answerBlock.innerHTML = '';
  progress.style.display = ""; //показываем блок очков и вопроса
  questionNumber.textContent = questionNumberCount;
  const randomNote = _.random (0,notes.length-1);
  myAudio.src = notes[randomNote].sound;
  myAudio.play();
  addButtons(2);
  correctAnswer = notes[randomNote].name;
}

const createButton = (buttonNumber) => {
  let button = document.createElement('button');
  button.textContent = buttonNumber;
  button.addEventListener('click', answerButtonHandler);
  answerBlock.appendChild(button);
}

const addButtons = (numberOfQuestions) => {
  for (let i = 1; i <= numberOfQuestions; i++) {
    createButton(i);    
  }
}

const startGame = () => {
  startButton.addEventListener('click', generateQuestion)
}

const answerButtonHandler = (evt) => {
  answer = evt.target.textContent;
  console.log(`Нажали ${answer}, правильный ответ ${correctAnswer}`)
  if (answer == correctAnswer){
  currentScore++;
  updateScore();
  generateQuestion();
  } else {generateQuestion()}
}

startGame();


