import { injectModals } from './src/modules/modals.js';
import { downloadDB, uploadDB, loadFromLocalStorage, refreshData, data, saveColorPreset, loadColorPreset } from './src/modules/handlerData.js';
import { handleFilterChange } from './src/modules/cardsfilter.js';
import { attPatches } from './src/modules/patchnotes.js';
import { cardCreator } from './src/modules/cardCreator.js';
import { cardEditor } from './src/modules/cardEditor.js';
import { attConfigs } from './src/modules/configs.js';
import { findSteamID, chooseImage } from './src/modules/steamid.js';
import { pageSelected, changePage } from './src/modules/cardPage.js';

/* Sem isso não roda as funções */
window.cardFunctions = cardFunctions;
window.updateMouseState = updateMouseState;
window.cardCreator = cardCreator;
window.cardEditor = cardEditor;
window.downloadDB = downloadDB;
window.uploadDB = uploadDB;
window.findSteamID = findSteamID;
window.chooseImage = chooseImage;
window.changePage = changePage;
window.refreshMaxCardsPerPage = refreshMaxCardsPerPage;
window.saveColorPreset = saveColorPreset;
window.loadColorPreset = loadColorPreset;
window.showHamburguer = showHamburguer;

/* Mousestate */
export let mouseState = 'default';

export function updateMouseState(type) {
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
        document.body.style.cursor = `url('./src/assets/cursor-${type}.svg') ${coords}, crosshair`;
    }
}

function cardFunctions(event) {
    const elementoAtivo = event.currentTarget;
    if (mouseState == 'trash') {
        elementoAtivo.remove();
        const uid = elementoAtivo.dataset.uid;
        let index = -1;
        for (let i = 0; i < data.length; i ++) {
            if (data[i].uid == uid) {
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
document.querySelectorAll("[id*='filter']").forEach(input => {
    input.addEventListener('change', handleFilterChange);
});

/* Cards por página */
export let maxCardsPerPage = 6;

function refreshMaxCardsPerPage(event) {
    let selected = event.currentTarget;
    const anterior = document.getElementById('configCardsPerPage').querySelector(`button[data-cardsperpage='${maxCardsPerPage}']`);
    anterior.classList.remove('bg-neutral-800');
    selected.classList.add('bg-neutral-800');
    maxCardsPerPage = selected.dataset.cardsperpage;
    refreshData();
}

/* Menu hamburguer */
function showHamburguer() {
    const hamburguer = document.getElementById('hamburger');
    hamburguer.classList.toggle('hidden');
}

/* Por ser um module, roda quando carrega a página */
attPatches();
attConfigs();
loadFromLocalStorage();
injectModals();