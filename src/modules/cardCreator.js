import { formValueFix, handlePreviewChange } from "./cardPreview.js";
import { writeToData } from "./handlerData.js";

const cardCreatorHtml = `<dialog class="modal" id="modalCardCreator">
        <div class="flex flex-col bg-neutral-800 border border-neutral-700 rounded-lg p-5 relative">
            <i class="hn hn-window-close-solid text-red-600 absolute top-2 right-2 hover:text-red-800 cursor-pointer" onclick="document.getElementById('modalCardCreator').remove();"></i>
            <div class="flex flex-col gap-2 mb-2">
                <div class="font-silkscreen text-lg">NOVO JOGO</div>
                <span class="w-full h-[2px] gamecard-bg-basic rounded-full"></span>
            </div>
            <div class="flex flex-row justify-center items-center md:gap-4">
                <div class="hover-3d">
                    <figure>
                        <div class="hidden md:flex rounded-xl flex-col py-6 px-4 shadow-md w-[400px] gamecard-bg-basic gamecard-border-basic backdrop-blur-md border">
                            <div class="relative">
                                <div class="px-[6px] py- m-0 bg-black border border-white rounded flex justify-center items-center absolute -rotate-30 select-none top-1 -left-3">
                                    <span class="text-white text-2xl leading-none font-silkscreen" id="previewcardYear">
                                        ANO
                                    </span>
                                </div>
                                <div class="w-full px-5 py-3">
                                    <div class="border-2 rounded">
                                        <div class="aspect-video flex justify-center">
                                            <img src="/src/imgs/placeholder.webp" class="aspect-video border border-white rounded object-cover" id="previewcardImg">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col justify-center items-center h-full">
                                <div class="bg-transparent p-1 w-full flex justify-center items-center h-[60px]">
                                    <h1 class="text-white text-center text-xl font-silkscreen line-clamp-2" id="previewcardTitle">
                                        TÍTULO
                                    </h1>
                                </div>
                                <div class="grid grid-cols-2 w-full">
                                    <div class="flex flex-col items-start pt-1 border-2 border-black gap-1 bg-black">
                                        <div class="flex justify-start items-center pl-2 gap-2">
                                            <i class="hn hn-trophy-solid text-yellow-300 text-3xl"></i>
                                            <span class="text-white leading-none text-3xl font-micro-5 select-none" id="previewcardAchievements">
                                                CONQUISTAS
                                            </span>
                                        </div>
                                        <div class="flex justify-start items-center pl-2 gap-2">
                                            <i class="hn hn-clock text-yellow-300 text-3xl"></i>
                                            <span class="text-white leading-none text-3xl font-micro-5 select-none" id="previewcardHours">
                                                HORAS
                                            </span>
                                        </div>
                                    </div>
                                    <div class="flex justify-center h-20">
                                        <div class="p-2 flex justify-center items-center w-full h-full border-2 border-black" id="previewcardScoreBG">
                                            <span class="text-3xl font-pixelify-sans select-none text-center" id="previewcardScore">
                                                NOTA
                                            </span>
                                        </div>
                                    </div>
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
                <div class="w-[295px] lg:w-[400px]">
                    <form class="flex flex-col gap-4 h-full"  id="cardCreator"> <!-- id para puxar atualização de preview -->
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
                            <input type="submit" value="Criar Card" class="btn gamecard-bg-basic gamecard-border-basic rounded-md p-2 font-silkscreen duration-200 cursor-pointer hover:bg-white hover:text-black hover:scale-105 active:scale-95"></input>
                        </div>
                        <div class="alert alert-warning">
                            <i class="hn hn-exclamation-triangle-solid"></i>
                            <span class="font-silkscreen">Não há um sistema de edição de cards nesta versão!</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </dialog>`

export function cardCreator() {
    document.body.insertAdjacentHTML('afterbegin', cardCreatorHtml);

    document.querySelectorAll('[id*="inputGame"]').forEach(input => {
        if (input.id != 'inputGameYear') {
            input.addEventListener('input', handlePreviewChange);
        }
        input.addEventListener('change', formValueFix);
    });

    document.getElementById('cardCreator').addEventListener('submit', (event) => {
        event.preventDefault();
        let t = document.getElementById('inputGameTitle').value;
        let y = document.getElementById('inputGameYear').value;
        let a = document.getElementById('inputGameAch').value;
        let ma = document.getElementById('inputGameMaxAch').value;
        if (ma < a) {
            alert('Maximo de conquistas menor que o alcançado!');
        } else {
            let h = document.getElementById('inputGameHours').value;
            let s = document.getElementById('inputGameScore').value;
            let i = document.getElementById('inputGameImg').value;
            writeToData(t,y,a,ma,h,s,i);
            event.target.reset();
        }
    });

    document.getElementById('modalCardCreator').showModal();
};