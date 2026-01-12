import { injectModals } from './src/modules/modals.js';
import { writeToData, downloadDB, uploadDB, loadFromLocalStorage, data } from './src/modules/handlerdata.js';
import { handleFilterChange } from './src/modules/cardsfilter.js';
import { handlePreviewChange } from './src/modules/previewcard.js';
import { attPatches } from './src/modules/patchnotes.js';
import { cardFunctions } from './src/modules/gamecards.js';

/* mousestate */
export let mouseState = 'default';

function updateMouseState(type) {
    if (mouseState == type) {
        document.getElementById(`mouse${type}`).style.color = 'white';
        mouseState = 'default';
        document.body.style.cursor = 'default';
    } else {
        mouseState = type;
        document.getElementById(`mouse${type}`).style.color = 'red';
        document.body.style.cursor = `url('./src/imgs/cursor-${type}.svg'), crosshair`;
    }
}

/* Sem isso não roda as funções */
window.cardFunctions = cardFunctions;
window.updateMouseState = updateMouseState;

/* Atualizar preview */
document.querySelectorAll('[id*="inputGame"]').forEach(input => {
    input.addEventListener('change', handlePreviewChange);
});

/* Criador de cards */
document.getElementById('cardCreator').addEventListener('submit', (event) => {
    event.preventDefault();
    let t = document.getElementById('inputGameTitle').value;
    let y = document.getElementById('inputGameYear').value;
    let a = document.getElementById('inputGameAch').value;
    let ma = document.getElementById('inputGameMaxAch').value;
    let h = document.getElementById('inputGameHours').value;
    let s = document.getElementById('inputGameScore').value;
    let i = document.getElementById('inputGameImg').value;
    writeToData(t,y,a,ma,h,s,i);
    event.target.reset();
});

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
getLastCommit();
injectModals();
attPatches();
loadFromLocalStorage();