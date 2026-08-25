const ALL_COMBIS = [];
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        if (i === j)
            { continue; }
        for (let k = 0; k < 8; k++) {
            if (k === i || k === j)
                { continue; }
            for (let l = 0; l < 8; l++) {
                if (l === i || l === j || l === k)
                    { continue; }
                ALL_COMBIS.push([i, j, k, l]);
            };
        };
    };
};

export default class Logic {
    /**
     * @description génère une liste de 4 nombres différents entre 0 et 7 (compris)
     * @returns {Array<int>(4)} Une liste d'entiers de longueur 4
     */
    static rdmCombi() {
        const numbers = [...Array(8).keys()];
        const combi = [];

        for (let i = 0; i < 4; i++) {
            const rdm = Math.floor(Math.random() * numbers.length);
            combi.push(numbers[rdm]);
            numbers.splice(rdm, 1);
        }

        return combi;
    }

    /**
     * @description évalue à quel point une combinaison est proche d'une combinaison solution
     * @param {Array<int>(4)} solution
     * @param {Array<int>(4)} combi
     * @returns {Array<int>(2)} Le nombre de couleurs bien positionnées, puis le nombre de couleurs mal positionnées
     */
    static evaluate(solution, combi) {
        let goodPosition = 0;
        let wrongPosition = 0;

        combi.forEach((color, index) => {
            if (!solution.includes(color))
                { return; }

            if (solution[index] === color) {
                goodPosition++;
                return;
            }

            wrongPosition++;
        });

        return [goodPosition, wrongPosition];
    }

    /**
     * @description Affirme si une combinaison correspond à des nites
     * @param {Array<int>(4)} combi - La combinaison à tester
     * @param {Object<Array<int>(4), Array<int>(2)>} state - Les tentatives déjà notées sous forme {[combi, note], [combi, note], ...}
     * @returns {boolean}
     */
    correspond (combi, state) {
        function correspondToEval(combi, eval) {
            let goodPosition = 0;
            let wrongPosition = 0;
            combi.forEach(digit => {
                if (eval[0].includes(digit)) {
                    if (eval[0].indexOf(digit) === combi.indexOf(digit)) {
                        goodPosition++;
                    } else {
                        wrongPosition++;
                    }
                }
            });
            if (goodPosition === eval[1][0] && wrongPosition === eval[1][1]) {
                return true;
            } else {
                return false;
            }
        }

        state.forEach(eval => {
            if (!correspondToEval(combi, eval)) {
                return false;
            }
        });
        return true;
    }

    /**
     * @description Renvoie toutes les combinaisons possibles
     * @returns {Array<Array<int>(4)>(1680)}
     */
    static get allCombis() {
        return ALL_COMBIS;
    }

    static possibleCombis(state) {
        const possibleCombis = this.allCombis;
        possibleCombis.forEach(combi => {
            if (!this.correspond(combi, state)) {
                possibleCombis.splice(indexOf(combi), 1);
            }
        });
        return possibleCombis;
    }
}