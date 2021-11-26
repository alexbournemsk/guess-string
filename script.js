const playButton = document.querySelector('#button1');
const myAudio = document.querySelector('#my-audio');
const answerBlock = document.querySelector('#answer');
const scoreBlock = document.querySelector('.score-block');
const scoreCount = scoreBlock.querySelector('span');

//генерация вопроса
//воспроизвести случайную ноту https://akkordam.ru/nastrojka/zvuki-strun-dlya-nastrojki-gitary

//DATA

//поиск по массиву объектов 
// teacherId = teachers.find(item => item.eName == teacherEnglishNameGet).id;
 
let currentScore = 0;

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

const onPlayHandler = () => {
  answerBlock.innerHTML = '';
  const randomNote = _.random (0,notes.length-1);
  console.log(randomNote);
  myAudio.src = notes[randomNote].sound;
  myAudio.play();
  generateQuestion(2);
  correctAnswer = notes[randomNote].name;
}

const createButton = (buttonNumber) => {
  let button = document.createElement('button');
  button.textContent = buttonNumber;
  button.addEventListener('click', answerButtonHandler);
  answerBlock.appendChild(button);
}

const generateQuestion = (numberOfQuestions) => {
  for (let i = 1; i <= numberOfQuestions; i++) {
    createButton(i);    
  }
}

const playSound = () => {
  playButton.addEventListener('click', onPlayHandler)
}

const answerButtonHandler = (evt) => {
  answer = evt.target.textContent;
  console.log(`Нажали ${answer}, правильный ответ ${correctAnswer}`)
  if (answer == correctAnswer){
  currentScore = currentScore + 1;
  updateScore();
  };
}

playSound();


