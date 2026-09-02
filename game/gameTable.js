export default async function initGame(callback = ()=>{}) {
    const gameContainer = document.querySelector('#game-container');
    if (!gameContainer) {
        throw new Error('Le conteneur #game-container est introuvable.');
    }

    try {
        const response = await fetch('../game/gameTable.html');
        if (!response.ok) {
            throw new Error(`Impossible de charger la grille : HTTP ${response.status} ${response.statusText}`);
        }

        const gameDocument = new DOMParser().parseFromString(await response.text(), 'text/html');
        const gameMarkup = gameDocument.querySelector('.game');

        if (!gameMarkup) {
            throw new Error('Le fichier gameTable.html ne contient pas d’élément .game.');
        }

        gameContainer.append(gameMarkup);
    } catch (error) {
        console.error('Erreur lors du chargement de la grille de jeu :', error);

        const fallbackMarkup = document.createElement('div');
        fallbackMarkup.className = 'game';
        fallbackMarkup.innerHTML = `
            <table>
                <tr>
                    <td class="result"></td>
                    <td class="case"></td>
                    <td class="case"></td>
                    <td class="case"></td>
                    <td class="case"></td>
                    <td class="result"></td>
                </tr>
                <tr>
                    <td class="result"></td>
                    <td class="case"></td>
                    <td class="case"></td>
                    <td class="case"></td>
                    <td class="case"></td>
                    <td class="result"></td>
                </tr>
                <tr>
                    <td class="result"></td>
                    <td class="case"></td>
                    <td class="case"></td>
                    <td class="case"></td>
                    <td class="case"></td>
                    <td class="result"></td>
                </tr>
                <tr>
                    <td class="result"></td>
                    <td class="case"></td>
                    <td class="case"></td>
                    <td class="case"></td>
                    <td class="case"></td>
                    <td class="result"></td>
                </tr>
                <tr>
                    <td class="result"></td>
                    <td class="case"></td>
                    <td class="case"></td>
                    <td class="case"></td>
                    <td class="case"></td>
                    <td class="result"></td>
                </tr>
                <tr>
                    <td class="result"></td>
                    <td class="case"></td>
                    <td class="case"></td>
                    <td class="case"></td>
                    <td class="case"></td>
                    <td class="result"></td>
                </tr>
                <tr>
                    <td class="result"></td>
                    <td class="case"></td>
                    <td class="case"></td>
                    <td class="case"></td>
                    <td class="case"></td>
                    <td class="result"></td>
                </tr>
                <tr>
                    <td class="result"></td>
                    <td class="case"></td>
                    <td class="case"></td>
                    <td class="case"></td>
                    <td class="case"></td>
                    <td class="result"></td>
                </tr>
            </table>
        `;
        gameContainer.append(fallbackMarkup);
    }

    callback();
}