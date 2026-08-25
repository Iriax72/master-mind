import Logic from "../../Logic.js";
import initGame from "../../game/gameTable.js";
alert('initGame: ' + initGame);
// Données (TODO à factoriser car aussi présent dans /play/js/main.js)
const colorList = ['red', 'deeppink', 'green', 'blue', 'orange', 'grey', 'white', 'yellow'];

initGame(() => {
    alert('initGame appelé')
    const combi = [];
    
    // Références DOM
    const submitBtn = document.querySelector('#submit');
    const combiSelector = document.querySelector('#combi-selector');
    const selects = [...combiSelector.querySelectorAll('select')];

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

    submitBtn.addEventListener('click', () => {
        selects.forEach(select => {
            combi.push(colorList.indexOf(select.value));
        })
        submitBtn.disabled = true;
    });

    const state = [
        [[0, 1, 2, 3], [1, 0]],
        [[3, 4, 5, 6], [1, 1]],
        [[2, 4, 7, 1], [1, 1]],
        [[0, 2, 6, 1], [2, 0]]
    ];
    alert(Logic.possibleCombis(state));
});