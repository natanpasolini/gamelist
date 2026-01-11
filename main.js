import { injectModals } from './src/modules/modals.js';
import { writeToData, downloadDB, uploadDB, data } from './src/modules/handlerdata.js';
import { handleFilterChange } from './src/modules/cardsfilter.js';
import { handlePreviewChange } from './src/modules/previewcard.js';

async function getLastCommit() {
    try {
        const url = 'https://api.github.com/repos/natanpasolini/gamelist/commits?per_page=1';
        const feed = await fetch(url);
        const data = await feed.json();
        
        if (data && data.length > 0) {
            const shrink = data[0].sha.substring(0, 7);
            document.getElementById('commit').textContent = `#${shrink}`;
        }
    } catch (error) {
        console.error('Erro ao buscar commit:', error);
    }
};

getLastCommit();
injectModals();

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

document.querySelectorAll('[id*="inputGame"]').forEach(input => {
    input.addEventListener('change', handlePreviewChange);
});

document.getElementById('year-filter').addEventListener('change', handleFilterChange);

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