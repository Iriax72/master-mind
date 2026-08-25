// Imports
import Logic from '../../Logic.js';
import Game from './Game.js';
import initGame from '../../game/gameTable.js';

// Données
const colorList = ['red', 'deeppink', 'green', 'blue', 'orange', 'grey', 'white', 'yellow'];

initGame(() => {
    // Références DOM
    const gameContainer = document.querySelector('#game-container');
    const table = gameContainer.querySelector('table');
    const colors = [...document.querySelectorAll('.color')];
    const submitBtn = document.querySelector('#submit');

    // Donner une couleur aux td.color
    for (let i = 0; i < colors.length; i++) {
        colors[i].style.backgroundColor = colorList[i];
    }

    // Fonction pour autoriser le drag n drop
    function allowDragNDrop(draggables) {
        draggables.forEach((draggable) => {
            draggable.addEventListener('dragstart', (event) => {
                event.dataTransfer.setData('text/plain', draggable.style.backgroundColor);
            });
        });

        [...document.querySelectorAll('.case')].forEach((goal) => {
            goal.addEventListener('dragover', (event) => {
                if (game.isCurrentCell(goal)) {
                    event.preventDefault();
                }
            });

            goal.addEventListener('drop', (event) => {
                if (!game.isCurrentCell(goal)) {
                    return;
                }

                event.preventDefault();
                goal.style.backgroundColor = event.dataTransfer.getData('text/plain');
            });
        });
    }

    // Créer la partie
    const game = new Game(Logic.rdmCombi(), table);

    // Autoriser le drag n drop des couleurs
    allowDragNDrop(colors);

    // eventListener pour lasser au tour suivant
    submitBtn.addEventListener('click', () => {

        // Vérifier que toutes les cases sont complètes
        const currentCells = [...game.rows[game.turn].querySelectorAll('.case')];
        const isRowComplete = currentCells.every(cell => cell.style.backgroundColor);

        if (!isRowComplete) {
            alert('Remplissez toutes les cases de la ligne avant de valider.');
            return;
        }

        const essai = currentCells.map(cell => colorList.indexOf(cell.style.backgroundColor));

        // Anoncer le résultat de l'essai
        const result = Logic.evaluate(game.combinaison, essai);
        game.printResult(result);

        // Résoudre le jeu si l'utilisateur à trouvé
        if (result[0] === 4) {
            game.turn++;
            game.resolve('WIN');
            return;
        }

        // Résoudre le jeu si tous les essais sont épuisés
        if (game.turn + 1 >= game.trys) {
            game.resolve('LOSE');
            return;
        }

        // Passer au tour suivant
        game.nextTurn();
    });
});