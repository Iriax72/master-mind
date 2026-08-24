// Données
const trys = 8;
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
const rows = [...document.querySelectorAll('tr')];
const colors = [...document.querySelectorAll('.color')];
const cells = [...document.querySelectorAll('.case')];
const submitBtn = document.querySelector('#submit');
let turn = 0;
let combinaison = [];

// Fonction à appeler pour lancer le jeu
function init() {
    for (let i = 0; i < colors.length; i++) {
        colors[i].style.backgroundColor = colorList[i];
    }
    combinaison = rdmCombinaison();
    turn = 0;
    showCurrentRow();
}

// Fonction à appeler une fois le jeu terminé
function resolve(result) {
    if (result === 'WIN') {
        alert(`Bravo !\nVous avez gagné en ${turn} coups`);
    } else if (result === 'LOSE') {
        alert(`Vous avez perdu :(\nLa combinaison était ${combinaison}`);
    } else {
        alert('La partie à pris fin');
    }
    throw 'Le jeu est terminé !';
}

// Fonction qui indique visuellement le tour actuel
function showCurrentRow() {
    const row = rows[turn];

    row.classList.add('current');
    rows[turn - 1]?.classList.remove('current');
}

// Fonction utilitaire
function isCurrentCell(cell) {
    return cell.parentElement === rows[turn];
}

/**
 * @description génère une liste de 4 nombres différents entre 0 et 7 (compris)
 * @returns {Array(4)[int]} Une liste d'ints de longueur 4
 */
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
 */
function evaluate(solution, combi) {
    let wellPositioned = 0;
    let wrongPosition = 0;
    combi.forEach(color => {
        if (!solution.includes(color))
            { return; }

        const index = combi.indexOf(color);
        if (solution[index] === color)
        {
            wellPositioned++; 
            return;
        }

        wrongPosition++;
    });
    return [wellPositioned, wrongPosition];
}

// Autoriser le drag n drop
colors.forEach((color) => {
    color.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', color.style.backgroundColor);
    });
});
// Autoriser le drag n drop
cells.forEach((cell) => {
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
    const currentCells = [...rows[turn].querySelectorAll('.case')];
    const isRowComplete = currentCells.every(cell => cell.style.backgroundColor);

    if (!isRowComplete) {
        alert('Remplissez toutes les cases de la ligne avant de valider.');
        return;
    }

    const essai = currentCells.map(cell => colorList.indexOf(cell.style.backgroundColor));

    // Anoncer le résultat de l'essai
    const result = evaluate(combinaison, essai);
    const resultCases = [...rows[turn].querySelectorAll('.result')];
    resultCases[0].innerText = result[0];
    resultCases[1].innerText = result[1];

    // Résoudre le jeu si l'utilisateur à trouvé
    if (result[0] === 4) {
        turn++;
        resolve('WIN');
        return;
    }

    // Résoudre le jeu si tous les essais sont épuisés
    if (turn + 1 >= trys) {
        resolve('LOSE');
        return;
    }

    // Passer au tour suivant
    turn++;
    showCurrentRow();
});

// Initialiser
init();