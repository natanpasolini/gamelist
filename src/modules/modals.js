const modalGuia = `
<dialog class="modal" id="modalGuia">
        <div class="modal-box bg-neutral-800 border border-neutral-700 flex flex-col gap-2 relative max-h-[70dvh]">
            <i class="hn hn-window-close-solid text-red-600 absolute top-2 right-2 hover:text-red-800 cursor-pointer" onclick="modalGuia.close()"></i>
            <div class="flex flex-col w-full">
                <h1 class="font-silkscreen font-bold text-lg">Guia do Usuário</h1>
            </div>
            <span class="w-full h-[2px] rounded-full bg-neutral-500"></span>
            <div class="flex flex-col gap-4 overflow-y-scroll">
                <p class="font-pixelify-sans text-md">
                    O card de novo jogo desaparece após criar um gamecard, porém há um botão na toolbar para criar outros.
                </p>
                <p class="font-pixelify-sans text-md">
                    A toolbar é sua amiga! nela você encontrará um botão para criar, deletar e editar cards, um botão para ver os patch notes, o botão para esse guia e mais!
                </p>
                <p class="font-pixelify-sans text-md">
                    Os gamecards permitem imagens via link (gifs também funcionam).
                </p>
                <div class="grid grid-cols-2 w-full">
                    <div class="flex flex-col items-start pt-1 border-2 border-black gap-1 bg-black">
                        <div class="flex justify-start items-center pl-2 gap-2">
                            <i class="hn hn-trophy-solid text-yellow-300 text-3xl"></i>
                            <span class="text-white leading-none text-[12px] font-pixelify-sans select-none">
                                Conquistas
                            </span>
                        </div>
                        <div class="flex justify-start items-center pl-2 gap-2">
                            <i class="hn hn-clock text-yellow-300 text-3xl"></i>
                            <span class="text-white leading-none text-[12px] font-pixelify-sans select-none">
                                Horas Jogadas
                            </span>
                        </div>
                    </div>
                    <div class="flex justify-center h-20">
                        <div class="p-2 flex justify-center items-center w-full border-2 border-black score-S">
                            <span class="text-3xl font-pixelify-sans select-none">
                                NOTA
                            </span>
                        </div>
                    </div>
                </div>
                <p class="font-pixelify-sans text-md">
                    As notas vão de F a SSS, sendo F a pior.
                </p>
                <div class="flex justify-center items-center gap-5 w-full">
                    <div class="p-2 w-full flex justify-center items-center border-2 border-black score-F">
                        <span class="text-3xl font-pixelify-sans select-none">
                            F
                        </span>
                    </div>
                    <i class="hn hn-arrow-right text-white text-3xl"></i>
                    <div class="p-2 w-full flex justify-center items-center border-2 border-black score-SSS">
                        <span class="text-3xl font-pixelify-sans select-none">
                            SSS
                        </span>
                    </div>
                </div>
                <div class="alert alert-info">
                    <i class="hn hn-info-circle-solid"></i>
                    <span class="font-silkscreen text-xs">Você pode exportar sua database pela toolbar!</span>
                </div>
                <div class="alert alert-warning">
                    <i class="hn hn-exclamation-triangle-solid"></i>
                    <span class="font-silkscreen text-xs">Esta é uma versão beta, e portanto, está sujeita a mudanças. É possivel que seu save corrompa em versões futuras!</span>
                </div>
            </div>
        </div>
    </dialog>
`

export function injectModals() {
    document.body.insertAdjacentHTML('beforeend', modalGuia);
    document.getElementById('modalGuia').showModal();
}