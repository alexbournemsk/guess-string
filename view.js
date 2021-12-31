export const insertElement = (container, element, position = 'beforeend') => {
  container.insertAdjacentHTML(position, element);
}
export const endGameMessageElement = (currentScore) => {
return  ( `
  <div class = "end-game-message">
  <p>Игра окончена! <br>Очков заработано: ${currentScore}</p>
  </div>
`)
}