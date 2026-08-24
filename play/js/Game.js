export default class Game {
    constructor(combi, table, trys = 8) {
        this.combinaison = combi;
        this.table = table;
        this.rows = [...this.table.querySelectorAll('tr')];
        this.cases = [...this.table.querySelectorAll('.case')];
        this.trys = trys;
        this.turn = 0;

        this.showCurrentRow();
    }

    showCurrentRow() {
        const currentRow = this.rows[this.turn];
        currentRow.classList.add('current');
        this.rows[this.turn - 1]?.classList.remove('current');
    }
}