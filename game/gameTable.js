export default async function initGame(callback = ()=>{}) {
    const response = await fetch('../game/gameTable.html');
    const gameDocument = new DOMParser().parseFromString(await response.text(), 'text/html');
    const gameMarkup = gameDocument.querySelector('.game');
    const gameContainer = document.querySelector('#game-container');
    gameContainer.append(gameMarkup)

    callback();
}