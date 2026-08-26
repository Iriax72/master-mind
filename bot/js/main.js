import Logic from "../../Logic.js";
import Game from '../../Game.js';
import initGame from "../../game/gameTable.js";

// Données (TODO à factoriser car aussi présent dans /play/js/main.js)
const colorList = ['red', 'deeppink', 'green', 'blue', 'orange', 'grey', 'white', 'yellow'];

// Définir comment l'ordi joue
function play() {
    const state = game.getState();
    const possibleCombis = Logic.possibleCombis(state);
    const rdmIndex = Math.floor(Math.random() * possibleCombis.length);
    game.play(possibleCombis[rdmIndex]);
}

initGame(() => {
    const combi = [];
    
    // Références DOM
    const validateCombiBtn = document.querySelector('#validate-combi');
    const validateEvalBtn = document.querySelector('#validate-eval');
    const combiSelector = document.querySelector('#combi-selector');
    const selects = [...combiSelector.querySelectorAll('select')];
    const table = gameContainer.querySelector('table');

    // Donner des options aux selects
    selects.forEach(select => {
        colorList.forEach(color => {
            const option = document.createElement('option');
            option.value = color;
            option.textContent = color;
            option.style.backgroundColor = color;
            select.append(option);
        })
    });

    // Event listener pour créer la combi solution
    validateCombiBtn.addEventListener('click', () => {
        selects.forEach(select => {
            combi.push(colorList.indexOf(select.value));
        });
        validateCombiBtn.disabled = true;

        // Créer la game
        const game = new Game(combi, table);

        // Faire jouer un premier coup
        play();

        // Activer le boutton de validation
        validateEvalBtn.disabled = false;
        validateEvalBtn.addEventListener('click', () => {
            // Vérifier et afficher l'évaluation

            // Passer au tour suivant
            game.nextTurn();
            // Faire jouer l'ordi
            play();
        });
    });
};