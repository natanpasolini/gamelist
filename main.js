import { injectModals } from './src/modules/modals.js';
import { downloadDB, uploadDB, loadFromLocalStorage, refreshData, data } from './src/modules/handlerData.js';
import { handleFilterChange } from './src/modules/cardsfilter.js';
import { attPatches } from './src/modules/patchnotes.js';
import { cardCreator } from './src/modules/cardCreator.js';
import { cardEditor } from './src/modules/cardEditor.js';

/* Sem isso não roda as funções */
window.cardFunctions = cardFunctions;
window.updateMouseState = updateMouseState;
window.cardCreator = cardCreator;
window.cardEditor = cardEditor;

/* mousestate */
export let mouseState = 'default';

function updateMouseState(type) {
    let coords = '0 0'
    let iconColor = 'red';
    if (mouseState == type) {
        document.getElementById(`mouse${type}`).style.color = 'white';
        mouseState = 'default';
        document.body.style.cursor = 'default';
    } else {
        if (mouseState != 'default') {
            document.getElementById(`mouse${mouseState}`).style.color = 'white';
        }
        mouseState = type;
        if (type == 'edit') {
            coords = '0 32';
            iconColor = 'cyan';
        } else if (type == 'trash') {
            coords = '0 0';
            iconColor = 'red';
        }
        document.getElementById(`mouse${type}`).style.color = `${iconColor}`;
        document.body.style.cursor = `url('./src/imgs/cursor-${type}.svg') ${coords}, crosshair`;
    }
}

function cardFunctions(event) {
    const elementoAtivo = event.currentTarget;
    if (mouseState == 'trash') {
        elementoAtivo.remove();
        const title = elementoAtivo.querySelector('#gameTitle').innerText;
        let index = -1;
        for (let i = 0; i < data.length; i ++) {
            if (data[i].title == title) {
                index = i;
                break;
            }
        };
        data.splice(index, 1);
        refreshData();
    } else if (mouseState == 'edit') {
        cardEditor(event);
    }
}

/* Filtros */
document.getElementById('year-filter').addEventListener('change', handleFilterChange);

/* Download e Upload */
document.getElementById('downloadDB').addEventListener('click', () => {
    downloadDB();
});

let avisoUpload = false;
document.getElementById('uploadDB').addEventListener('click', () => {
    if (data.length > 0 && avisoUpload == false) {
        modalAvisoUpload.showModal();
        avisoUpload = true;
    } else {
        document.getElementById('fileInputHandler').click();
    }
});
document.getElementById('fileInputHandler').addEventListener('change', (event) => {
    uploadDB(event);
})

/* Por ser um module, roda quando carrega a página */
injectModals();
attPatches();
loadFromLocalStorage();