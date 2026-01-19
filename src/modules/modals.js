const modalGuia = `
<dialog class="modal outline-none" id="modalGuia">
        <div class="modal-box bg-neutral-800 border border-neutral-700 flex flex-col gap-2 relative max-h-[70dvh]">
            <i class="hn hn-window-close-solid text-red-600 absolute top-2 right-2 hover:text-red-800 cursor-pointer" onclick="modalGuia.close()"></i>
            <h1 class="font-silkscreen font-bold text-lg">Guia do Usuário</h1>
            <span class="w-full h-[2px] rounded-full bg-neutral-500"></span>
            <div class="flex flex-col gap-4 overflow-y-scroll outline-none">
                <p class="font-pixelify-sans text-md">
                    A toolbar é sua amiga! nela você encontrará as funções de card (criar, deletar e editar), os filtros e as configurações!
                </p>
                <img src='./src/assets/gifs/card-creator.gif'>
                <p class="font-pixelify-sans text-md">
                    Os gamecards permitem imagens via link (gifs também funcionam).
                </p>
                <p class="font-pixelify-sans text-md">
                    JACKPOT! As notas vão de D a SSS, sendo D a pior.
                </p>
                <div class="flex justify-center items-center gap-5 w-full">
                    <div class="p-2 w-full flex justify-center items-center border-2 border-black score-D">
                        <span class="text-3xl font-pixelify-sans select-none text-shadow-md/60">
                            D
                        </span>
                    </div>
                    <i class="hn hn-arrow-right text-white text-3xl"></i>
                    <div class="p-2 w-full flex justify-center items-center border-2 border-black score-SSS">
                        <span class="text-3xl font-pixelify-sans select-none text-shadow-md/60">
                            SSS
                        </span>
                    </div>
                </div>
                <div class="alert alert-info">
                    <i class="hn hn-info-circle-solid"></i>
                    <span class="font-silkscreen text-xs">Você pode exportar sua database e ver os patch notes nas configs!</span>
                </div>
            </div>
            <span class="w-full h-[2px] rounded-full bg-neutral-500"></span>
        </div>
    </dialog>
`

export let modalGuiaVisto = localStorage.getItem('modalGuiaVisto');

export function injectModals() {
    document.body.insertAdjacentHTML('beforeend', modalGuia);
    if (modalGuiaVisto != 'true') {
        document.getElementById('modalGuia').showModal();
        localStorage.setItem('modalGuiaVisto', true);
    }
}