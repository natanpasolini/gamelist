const configsSections = ['DADOS', 'OUTROS'];

const configs = [
    {
        section: 'DADOS',
        title: 'Database',
        description: 'Dados da sua lista de jogos.',
        id: 'Database', 
        icon: 'hn-data-science',
        action: '',
        extraLine: '',
        extraDiv: `<div class="flex flex-1 justify-center items-center font-silkscreen h-full"> <button class="flex justify-center p-1 bg-neutral-700 border border-neutral-600 rounded-l outline-none cursor-pointer hover:bg-neutral-600 bg-neutral-800" onclick="downloadData('db')"><i class="hn hn-download-alt-solid"></i></button> <button class="flex justify-center p-1 bg-neutral-700 border border-neutral-600 rounded-r outline-none cursor-pointer hover:bg-neutral-600 bg-neutral-800" onclick="document.getElementById('dbFileInputHandler').click()"><i class="hn hn-upload-alt-solid"></i> <input type="file" id="dbFileInputHandler" class="hidden" accept=".json"></button> </div>`
    },
    {
        section: 'DADOS',
        title: 'PRESETS',
        description: 'Seus presets de cores.',
        id: 'Presets',
        icon: 'hn-edit-solid',
        action: ``,
        extraLine: ``,
        extraDiv: `<div class="flex flex-1 justify-center items-center font-silkscreen h-full"> <button class="flex justify-center p-1 bg-neutral-700 border border-neutral-600 rounded-l outline-none cursor-pointer hover:bg-neutral-600 bg-neutral-800" onclick="downloadData('presets')"><i class="hn hn-download-alt-solid"></i></button> <button class="flex justify-center p-1 bg-neutral-700 border border-neutral-600 rounded-r outline-none cursor-pointer hover:bg-neutral-600 bg-neutral-800" onclick="document.getElementById('presetsFileInputHandler').click()"><i class="hn hn-upload-alt-solid"></i> <input type="file" id="presetsFileInputHandler" class="hidden" accept=".json"></button> </div>`
    },
    {
        section: 'OUTROS',
        title: 'Cards por página',
        description: 'Selecione os cards por página:',
        icon: 'hn-media',
        id: 'CardsPerPage',
        action: '',
        extraLine: '',
        extraDiv: '<div class="flex flex-1 justify-center items-center font-silkscreen h-full"> <button class="flex justify-center px-1 bg-neutral-700 border border-neutral-600 rounded-l outline-none cursor-pointer hover:bg-neutral-600 active:bg-neutral-800 bg-neutral-800" data-cardsperpage="6" onclick="refreshMaxCardsPerPage(event)">06</button> <button class="flex justify-center px-1 bg-neutral-700 border border-neutral-600 outline-none cursor-pointer hover:bg-neutral-600 active:bg-neutral-800" data-cardsperpage="9" onclick="refreshMaxCardsPerPage(event)">09</button><button class="flex justify-center px-1 bg-neutral-700 border border-neutral-600 outline-none cursor-pointer hover:bg-neutral-600 active:bg-neutral-800" data-cardsperpage="12" onclick="refreshMaxCardsPerPage(event)">12</button> <button class="flex justify-center px-1 bg-neutral-700 border border-neutral-600 rounded-r outline-none cursor-pointer hover:bg-neutral-600 active:bg-neutral-800" data-cardsperpage="30" onclick="refreshMaxCardsPerPage(event)">30</button>   </div>'
    },
    {
        section: 'OUTROS',
        title: 'Patch Notes',
        description: 'Clique para ver as últimas atualizações',
        icon: 'hn-refresh-solid',
        id: 'PatchNotes',
        action: 'modalPatchNotes.showModal()',
        extraLine: '',
        extraDiv: ''
    }
];

const configsBlock = `<dialog class="modal outline-none" id="modalConfigs">
        <div class="modal-box relative flex flex-col h-[400px] bg-neutral-800 border border-neutral-700">
            <i class="hn hn-window-close-solid text-red-600 absolute top-2 right-2 transition duration-300 hover:text-red-800 cursor-pointer" onclick="modalConfigs.close()"></i>
            <div class="flex flex-col gap-2 mb-2">
                <h1 class="font-silkscreen text-lg">CONFIGURAÇÕES</h1>
                <span class="w-full h-[2px] bg-neutral-500 rounded-full"></span>
            </div>
            <div class="flex-1 flex flex-col overflow-y-scroll outline-none gap-2" id="configsSections">
                
            </div>
            <span class="w-full h-[2px] bg-neutral-500 rounded-full"></span>
        </div>
     </dialog>`

export function attConfigs() {
    document.body.insertAdjacentHTML('beforeend', configsBlock);
    const modalConfigs = document.getElementById('modalConfigs');
    const modalConfigsSections = modalConfigs.querySelector('#configsSections');

    configsSections.forEach(section => {
        let configsSection = `<div class="flex flex-col gap-1 p-2" data-section="${section}">
                    <h1 class="font-silkscreen text-lg">${section}</h1>
                </div>`;
        modalConfigsSections.innerHTML += configsSection;        
    })

    configs.forEach(config => {
        let configsButton = `<div class="flex flex-col border md:border-0 border-neutral-700 md:flex-row items-center justify-start rounded-md md:rounded-full transition duration-300 hover:bg-neutral-700 cursor-pointer p-2 md:pl-4 gap-2 md:gap-4" onclick="${config.action}" id="config${config.id}">
                        <i class="hn ${config.icon} text-white text-[24px]"></i>
                        <div class="flex flex-col items-center md:items-start md:min-w-[50%]">
                            <h1 class="font-silkscreen">${config.title}</h1>
                            <p class="font-pixelify-sans text-sm">${config.description}</p>
                            ${config.extraLine}
                        </div>
                        ${config.extraDiv}
                    </div>`;
        let section = modalConfigsSections.querySelector(`[data-section="${config.section}"]`);
        section.innerHTML += configsButton;
    })

    document.getElementById('dbFileInputHandler').addEventListener('change', (event) => {
        uploadDB(event);
    });
    document.getElementById('presetsFileInputHandler').addEventListener('change', (event) => {
        uploadPresets(event);
    });
};