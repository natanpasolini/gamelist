import { data, refreshData, refreshPresets } from "./handlerData.js";
import { formValueFix, rgbToHex, hexToRGB } from "./cardPreview.js";
import { mouseState, updateMouseState } from "../../main.js";

export function cardEditor(event) {
    if (mouseState != 'default') updateMouseState(mouseState);
    const card = event.currentTarget;

    const uniqueId = card.dataset.uid;
    let index = -1;
    for (let i = 0; i < data.length; i ++) {
        if (data[i].uid == uniqueId) {
            index = i;
            break;
        }
    };

    const cardData = data[index];
    const title = cardData.title;
    const year = cardData.year;
    const hours = cardData.hours;
    const ach = cardData.achievements;
    const maxach = cardData.maxachievements;
    const score = cardData.score;
    const imglink = cardData.imglink;
    const imgstyle = cardData.imgstyle;
    const rgb = cardData.background;
    let desc = cardData.desc;

    const cardEditorHtml = `<dialog class="modal" id="modalCardEditor">
        <div class="flex flex-col bg-neutral-800 border border-neutral-700 rounded-lg p-5 relative">
            <i class="hn hn-window-close-solid text-red-600 absolute top-2 right-2 hover:text-red-800 cursor-pointer" onclick="document.getElementById('modalCardEditor').remove()"></i>
            <div class="flex flex-col gap-2 mb-2">
                <div class="font-silkscreen text-lg">EDITOR</div>
                <span class="w-full h-[2px] bg-neutral-500 rounded-full"></span>
            </div>
                <div class="w-[295px] lg:w-[400px]">
                    <form class="flex flex-col gap-4 max-h-[400px]" id="cardEditor">
                        <h1 class="text-white font-silkscreen">Configurações</h1>
                        <div class="flex flex-col gap-4 overflow-y-scroll outline-none py-1">
                            <div class="flex flex-row gap-4 rounded w-full">
                                <input type="text" required placeholder="TITULO" id="inputGameTitle" class="min-w-0 border-b border-white font-silkscreen text-white outline-none">
                                <input type="number" required min="1900" max="2099"  placeholder="ANO" id="inputGameYear" class="min-w-0 w-[20%] border-b border-white font-silkscreen text-white outline-none">
                            </div>
                            <div class="flex flex-col w-full">
                                <h1 class="text-white font-silkscreen">CONQUISTAS</h1>
                                <div class="flex flex-row gap-4 w-full">
                                    <input type="number" placeholder="ALCANÇADAS" id="inputGameAch" class="min-w-0 border-b border-white font-silkscreen text-white outline-none">
                                    <input type="number" placeholder="TOTAL" id="inputGameMaxAch" class="min-w-0 border-b border-white font-silkscreen text-white outline-none">
                                </div>
                            </div>
                            <div class="flex flex-col w-full">
                                <h1 class="text-white font-silkscreen">HORAS & NOTA</h1>
                                <div class="flex flex-row gap-4 w-full">
                                    <input type="number" required step="0.1" min="1" max="100000" placeholder="HORAS" id="inputGameHours" class="flex-1 min-w-0 border-b border-white font-silkscreen text-white outline-none">
                                    <div class="flex items-center rounded text-white relative w-[170px] group">
                                        <select id="inputGameScore" class="peer z-1 pl-2 border rounded border-white appearance-none bg-transparent outline-none cursor-pointer w-full h-full font-silkscreen">
                                            <option value="N/A" disabled selected>NOTA</option>
                                            <option value="SSS">SSS</option>
                                            <option value="SS">SS</option>
                                            <option value="S">S</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                        </select>
                                        <i class="hn hn-chevron-up absolute select-none z-0 right-3 text-[12px] peer-focus:rotate-180 transform transition"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col w-full">
                                <div class="flex flex-row w-full items-center gap-2">
                                    <h1 class="text-white font-silkscreen">FUNDO</h1>
                                    <span class="border border-transparent w-[24px] h-[24px]" id="previewcardCardMobile"></span>
                                </div>
                                <div class="flex flex-row justify-start items-center gap-4 w-full h-[64px]">
                                    <input type="color" class="min-w-[64px] h-full p-0 m-0 appearance-none bg-transparent cursor-pointer" id="inputGameColor">
                                    <div class="flex flex-1 flex-row justify-between gap-4">
                                        <div class="flex flex-col justify-center items-center w-1/2 gap-2 h-full">
                                            <input type="text" placeholder="Nome" class="w-full flex-1 border-b border-white font-silkscreen text-white outline-none" id="inputGameColorPresetName">
                                            <button type="button" class="text-[10px] gamecard-bg-basic border gamecard-border-basic rounded-md p-2 font-silkscreen duration-200 cursor-pointer hover:bg-white hover:text-black hover:scale-105 active:scale-95" id="inputGameColorPresetSave" onclick="saveColorPreset()">Salvar</button>
                                        </div>
                                        <div class="flex flex-col justify-between items-center w-1/2 gap-2 h-full">
                                            <div class="flex flex-1 justify-center items-center w-full relative">
                                                <select class="peer z-1 pl-2 border rounded border-white appearance-none bg-transparent outline-none cursor-pointer w-full h-full font-silkscreen" id="inputGameColorPresetList">
                                                </select>
                                                <i class="hn hn-chevron-up absolute select-none z-0 right-2 text-[12px] peer-focus:rotate-180 transform transition"></i>
                                            </div>
                                            <div class="flex flex-1 justify-center items-center">
                                                <button type="button" class="text-[10px] gamecard-bg-basic border gamecard-border-basic rounded-md p-2 font-silkscreen duration-200 cursor-pointer hover:bg-white hover:text-black hover:scale-105 active:scale-95" onclick="loadColorPreset(false)">Carregar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col w-full gap-2">
                                <div class="flex flex-row gap-2" >
                                    <h1 class="text-white font-silkscreen">IMAGEM OU GIF</h1>
                                    <div class="flex flex-row gap-1 justify-center items-center bg-stone-800 rounded-md border border-stone-700 px-1 cursor-pointer hover:scale-105" onclick="findSteamID()">
                                        <i class="hn hn-steam select-none"></i>
                                        <p class="font-silkscreen select-none">Steam</p>
                                    </div>
                                </div>
                                <div class="flex flex-row gap-4 w-full">
                                    <input type="text" placeholder="link" id="inputGameImg" class="min-w-0 flex-1 border-b border-white font-silkscreen text-white outline-none">
                                    <div class="flex flex-1 items-center rounded text-white relative min-w-[100px] max-w-[170px] group">
                                        <select id="inputGameImgStyle" class="peer z-1 pl-2 border rounded border-white appearance-none bg-transparent outline-none cursor-pointer w-full h-full font-silkscreen">
                                            <option value="" disabled selected>ESTILO</option>
                                            <option value="object-fill">PREENCHER</option>
                                            <option value="object-cover">COBRIR</option>
                                            <option value="object-fit">CORTAR</option>
                                            <option value="object-contain">CONTER</option>
                                        </select>
                                        <i class="hn hn-chevron-up absolute select-none z-0 right-3 text-[12px] peer-focus:rotate-180 transform transition"></i>
                                    </div>
                                    <div class="flex flex-1 items-center rounded text-white relative min-w-[100px] max-w-[170px] group hidden">
                                        <select id="inputGameImgPos" class="peer z-1 pl-2 border rounded border-white appearance-none bg-transparent outline-none cursor-pointer w-full h-full font-silkscreen">
                                            <option value="" disabled selected>POS</option>
                                            <option value="object-left">ESQUERDA</option>
                                            <option value="object-center">CENTRO</option>
                                            <option value="object-right">DIRETA</option>
                                        </select>
                                        <i class="hn hn-chevron-up absolute select-none z-0 right-3 text-[12px] peer-focus:rotate-180 transform transition"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col w-full">
                                <h1 class="text-white font-silkscreen">DESCRIÇÃO</h1>
                                <div class="flex flex-row gap-4 w-full">
                                    <textarea placeholder="Digite aqui!" id="inputGameDesc" class="min-w-0 w-full h-[100px] border border-white rounded-lg p-1 font-pixelify-sans text-white resize-none outline-none"></textarea>
                                </div>
                            </div>
                        </div>
                        <span class="w-full h-[2px] bg-neutral-500 rounded-full"></span>
                        <div class="flex justify-center items-center h-full">
                            <input type="submit" value="Salvar" class="btn gamecard-bg-basic gamecard-border-basic rounded-md p-2 font-silkscreen duration-200 cursor-pointer hover:bg-white hover:text-black hover:scale-105 active:scale-95"></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </dialog>`
    document.body.insertAdjacentHTML('afterbegin', cardEditorHtml);

    document.getElementById('inputGameTitle').value = title;
    document.getElementById('inputGameYear').value = year;
    document.getElementById('inputGameAch').value = ach;
    document.getElementById('inputGameMaxAch').value = maxach;
    document.getElementById('inputGameHours').value = hours;
    document.getElementById('inputGameScore').value = score;

    let hex = rgbToHex(Number(rgb[0]), Number(rgb[1]), Number(rgb[2]));
    document.getElementById('inputGameColor').value = hex;

    document.getElementById('inputGameImg').value = imglink;
    document.getElementById('inputGameImgStyle').value = imgstyle[0];
    document.getElementById('inputGameImgPos').value = imgstyle[1];
    if (desc == '' || desc == null) desc = '';
    document.getElementById('inputGameDesc').value = desc;

    let inputImgPos = document.getElementById('inputGameImgPos');
    if (imgstyle[0] == 'object-cover' || imgstyle[0] == 'object-contain') inputImgPos.parentElement.classList.remove('hidden'); else inputImgPos.parentElement.classList.add('hidden');

    refreshPresets();

    document.querySelectorAll('[id*="inputGame"]').forEach(input => {
        input.addEventListener('change', formValueFix);
    });
    
    document.getElementById('modalCardEditor').showModal();
    document.getElementById('cardEditor').addEventListener('submit', (event) => {
        event.preventDefault();
        let inputAch = Number(document.getElementById('inputGameAch').value);
        let inputMaxAch = Number(document.getElementById('inputGameMaxAch').value);
        if (inputMaxAch < inputAch) {
            alert(`Maximo de conquistas menor que o alcançado! (${inputAch},${inputMaxAch})`);
        } else {
            if (inputMaxAch > 0 && (inputAch < 0 || inputAch == '' || inputAch == null)) {
                inputAch = 0;
            }
            saveEdit(cardData);
            document.getElementById('modalCardEditor').remove();
            refreshData();
            event.target.reset();
        }
    });
};

function saveEdit(cardData) {
    cardData.title = document.getElementById('inputGameTitle').value;
    cardData.year = document.getElementById('inputGameYear').value;
    cardData.achievements = document.getElementById('inputGameAch').value;
    cardData.maxachievements = document.getElementById('inputGameMaxAch').value;
    cardData.hours = document.getElementById('inputGameHours').value;
    cardData.score = document.getElementById('inputGameScore').value;
    cardData.imglink = document.getElementById('inputGameImg').value;
    cardData.imgstyle = [document.getElementById('inputGameImgStyle').value,document.getElementById('inputGameImgPos').value];
    
    let newRGB = hexToRGB(document.getElementById('inputGameColor').value);
    cardData.background = [newRGB.r,newRGB.g,newRGB.b];

    cardData.desc = document.getElementById('inputGameDesc').value;
}