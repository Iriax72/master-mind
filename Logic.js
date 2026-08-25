export default class Logic {
    /**
     * @description génère une liste de 4 nombres différents entre 0 et 7 (compris)
     * @returns {Array(4)[int]} Une liste d'entiers de longueur 4
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
     * @param {Array(4)[int]} solution
     * @param {Array(4)[int]} combi
     * @returns {Array(2)[int]} Le nombre de couleurs bien positionnées, puis le nombre de couleurs mal positionnées
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
     * @description Génère une combinaison possible
     * @param {Object[Array[int](4), Array[int](2)](8)} state - les coups déjà joués sous forme {[3, 1, 0, 4]: [2, 1]}
     * @returns {Array[int](4)} - le guess
     */
    static possibleCombis (state) {
        const allCombis = [];
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
                        allCombis.push([i, j, k, l]);
                    }
                }
            }
        }
        alert(allCombis);
        return [
            [1, 2, 3, 4],
            [0, 1, 2, 3],
            [5, 4, 2, 6]
        ];
    }
}