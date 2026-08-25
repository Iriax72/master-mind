// Imports
import Logic from '../../Logic.js';
import Game from './Game.js';

// Données
const colorList = ['red', 'deeppink', 'green', 'blue', 'orange', 'grey', 'white', 'yellow'];

// Références DOM
const table = document.querySelector('table');
const colors = [...document.querySelectorAll('.color')];
const submitBtn = document.querySelector('#submit');

// Donner une couleur aux td.color
for (let i = 0; i < colors.length; i++) {
    colors[i].style.backgroundColor = colorList[i];
}
// Fonction à  une fois le jeu terminé
/*
function resolve(result) {
    if (result === 'WIN') {
        alert(`Bravo !\nVous avez gagné en ${game.turn} coups`);
    } else if (result === 'LOSE') {
        alert(`Vous avez perdu :(\nLa combinaison était ${game.combinaison}`);
    } else {
        alert('La partie à pris fin');
    }
    throw 'Le jeu est terminé !';
}*/

// Fonction utilitaire
/*
function isCurrentCell(cell) {
    return cell.parentElement === game.rows[game.turn];
}*/

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
    const resultCases = [...game.rows[game.turn].querySelectorAll('.result')];
    resultCases[0].innerText = result[0];
    resultCases[1].innerText = result[1];

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
    game.turn++;
    game.showCurrentRow();
});