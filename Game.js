export default class Game {
    constructor(combi, table, trys = 8) {
        if (!table) {
            throw new Error('La table du jeu est introuvable.');
        }

        this.combinaison = combi;
        this.table = table;
        this.rows = [...this.table.querySelectorAll('tr')];
        if (!this.rows.length) {
            throw new Error('La table du jeu ne contient aucune ligne (tr).');
        }

        this.trys = trys;
        this.turn = 0;

        this.colorList = ['red', 'deeppink', 'green', 'orange', 'blue', 'grey', 'white', 'yellow'];

        this.showCurrentRow();
    }

    isCurrentCell(cell) {
        return cell.parentElement === this.rows[this.turn];
    }

    getState() {
        const state = {};
        for (let i = 0; i < this.turn; i++) {
            const cases = [...this.rows[i].children];
            const combi = [
                this.colorList.indexOf(cases[1].style.backgroundColor),
                this.colorList.indexOf(cases[2].style.backgroundColor),
                this.colorList.indexOf(cases[3].style.backgroundColor),
                this.colorList.indexOf(cases[4].style.backgroundColor)
            ];
            const evaluation = [
                cases[0].innerText,
                cases[5].innerText
            ];
            state[i] = [combi, evaluation];
        }
        return state;
    }

    showCurrentRow() {
        const currentRow = this.rows[this.turn];
        currentRow.classList.add('current');
        this.rows[this.turn - 1]?.classList.remove('current');
    }

    play(combi) {
        const currentRow = this.rows[this.turn];
        for (let i = 0; i < 4; i++) {
            currentRow[i].style.backgroundColor = this.colorList[combi[i]];
        }
    }

    printResult(result) {
        const resultCases = [...this.rows[this.turn].querySelectorAll('.result')];
        resultCases[0].innerText = result[0];
        resultCases[1].innerText = result[1];
    }

    nextTurn() {
        this.turn++;
        this.showCurrentRow();
    }

    resolve(result) {
        if (result === 'WIN') {
            alert(`Bravo !\nVictoire en ${this.turn} coups.`);
        } else if (result === 'LOSE') {
            alert(`Défaite :(\nLa combinaison était ${this.combinaison}.`);
        } else {
            alert('La partie à pris fin.');
        }
        throw 'La partie a pris fin';
    }
}