import Logic from "../../Logic";
import initGame from "../../game/gameTable";

// Données (TODO à factorisé car aussi présent dans /play/js/main.js)
const colorList = ['red', 'deeppink', 'green', 'blue', 'orange', 'grey', 'white', 'yellow'];

initGame(() => {
    // Références DOM
    const submitBtn = document.querySelector('#submit');
    const combiSelector = document.querySelector('#combi-selector');
    const selects = [...combiSelector.querySelectorAll('select')];

    // Donner des options aux selects
    selects.forEach(select => {
        colorList.forEach(color => {
            const option = document.createElement('option');
            option.value = color;
            const coloredDiv = document.createElement('div');
            coloredDiv.style.backgroundColor = color;
            option.innerHTML = coloredDiv;
            select.append(option);
        })
    })
});