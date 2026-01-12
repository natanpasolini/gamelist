const patchNotes = [
    {
        version: '<b>BETA</b> 2.0.1',
        vs: 'b201',
        changes: [
            { type: 'UPDATE', text: 'Você pode colocar uma casa decimal nas horas de jogo ex: 10,1h'},
            { type: 'BUGFIX', text: 'Conquistas alcançadas não podem mais ser nulas.'},
            { type: 'BUGFIX', text: 'Editor não permite conquistas alcançadas maiores que o máximo.'},
            { type: 'BUGFIX', text: 'Imagem do placeholder desaparecendo.'},
            { type: 'BUGFIX', text: 'Upload gerando cartões duplicados.'}
        ]
    },
    {
        version: '<b>BETA</b> 2.0.0',
        vs: 'b200',
        changes: [
            { type: 'FEATURE', text: '<b>Editor:</b> seus cards agora podem ser editados.'},
            { type: 'UPDATE', text: 'Preview de cards agora atualiza conforme você digita'}
        ]
    },
    {
        version: '<b>BETA</b> 1.2.0',
        vs: 'b120',
        changes: [
            { type: 'FEATURE', text: '<b>Save Local:</b> seus cards agora são salvos automaticamente no seu navegador.'},
            { type: 'UPDATE', text: 'Toolbar modificada para um visual minimalista (mobile será alterado no futuro).'}
        ]
    },
    {
        version: '<b>BETA</b> 1.1.0',
        vs: 'b110',
        changes: [
            { type: 'FEATURE', text: '<b>Lixeira:</b> removedor de cards.'},
            { type: 'BUGFIX', text: 'Erro ao tentar criar um card novo após importar db.'}
        ]
    },
    {
        version: '<b>BETA</b> 1.0.0',
        vs: 'b100',
        changes: [
            { type: 'FEATURE', text: '<b>Criador de Cards:</b> versão inicial do criador de cards.'},
            { type: 'FEATURE', text: '<b>Download/Upload:</b> sistema para salvamento e carregamento dos cards criados, usando um arquivo json.'},
            { type: 'FEATURE', text: '<b>Patch Notes:</b> melhoria do botão github para um botão de patch notes.'},
            { type: 'UPDATE', text: '<b>Filtros:</b> desativado para melhorias.'},
            { type: 'BUGFIX', text: 'Diversos bugfixes.'}
        ]
    }
]

export function attPatches() {
    const patchNotesBlocks =  document.getElementById('patchNotesBlocks');
    patchNotes.forEach(patch => {
        const version = patch.version;
        const vs = patch.vs;
        const templateBlock = `<div class="bg-stone-900 border-l-2 gamecard-border-basic rounded p-2">
                    <div class="flex flex-col">
                        <h1 class="font-silkscreen">${version}</h1>
                        <span class="w-full h-[2px] rounded-full bg-stone-800"></span>
                    </div>
                    <div class="flex flex-col gap-4" id="changes-${vs}">
                    </div>
                </div>`;
        patchNotesBlocks.innerHTML += templateBlock;
        const changesBlock = document.getElementById(`changes-${vs}`)
        patch.changes.forEach(change => {
            const templateChanges = `<div class="flex flex-row items-center gap-2">
                            <div class="flex justify-center items-center border gamecard-border-basic gamecard-bg-basic shrink-0 font-silkscreen text-[12px] px-1">
                                ${change.type}
                            </div>
                            <p class="font-pixelify-sans text-sm flex-1">
                                ${change.text}
                            </p>
                        </div>`;
            changesBlock.innerHTML += templateChanges;
        })
    })
}