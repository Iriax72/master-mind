// Imports
import Logic from '../../Logic.js';
import Game from '../../Game.js';
import initGame from '../../game/gameTable.js';

// Données
const colorList = ['red', 'deeppink', 'green', 'blue', 'orange', 'grey', 'white', 'yellow'];

initGame(() => {
    // Références DOM
    const gameContainer = document.querySelector('#game-container');
    if (!gameContainer) {
        throw new Error('Le conteneur #game-container est introuvable.');
    }

    const table = gameContainer.querySelector('table');
    if (!table) {
        throw new Error('La table du jeu est introuvable dans #game-container.');
    }

    const colors = [...document.querySelectorAll('.color')];
    if (!colors.length) {
        throw new Error('Aucune couleur n’a été trouvée dans .color.');
    }

    const submitBtn = document.querySelector('#submit');
    if (!submitBtn) {
        throw new Error('Le bouton #submit est introuvable.');
    }

    // Donner une couleur aux td.color
    for (let i = 0; i < colors.length; i++) {
        colors[i].style.backgroundColor = colorList[i];
    }

    // Fonction pour autoriser le drag n drop
    function allowDragNDrop(draggables, gameInstance) {
        draggables.forEach((draggable) => {
            draggable.addEventListener('dragstart', (event) => {
                if (!event.dataTransfer) {
                    return;
                }

                event.dataTransfer.setData('text/plain', draggable.style.backgroundColor || '');
            });
        });

        const allCases = [...document.querySelectorAll('.case')];
        if (!allCases.length) {
            throw new Error('Aucune case .case n’a été trouvée dans la grille.');
        }

        allCases.forEach((goal) => {
            goal.addEventListener('dragover', (event) => {
                if (gameInstance.isCurrentCell(goal)) {
                    event.preventDefault();
                }
            });

            goal.addEventListener('drop', (event) => {
                if (!gameInstance.isCurrentCell(goal)) {
                    return;
                }

                event.preventDefault();
                const color = event.dataTransfer?.getData('text/plain');
                if (!color) {
                    return;
                }

                goal.style.backgroundColor = color;
            });
        });
    }

    // Créer la partie
    const game = new Game(Logic.rdmCombi(), table);

    // Autoriser le drag n drop des couleurs
    allowDragNDrop(colors, game);

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