import { formValueFix, handlePreviewChange, hexToRGB } from "./cardPreview.js";
import { writeToData } from "./handlerData.js";
import { mouseState } from "../../main.js";

const cardCreatorHtml = `<dialog class="modal" id="modalCardCreator">
        <div class="flex flex-col bg-neutral-800 border border-neutral-700 rounded-lg p-5 relative">
            <i class="hn hn-window-close-solid text-red-600 absolute top-2 right-2 hover:text-red-800 cursor-pointer" onclick="document.getElementById('modalCardCreator').remove();"></i>
            <div class="flex flex-col gap-2 mb-2">
                <div class="font-silkscreen text-lg">NOVO JOGO</div>
                <span class="w-full h-[2px] bg-neutral-500 rounded-full"></span>
            </div>
            <div class="flex flex-row justify-center items-center md:gap-4 max-h-[400px]">
                <div class="hover-3d h-full min-h-[400px]">
                    <figure>
                        <div class="hidden md:flex rounded-xl flex-col py-6 px-4 shadow-md w-[400px] backdrop-blur-md border" id="previewcardCard">
                            <div class="relative">
                                <div class="px-[6px] rounded flex justify-center items-center absolute -rotate-30 select-none top-1 -left-3">
                                    <span class="text-white text-2xl leading-none font-silkscreen text-ultra-strong drop-shadow-xl/80" id="previewcardYear">
                                        ANO!
                                    </span>
                                </div>
                                <div class="w-full px-5 py-3">
                                    <div class="border-2 rounded">
                                        <div class="aspect-video flex justify-center">
                                            <img src="./src/assets/placeholder.webp" class="aspect-video border border-white rounded" id="previewcardImg">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col justify-center items-center h-full">
                            <div class="bg-transparent pb-2 w-full flex justify-center items-center h-[60px]">
                                <h1 class="text-white text-center text-xl font-silkscreen line-clamp-2 text-shadow-[2px_2px_4px_rgba(0,0,0,1)] drop-shadow-md/60" id="previewcardTitle">
                                    TÍTULO
                                </h1>
                            </div>
                            <div class="flex flex-row w-full rounded-lg border-2" id="previewcardStats">
                                <div class="flex flex-col flex-1 items-start rounded-lg rounded-r-none">
                                    <div class="flex justify-start items-center px-2 py-1 gap-2">
                                        <i class="hn hn-trophy-solid text-gold text-3xl text-shadow-lg/60"></i>
                                        <span class="text-white leading-none text-3xl font-micro-5 select-none text-shadow-lg/60" id="previewcardAchievements">
                                            CONQUISTAS
                                        </span>
                                    </div>
                                    <div class="flex justify-start items-center px-2 py-1 gap-2">
                                        <i class="hn hn-clock text-gold text-3xl text-shadow-lg/60"></i>
                                        <span class="text-white leading-none text-3xl flex-1 font-micro-5 select-none text-shadow-lg/60" id="previewcardHours">
                                            HORAS
                                        </span>
                                    </div>
                                </div>
                                <div class="flex justify-end w-[50%]">
                                    <div class="p-2 flex flex-1 justify-center items-center border-2 border-transparent rounded-md" id="previewcardScoreBG">
                                        <span class="text-3xl font-pixelify-sans select-none text-shadow-lg/60" id="previewcardScore">
                                            NOTA
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div class="hidden rounded-xl flex flex-col py-6 pb-3 px-4 shadow-md w-[320px] h-full md:w-[350px] lg:w-[400px] max-h-[400px] backdrop-blur-md border" id="versoCreator">
                            <h1 class="font-silkscreen text-white text-shadow-[2px_2px_4px_rgba(0,0,0,1)] truncate"></h1>
                            <div class="w-full flex-1 bg-black/25 border border-black rounded overflow-y-scroll">
                                <h1 class="font-pixelify-sans p-2 opacity-90 select-none" id="previewcardDesc"></h1>
                            </div>
                            <div class="flex flex-row items-end justify-between w-full min-h-[20%]">
                                <div class="bg-black/10 rounded px-2">
                                    <p class="font-silkscreen text-white opacity-25 text-shadow-[2px_2px_4px_rgba(0,0,0,1)] select-none"></p>
                                </div>
                                <div class="flex flex-col">
                                    <p class="font-silkscreen text-white opacity-25 text-shadow-[2px_2px_4px_rgba(0,0,0,1)] select-none"></p>
                                </div>
                            </div>
                        </div>
                    </figure>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div class="w-[295px] lg:w-[400px] flex flex-col h-full">
                    <form class="flex flex-col gap-4 max-h-[400px]"  id="cardCreator"> <!-- id para puxar atualização de preview -->
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
                                    <input type="number" step="0.1" required min="1" max="100000" placeholder="HORAS" id="inputGameHours" class="flex-1 min-w-0 border-b border-white font-silkscreen text-white outline-none">
                                    <div class="flex flex-1 items-center rounded text-white relative min-w-[100px] max-w-[170px] group">
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
                                    <span class="border border-transparent w-[24px] h-[24px] md:hidden" id="previewcardCardMobile"></span>
                                </div>
                                <div class="flex flex-row justify-start items-center gap-4 w-full h-[64px]">
                                    <input type="color" class="min-w-[64px] h-full p-0 m-0 appearance-none bg-transparent cursor-pointer" id="inputGameColor">
                                    <div class="flex flex-1 flex-row justify-between gap-4 opacity-20">
                                        <div class="flex flex-col justify-center items-center w-1/2 gap-2 h-full">
                                            <input disabled type="text" required placeholder="Nome" class="w-full flex-1 border-b border-white font-silkscreen text-white outline-none">
                                            <button type="button" class="text-[10px] gamecard-bg-basic border gamecard-border-basic rounded-md p-2 font-silkscreen duration-200 cursor-pointer hover:bg-white hover:text-black hover:scale-105 active:scale-95">Salvar</button>
                                        </div>
                                        <div class="flex flex-col justify-between items-center w-1/2 gap-2 h-full">
                                            <div class="flex flex-1 justify-center items-center w-full relative">
                                                <select disabled class="peer z-1 pl-2 border rounded border-white appearance-none bg-transparent outline-none cursor-pointer w-full h-full font-silkscreen">
                                                    <option selected value="">DEFAULT</option>
                                                </select>
                                                <i class="hn hn-chevron-up absolute select-none z-0 right-2 text-[12px] peer-focus:rotate-180 transform transition"></i>
                                            </div>
                                            <div class="flex flex-1 justify-center items-center">
                                                <button type="button" class="text-[10px] gamecard-bg-basic border gamecard-border-basic rounded-md p-2 font-silkscreen duration-200 cursor-pointer hover:bg-white hover:text-black hover:scale-105 active:scale-95">Carregar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col w-full gap-2">
                                <div class="flex flex-row gap-2">
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
                                            <option value="object-fill" disabled selected>ESTILO</option>
                                            <option value="object-fill">PREENCHER</option>
                                            <option value="object-cover">COBRIR</option>
                                            <option value="object-fit">CORTAR</option>
                                            <option value="object-contain">CONTER</option>
                                        </select>
                                        <i class="hn hn-chevron-up absolute select-none z-0 right-3 text-[12px] peer-focus:rotate-180 transform transition"></i>
                                    </div>
                                    <div class="flex flex-1 items-center rounded text-white relative min-w-[100px] max-w-[170px] group hidden">
                                        <select id="inputGameImgPos" class="peer z-1 pl-2 border rounded border-white appearance-none bg-transparent outline-none cursor-pointer w-full h-full font-silkscreen">
                                            <option value="object-center" disabled selected>POS</option>
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
                        <div class="flex justify-center items-center flex-1">
                            <input type="submit" value="Criar Card" class="btn gamecard-bg-basic gamecard-border-basic rounded-md p-2 font-silkscreen duration-200 cursor-pointer hover:bg-white hover:text-black hover:scale-105 active:scale-95"></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </dialog>`

export function cardCreator() {
    if (mouseState != 'default') updateMouseState(mouseState);
    document.body.insertAdjacentHTML('afterbegin', cardCreatorHtml);

    document.querySelectorAll('[id*="inputGame"]').forEach(input => {
        if (input.id != 'inputGameYear' || input.id != 'inputGameDesc') {
            input.addEventListener('input', handlePreviewChange);
            if (input.id != 'inputGameColor') {
                input.addEventListener('input', frenteCard);
            };
        }
        input.addEventListener('change', formValueFix);
    });

    document.getElementById('inputGameDesc').addEventListener('input', () => {
        versoCard();
    })

    document.getElementById('cardCreator').addEventListener('submit', (event) => {
        event.preventDefault();
        let t = document.getElementById('inputGameTitle').value;
        let y = document.getElementById('inputGameYear').value;
        let a = Number(document.getElementById('inputGameAch').value);
        let ma = Number(document.getElementById('inputGameMaxAch').value);
        let h = document.getElementById('inputGameHours').value;
        let s = document.getElementById('inputGameScore').value;
        let i = document.getElementById('inputGameImg').value;
        let iS = [document.getElementById('inputGameImgStyle').value,document.getElementById('inputGameImgPos').value];

        let newRGB = hexToRGB(document.getElementById('inputGameColor').value);
        let rgb = [newRGB.r,newRGB.g,newRGB.b];

        let d = document.getElementById('inputGameDesc').value;
        if (ma < a) {
            alert('Maximo de conquistas menor que o alcançado!');
        } else {
            if (ma > 0 && (a < 0 || a == '' || a == null)) {
                a = 0;
            }
            writeToData(t,y,a,ma,h,s,i,iS,rgb,d);
            document.getElementById('modalCardCreator').remove();
            event.target.reset();
        }
    });

    document.getElementById('modalCardCreator').showModal();
};

function frenteCard() {
    const card = document.getElementById('modalCardCreator');
    const frente = card.querySelector('#previewcardCard');
    const verso = card.querySelector('#versoCreator');
    if (frente.classList.contains('hidden')) frente.classList.remove('md:hidden'); verso.classList.add('hidden');
}

function versoCard() {
    const card = document.getElementById('modalCardCreator');
    const frente = card.querySelector('#previewcardCard');
    const verso = card.querySelector('#versoCreator');
    if (verso.classList.contains('hidden')) verso.classList.remove('hidden'); frente.classList.add('md:hidden');
    const previewDesc = document.getElementById('previewcardDesc');
    const inputDesc = document.getElementById('inputGameDesc');

    previewDesc.innerHTML = inputDesc.value;
}