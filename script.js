const playButton = document.querySelector('#button1');
const myAudio = document.querySelector('#my-audio');
const answerBlock = document.querySelector('#answer');

//генерация вопроса
//воспроизвести случайную ноту https://akkordam.ru/nastrojka/zvuki-strun-dlya-nastrojki-gitary

//DATA

//поиск по массиву объектов 
// teacherId = teachers.find(item => item.eName == teacherEnglishNameGet).id;


notes = [
  {
    name: "1",
    sound: "1str.mp3",
    
  },

  {
    name: "2",
    sound: "2str.mp3",    
  }

]

const rand = _.random (0,5)

const onPlayHandler = () => {
  myAudio.src = notes[1].sound;
  myAudio.play();
  generateQuestion(2); 
}

const createButton = (buttonNumber) => {
  let button = document.createElement('button');
  button.textContent = buttonNumber;
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

playSound();