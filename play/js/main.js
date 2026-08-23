// Données
const trys = 8;
const colorList = ['red', 'deeppink', 'green', 'blue', 'orange', 'grey', 'white', 'yellow'];

// Références DOM
const table = document.querySelector('table');
const rows = [...document.querySelectorAll('tr')];
const colors = [...document.querySelectorAll('.color')];
const cells = [...document.querySelectorAll('td')];
const submitBtn = document.querySelector('#submit');
let turn = 0;

// Fonction à appeler pour lancer le jeu
function init() {
    for (let i = 0; i < colors.length; i++) {
        colors[i].style.backgroundColor = colorList[i];
    }
    turn = 0;
    showCurrentRow();
}

// Fonction à appeler une fois le jeu terminé
function resolve() {
    alert('Le jeu est terminé !')
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
    // Résoudre le jeu si tous les essais sont utilisés
    if (turn + 1 >= trys) {
        resolve();
        return;
    }

    // Verifier que toutes les cases sont complètes
    cells.forEach(cell => {
        if (!isCurrentCell(cell)) {
            return;
        }
        if (cell.children == []) {
            alert('Remplissez toutes les cases de la ligne avant de valider.');
            return;
        }
    })

    // Passer au tour suivant
    turn++;
    showCurrentRow();
});

// Initialisation
init();