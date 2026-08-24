export default class Game {
    constructor(combi, table, trys = 8) {
        this.combinaison = combi;
        this.table = table;
        this.rows = [...this.table.querySelectorAll('tr')];
        // this.cases = [...this.table.querySelectorAll('.case')];
        this.trys = trys;
        this.turn = 0;

        this.showCurrentRow();
    }

    isCurrentCell(cell) {
        return cell.parentElement === this.rows[this.turn];
    }

    showCurrentRow() {
        const currentRow = this.rows[this.turn];
        currentRow.classList.add('current');
        this.rows[this.turn - 1]?.classList.remove('current');
    }

    resolve(result) {
        if (result === 'WIN') {
            alert(`Bravo !\nVous avez gagné en ${this.turn} coups.`);
        } else if (result === 'LOSE') {
            alert(`Vous avez perdu :(\nLa combinaison était ${this.combinaison}.`);
        } else {
            alert('La partie à pris fin.');
        }
        throw 'La partie a pris fin';
    }
}