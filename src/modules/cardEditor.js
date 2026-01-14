import { data, refreshData } from "./handlerData.js";
import { formValueFix } from "./cardPreview.js";

export function cardEditor(event) {
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

    const cardEditorHtml = `<dialog class="modal" id="modalCardEditor">
        <div class="flex flex-col bg-neutral-800 border border-neutral-700 rounded-lg p-5 relative">
            <i class="hn hn-window-close-solid text-red-600 absolute top-2 right-2 hover:text-red-800 cursor-pointer" onclick="document.getElementById('modalCardEditor').remove()"></i>
            <div class="flex flex-col gap-2 mb-2">
                <div class="font-silkscreen text-lg">EDITOR</div>
                <span class="w-full h-[2px] bg-neutral-500 rounded-full"></span>
            </div>
                <div class="w-[295px] lg:w-[400px]">
                    <form class="flex flex-col gap-4 h-full" id="cardEditor">
                        <h1 class="text-white font-silkscreen">Configurações</h1>
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
                                        <option value="D">D</option>
                                        <option value="C">C</option>
                                        <option value="B">B</option>
                                        <option value="A">A</option>
                                        <option value="S">S</option>
                                        <option value="SS">SS</option>
                                        <option value="SSS">SSS</option>
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
                            <div class="flex flex-row gap-4 w-full">
                                <input type="number" max="255" placeholder="RED" id="inputGameRed" class="min-w-0 border-b border-white font-silkscreen text-white outline-none">
                                <input type="number" max="255" placeholder="GREEN" id="inputGameGreen" class="min-w-0 border-b border-white font-silkscreen text-white outline-none">
                                <input type="number" max="255" placeholder="BLUE" id="inputGameBlue" class="min-w-0 border-b border-white font-silkscreen text-white outline-none">
                            </div>
                        </div>
                        <div class="flex flex-col w-full">
                            <h1 class="text-white font-silkscreen">IMAGEM OU GIF</h1>
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
    document.getElementById('inputGameRed').value = rgb[0];
    document.getElementById('inputGameGreen').value = rgb[1];
    document.getElementById('inputGameBlue').value = rgb[2];
    document.getElementById('inputGameImg').value = imglink;
    document.getElementById('inputGameImgStyle').value = imgstyle[0];
    document.getElementById('inputGameImgPos').value = imgstyle[1];

    let inputImgPos = document.getElementById('inputGameImgPos');
    if (imgstyle[0] == 'object-cover' || imgstyle[0] == 'object-contain') inputImgPos.parentElement.classList.remove('hidden'); else inputImgPos.parentElement.classList.add('hidden');

    previewNewColor();

    document.querySelectorAll('[id*="inputGame"]').forEach(input => {
        input.addEventListener('input', previewNewColor);
        input.addEventListener('change', formValueFix);
    });
    
    document.getElementById('modalCardEditor').showModal();
    document.getElementById('cardEditor').addEventListener('submit', (event) => {
        event.preventDefault();
        let inputAch = document.getElementById('inputGameAch').value;
        let inputMaxAch = document.getElementById('inputGameMaxAch').value;
        if (inputMaxAch < inputAch) {
            alert('Maximo de conquistas menor que o alcançado!');
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

function previewNewColor() {
    const previewColor = document.getElementById('previewcardCardMobile');

    let inputRed = document.getElementById('inputGameRed');
    let inputGreen = document.getElementById('inputGameGreen');
    let inputBlue = document.getElementById('inputGameBlue');
    
    if (inputRed.value > 255) inputRed.value = 255;
    if (inputGreen.value > 255) inputGreen.value = 255;
    if (inputBlue.value > 255) inputBlue.value = 255;

    const r = inputRed.value;
    const g = inputGreen.value;
    const b = inputBlue.value ;

    previewColor.style.background = `radial-gradient(circle,rgba(${r}, ${g}, ${b}, 0.7) 0%, rgba(${Math.round(r * 0.4)}, ${Math.round(g * 0.4)}, ${Math.round(b * 0.4)}, 0.7) 100%)`;
    previewColor.style.borderColor = `rgb(${r},${g},${b})`
}

function saveEdit(cardData) {
    cardData.title = document.getElementById('inputGameTitle').value;
    cardData.year = document.getElementById('inputGameYear').value;
    cardData.achievements = document.getElementById('inputGameAch').value;
    cardData.maxachievements = document.getElementById('inputGameMaxAch').value;
    cardData.hours = document.getElementById('inputGameHours').value;
    cardData.score = document.getElementById('inputGameScore').value;
    cardData.imglink = document.getElementById('inputGameImg').value;
    cardData.imgstyle = [document.getElementById('inputGameImgStyle').value,document.getElementById('inputGameImgPos').value];
    cardData.background = [document.getElementById('inputGameRed').value,document.getElementById('inputGameGreen').value,document.getElementById('inputGameBlue').value];
}