import { cardsFiltered, refreshFilters } from "./cardsfilter.js";
import { buildCard } from "./gamecards.js";
import { modalGuiaVisto } from "./modals.js";
import { generatePages } from "./cardPage.js";
import { maxCardsPerPage } from "../../main.js";
import { handlePreviewChange } from "./cardPreview.js";

export const data = [
];

export let presets = {
    default: '#542989'
};

export function writeToData(t, y, a, ma, h, s, i, iS, rgb, d) {
    const newEntry = {
        title: t,
        year: y,
        achievements: a,
        maxachievements: ma,
        hours: h,
        score: s,
        imglink: i,
        imgstyle: iS,
        background: rgb,
        desc: d,
        uid: generateUID()
    };

    data.push(newEntry);
    
    saveToLocalStorage();
    sendCardData(data);
};

function sendCardData(data) {
    const novoCard = data.at(-1);
    
    const title = novoCard.title;
    const year = novoCard.year;
    const achievements = novoCard.achievements;
    const maxachievements = novoCard.maxachievements;
    const hours = novoCard.hours;
    const score = novoCard.score;
    const imglink = novoCard.imglink;
    const imgstyle = novoCard.imgstyle;
    const background = novoCard.background;
    const desc = novoCard.desc;
    const uid = novoCard.uid;

    newgameGamecard();
    buildCard(uid,title,year,achievements,maxachievements,hours,score,imglink,imgstyle,background,desc);
};

export function downloadDB() {
    // Array pra JSON
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Criar download invisivel
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gamecards_db.json';
    
    // "Forçar" download
    a.click();
    window.URL.revokeObjectURL(url);
}

export function uploadDB(event) {
    const fileInput = document.getElementById('fileInputHandler');
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);

            // Validação do arquivo
            if (!Array.isArray(importedData)) {
                throw new Error("O arquivo deve conter uma lista de jogos.");
            }

            if (importedData.length > 0) {
                const requiredKeys = ['title','year','achievements','maxachievements','hours','score','imglink'];
                importedData.forEach(game => {
                    const hasAllKeys = requiredKeys.every(key => key in game);
                    if (!hasAllKeys) {
                        throw new Error("Estrutura do arquivo inválida (keys missing). Por favor verifique o arquivo.");
                    }
                })
            }

            // Deleta os cards antigos
            removeCards();
            
            // Substituir array
            data.length = 0; // Limpa array
            data.push(...importedData); // Adiciona os novos dados

            // Criar chaves novas em saves antigos
            normalizeGamecards();

            // Cria todos os cards novos
            refreshData();

            console.log("Upload concluído com sucesso!");
            
            // Resetar input
            fileInput.value = ''; 

        } catch (err) {
            document.getElementById('modalErroUpload').showModal();
            console.error(err);
        }
    };

    reader.readAsText(file);
}

export function refreshData() {
    refreshFilters();
    buildCards();
    newgameGamecard();
    saveToLocalStorage();
}

export function buildCards() {
    removeCards();
    if (data.length > 0) {
        if (cardsFiltered.length == 0) {
            let max = data.length;
            if (max > maxCardsPerPage) max = maxCardsPerPage;
            for (let i = 0; i < max; i++) {
                const game = data[i];
                buildCard(
                    game.uid,
                    game.title, 
                    game.year, 
                    game.achievements, 
                    game.maxachievements, 
                    game.hours, 
                    game.score, 
                    game.imglink,
                    game.imgstyle,
                    game.background,
                    game.desc
                );
            }
        } else {
            console.log(cardsFiltered);
            let max = cardsFiltered.length;
            if (max > maxCardsPerPage) max = maxCardsPerPage;
            for (let i = 0; i < max; i++) {
                let card = cardsFiltered[i];
                data.forEach(game => {
                    if (game.uid == card) {
                        console.log(game.uid, card);
                        buildCard(
                            game.uid,
                            game.title, 
                            game.year, 
                            game.achievements, 
                            game.maxachievements, 
                            game.hours, 
                            game.score, 
                            game.imglink,
                            game.imgstyle,
                            game.background,
                            game.desc
                        );
                    }
                })
            };
        };
    };
    generatePages();
}

function saveToLocalStorage() {
    localStorage.setItem('gamelist_db', JSON.stringify(data));
    localStorage.setItem('modalGuiaVisto', modalGuiaVisto);
    localStorage.setItem('presets', JSON.stringify(presets));
}

export function loadFromLocalStorage() {
    const savedData = localStorage.getItem('gamelist_db');
    const savedPresets = localStorage.getItem('presets');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        data.length = 0;
        data.push(...parsedData);

        // Criar chaves novas em saves antigos.
        normalizeGamecards();
        
        if (savedPresets) {
            const parsedPresets = JSON.parse(savedPresets);
            presets = parsedPresets;
        }

        refreshData();
        return true;
    }
    
    return false;
}

function normalizeGamecards() {
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].background == '' || data[i].background == null) data[i].background = [93, 42, 155];
            if (data[i].imgstyle == '' || data[i].imgstyle == null) data[i].imgstyle = ['object-fill','object-center'];
            if (data[i].uid == '' || data[i].uid == null) data[i].uid = generateUID();
            if (data[i].desc == null) data[i].desc = 'Adicione uma descrição a este gamecard no modo editar!';
        }
    };
}

export function removeCards() {
    document.querySelectorAll('[id*="gamecard"]').forEach(card => card.remove());
}

function newgameGamecard() {
    const newGameCard = document.getElementById('newGameCard');
    if (data.length > 0) newGameCard.classList.add('hidden'); else newGameCard.classList.remove('hidden');
}

function generateUID() {
    return Math.round(Date.now()+((Math.random())));
}

export function refreshPresets() {
    document.getElementById('inputGameColorPresetList').innerHTML = '<option selected disabled value="default">PRESETS</option>';
    Object.keys(presets).forEach(preset => {
        document.getElementById('inputGameColorPresetList').innerHTML += `<option value="${preset}">${preset}</option>`
    })
}

export function saveColorPreset() {
    const inputGameColor = document.getElementById('inputGameColor');
    const inputGameColorPresetName = document.getElementById('inputGameColorPresetName');
    
    let presetColor = inputGameColor.value;
    let presetName = inputGameColorPresetName.value;

    if (presetName == '' || presetName == null) alert('Nome vazio ou inválido!');
    else {
        presets[presetName] = presetColor;
        console.log(presets);
    }

    saveToLocalStorage();
    refreshPresets();
}

export function loadPresetColor() {
    const presetList = document.getElementById('inputGameColorPresetList');
    const inputColor = document.getElementById('inputGameColor');

    const presetSelected = presetList.value;
    inputColor.value = presets[presetSelected];

    handlePreviewChange();
}