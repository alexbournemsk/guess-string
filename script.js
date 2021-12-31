import { insertElement, endGameMessageElement } from "./view.js";

const mainContainer = document.querySelector('.container');
const startButton = document.querySelector('#start-button');
const playSoundButton = document.querySelector('.play-button');
const myAudio = document.querySelector('#my-audio');
const answerBlock = document.querySelector('#answer');
const scoreBlock = document.querySelector('.score-block');
const scoreCount = scoreBlock.querySelector('span');
const progress = document.querySelector('.progress');
const questionNumber = progress.querySelector('span');

const NUMBER_OF_QUESTIONS = 1;
const STRING_NAMES = ['0', 'Первая', 'Вторая']

//*Генерация следующего вопроса после клика на кнопку ответа
//*Отображать номер вопроса
//*Отображение правильный ответ или нет

//*Очки до старта не отображать
//*Конец игры


//*Рестарт игры
//*Заменить play на start. кнопка исчезает после начала игры
//*Повтор звука после нажатия кнопки Play

//Защита от тротлинга



// https://akkordam.ru/nastrojka/zvuki-strun-dlya-nastrojki-gitary

//DATA

//поиск по массиву объектов 
// teacherId = teachers.find(item => item.eName == teacherEnglishNameGet).id;



progress.style.display = 'none'; //номер вопроса
scoreBlock.style.display = 'none'; //количество очков
playSoundButton.style.display = 'none'; //кнопка повтора звука

let currentScore = 0;
let questionNumberCount = 0;


const updateScore = () => {
  scoreCount.innerHTML = currentScore;
}

updateScore();

const notes = [
  {
    name: "Первая",
    sound: "1str.mp3",
  },

  {
    name: "Вторая",
    sound: "2str.mp3",
  }
]

let correctAnswer = 100;
let answer = 0;

const generateQuestion = () => {
  if (questionNumberCount > NUMBER_OF_QUESTIONS) {
    endGame();
  } else {
    updateScore();
    answerBlock.style.display = '';
    playSoundButton.style.display = '';
    startButton.style.display = 'none';
    questionNumberCount++;
    answerBlock.innerHTML = '';
    progress.style.display = ""; //показываем блок очков и вопроса
    scoreBlock.style.display = "";
    questionNumber.textContent = questionNumberCount;
    const randomNote = _.random(0, notes.length - 1);
    myAudio.src = notes[randomNote].sound;
    myAudio.play();
    setTimeout(() => { addButtons(2) }, 1000);
    correctAnswer = notes[randomNote].name;
  }
}

const createButton = (buttonNumber) => {
  let button = document.createElement('button');
  let buttonAnswer = buttonNumber;
  button.textContent = STRING_NAMES[buttonNumber];
  button.addEventListener('click', answerButtonHandler);
  answerBlock.appendChild(button);
}

const addButtons = (numberOfQuestions) => {
  for (let i = 1; i <= numberOfQuestions; i++) {
    createButton(i);
  }
}

const startGame = () => {
  currentScore = 0;
  questionNumberCount = 0;
  startButton.addEventListener('click', generateQuestion);
}

const newGame = () => {
  mainContainer.innerHTML = "";
  generateQuestion(); 
}

const playSound = () => {
  myAudio.play();
}

playSoundButton.addEventListener('click', playSound)

const endGame = () => {
  answerBlock.style.display = 'none';
  scoreBlock.style.display = 'none';
  progress.style.display = 'none';
  playSoundButton.style.display = 'none';
  startButton.style.display = '';
  startButton.textContent = 'Играть еще';
  insertElement(mainContainer, endGameMessageElement(currentScore),'beforeend');
  currentScore = 0;
  questionNumberCount = 0;
  //Убираем финальное сообщение
  const messageElement = document.querySelector('.end-game-message');
  const removeMessage = () => messageElement.remove();
  startButton.addEventListener('click', removeMessage);

}

const showMessageCorrect = (evt) => {
  const button = evt.target
  let message = document.createElement('p');
  button.classList.add('answer-correct');
  message.classList.add('answer-correct');
  message.textContent = 'Правильно!';
  answerBlock.appendChild(message);
}

const showMessageIncorrect = () => {
  let message = document.createElement('p');
  message.classList.add('answer-incorrect');
  message.textContent = 'Не правильно!';
  answerBlock.appendChild(message);
}

const answerButtonHandler = (evt) => {
  answer = evt.target.textContent;
  if (answer == correctAnswer) {
    currentScore++;
    updateScore();
    showMessageCorrect(evt);
    setTimeout(generateQuestion, 700);
  } else {
    showMessageIncorrect(evt);
    setTimeout(generateQuestion, 700)
  }

}

startGame();


