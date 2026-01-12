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

    const cardEditorHtml = `<dialog class="modal" id="modalCardEditor">
        <div class="flex flex-col bg-neutral-800 border border-neutral-700 rounded-lg p-5 relative">
            <i class="hn hn-window-close-solid text-red-600 absolute top-2 right-2 hover:text-red-800 cursor-pointer" onclick="document.getElementById('modalCardEditor').remove()"></i>
            <div class="flex flex-col gap-2 mb-2">
                <div class="font-silkscreen text-lg">EDITOR</div>
                <span class="w-full h-[2px] gamecard-bg-basic rounded-full"></span>
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
                                <input type="number" required min="1" max="100000" placeholder="HORAS" id="inputGameHours" class="flex-1 min-w-0 border-b border-white font-silkscreen text-white outline-none">
                                <div class="flex items-center rounded text-white relative w-[170px] group">
                                    <select id="inputGameScore" class="peer z-1 pl-2 border rounded border-white appearance-none bg-transparent outline-none cursor-pointer w-full h-full font-silkscreen">
                                        <option value="N/A" disabled selected>N/A</option>
                                        <option value="F">F</option>
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
                            <h1 class="text-white font-silkscreen">IMAGEM</h1>
                            <div class="flex flex-row gap-4 w-full">
                                <input type="text" placeholder="link da imagem" id="inputGameImg" class="min-w-0 w-full border-b border-white font-silkscreen text-white outline-none">
                            </div>
                        </div>
                        <div class="flex justify-center items-center h-full">
                            <input type="submit" value="Salvar" class="btn gamecard-bg-basic gamecard-border-basic rounded-md p-2 font-silkscreen duration-200 cursor-pointer hover:bg-white hover:text-black hover:scale-105 active:scale-95"></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </dialog>`
    document.body.insertAdjacentHTML('afterbegin', cardEditorHtml);

    document.querySelectorAll('[id*="inputGame"]').forEach(input => {
        input.addEventListener('change', formValueFix);
    });

    document.getElementById('inputGameTitle').value = title;
    document.getElementById('inputGameYear').value = year;
    document.getElementById('inputGameAch').value = ach;
    document.getElementById('inputGameMaxAch').value = maxach;
    document.getElementById('inputGameHours').value = hours;
    document.getElementById('inputGameScore').value = score;
    document.getElementById('inputGameImg').value = imglink;
    
    document.getElementById('modalCardEditor').showModal();
    document.getElementById('cardEditor').addEventListener('submit', (event) => {
        event.preventDefault();
        saveEdit(cardData);
        document.getElementById('modalCardEditor').remove();
        refreshData();
        event.target.reset();
    });
};

function saveEdit(cardData) {
    console.log(cardData,"original")
    cardData.title = document.getElementById('inputGameTitle').value;
    cardData.year = document.getElementById('inputGameYear').value;
    cardData.achievements = document.getElementById('inputGameAch').value;
    cardData.maxachievements = document.getElementById('inputGameMaxAch').value;
    cardData.hours = document.getElementById('inputGameHours').value;
    cardData.score = document.getElementById('inputGameScore').value;
    cardData.imglink = document.getElementById('inputGameImg').value;
    console.log(cardData,"editado")
}