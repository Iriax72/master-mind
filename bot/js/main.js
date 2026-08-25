import Logic from "../../Logic.js";
import initGame from "../../game/gameTable.js";

// Données (TODO à factorisé car aussi présent dans /play/js/main.js)
const colorList = ['red', 'deeppink', 'green', 'blue', 'orange', 'grey', 'white', 'yellow'];

initGame(() => {
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
});