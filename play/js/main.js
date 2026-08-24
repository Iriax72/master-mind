// Imports
import Logic from '../../Logic.js';
import Game from './Game.js';

// Données
const colorList = [
    'red',
    'deeppink',
    'green',
    'blue',
    'orange',
    'grey',
    'white',
    'yellow'
];

// Références DOM
const table = document.querySelector('table');
// const rows = [...table.querySelectorAll('tr')];
const colors = [...document.querySelectorAll('.color')];
// const cells = [...table.querySelectorAll('.case')];
const submitBtn = document.querySelector('#submit');

// Fonction à appeler pour lancer le jeu
function init() {
    const game = new Game(Logic.rdmCombi, table);
    for (let i = 0; i < colors.length; i++) {
        colors[i].style.backgroundColor = colorList[i];
    }
    // game.showCurrentRow();
}

// Fonction à appeler une fois le jeu terminé
function resolve(result) {
    if (result === 'WIN') {
        alert(`Bravo !\nVous avez gagné en ${game.turn} coups`);
    } else if (result === 'LOSE') {
        alert(`Vous avez perdu :(\nLa combinaison était ${game.combinaison}`);
    } else {
        alert('La partie à pris fin');
    }
    throw 'Le jeu est terminé !';
}

// Fonction qui indique visuellement le tour actuel
/*
function showCurrentRow() {
    const row = game.rows[game.turn];

    row.classList.add('current');
    game.rows[game.turn - 1]?.classList.remove('current');
}
*/
// Fonction utilitaire
function isCurrentCell(cell) {
    return cell.parentElement === game.rows[game.turn];
}

/*
/**
 * @description génère une liste de 4 nombres différents entre 0 et 7 (compris)
 * @returns {Array(4)[int]} Une liste d'ints de longueur 4
 
function rdmCombinaison() {
    const numbers = [...Array(8).keys()];
    let combi = [];
    for (let i = 0; i < 4; i++) {
        const rdm = Math.floor(Math.random() * numbers.length);
        combi.push(numbers[rdm])
        numbers.splice(rdm, 1);
    }
    return combi;
}

/**
 * @description Évalue à quel point une combinaison est proche d'une combinaison solution
 * @param {Array(4)[int]} solution 
 * @param {Array(4)[int]} combi 
 * @returns {Array(2)[int]} La premère valeur est le nombre de couleurs bien positionées, la deuxieme est le nombre de couleur mal positionées
 
function evaluate(solution, combi) {
    let goodPosition = 0;
    let wrongPosition = 0;
    combi.forEach(color => {
        if (!solution.includes(color))
            { return; }

        const index = combi.indexOf(color);
        if (solution[index] === color)
        {
            goodPosition++; 
            return;
        }

        wrongPosition++;
    });
    return [goodPosition, wrongPosition];
}
*/

// Autoriser le drag n drop
colors.forEach((color) => {
    color.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', color.style.backgroundColor);
    });
});
// Autoriser le drag n drop
game.cases.forEach((cell) => {
    cell.addEventListener('dragover', (event) => {
        if (isCurrentCell(cell)) {
            event.preventDefault();
        }
    });

    cell.addEventListener('drop', (event) => {
        if (!isCurrentCell(cell)) {
            return;
        }

        event.preventDefault();
        cell.style.backgroundColor = event.dataTransfer.getData('text/plain');
    });
});

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
        resolve('WIN');
        return;
    }

    // Résoudre le jeu si tous les essais sont épuisés
    if (game.turn + 1 >= game.trys) {
        resolve('LOSE');
        return;
    }

    // Passer au tour suivant
    game.turn++;
    game.showCurrentRow();
});

// Initialiser
init();