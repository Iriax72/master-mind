// Données
const trys = 8;
const colorList = ['red', 'pink', 'green', 'blue', 'orange', 'grey', 'white', 'yellow'];

// Références DOM
const table = document.querySelector('table');
const rows = [...document.querySelectorAll('tr')];
const colors = [...document.querySelectorAll('.color')];
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

// eventListener pour lasser au tour suivant
submitBtn.addEventListener('click', () => {
    if (turn >= trys) {
        resolve();
        return;
    }

    turn++;
    showCurrentRow();
});

// Initialisation
init();