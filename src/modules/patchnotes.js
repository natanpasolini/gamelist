const patchNotes = [
    {
        version: '<b>RELEASE</b> 1.0.0',
        vs: '100',
        changes: [
            { type: 'FEATURE', text: '<b>MOBILE:</b> Menu hamburguer para configs/guia.'},
            { type: 'FEATURE', text: '<b>PRESETS:</b> É possivel fazer download, upload e deletar seus presets'},
            { type: 'UPDATE', text: '<b>CONFIGS:</b> Alterado opções na seção dados; Patch Notes agora é a ultima opção em outros.'},
            { type: 'UPDATE', text: '<b>HEADER:</b> Adicionado contador de jogos.'}
        ]
    },
    {
        version: '<b>BETA</b> 4.3.0',
        vs: 'b430',
        changes: [
            { type: 'FEATURE', text: '<b>CARDS POR PÁGINAS:</b> É possivel escolher a quantidade de cards por página no menu de configurações'},
            { type: 'FEATURE', text: '<b>PRESETS:</b> É possivel salvar/carregar presets de cores no criador e editor de cards! (salvos localmente).'},
            { type: 'BUGFIX', text: 'Agora os cards aparecem na ordem que foram adicionados.'}
        ]
    },
    {
        version: '<b>BETA</b> 4.2.0',
        vs: 'b420',
        changes: [
            { type: 'UPDATE', text: '<b>OTIMIZAÇÃO:</b> Os cards agoram aparecem em até no máximo 6 por página (e os não visiveis são excluidos do html).'},
            { type: 'UPDATE', text: '<b>GUIA:</b> Guia simplificado e adicionado gif de demonstração.'}
        ]
    },
    {
        version: '<b>BETA</b> 4.1.0',
        vs: 'b410',
        changes: [
            { type: 'UPDATE', text: '<b>STEAM IMAGES:</b> Você pode escolher uma imagem da steam através do botão steam.'}
        ]
    },
    {
        version: '<b>BETA</b> 4.0.2',
        vs: 'b402',
        changes: [
            { type: 'BUGFIX', text: '<b>UPLOAD:</b> Corrigido botão de upload.'},
            { type: 'BUGFIX', text: '<b>REMOVER:</b> Alterado remoção de cards de title para uid (estava deletando cards com titulos iguais).'}
        ]
    },
    {
        version: '<b>BETA</b> 4.0.1',
        vs: 'b401',
        changes: [
            { type: 'UPDATE', text: '<b>PATCH NOTES:</b> Movido para configurações.'},
            { type: 'UPDATE', text: '<b>RODAPÉ:</b> Adicionado botão de linkedin e github.'},
            { type: 'BUGFIX', text: '<b>CRIADOR:</b> Corrigido comparação de conquistas maximas com alcançadas.'}
        ]
    },
    {
        version: '<b>BETA</b> 4.0.0',
        vs: 'b400',
        changes: [
            { type: 'FEATURE', text: '<b>SELETOR DE CORES:</b> Novo seletor de cores para os gamecards.'},
            { type: 'FEATURE', text: '<b>CONFIGS:</b> Botão de configurações adicionado a toolbar (download e upload agora ficam aqui).'},
            { type: 'FEATURE', text: '<b>FILTROS:</b> Adicionado filtro de ano e nota.'}
        ]
    },
    {
        version: '<b>BETA</b> 3.0.1',
        vs: 'b301',
        changes: [
            { type: 'BUGFIX', text: '<b>CRIADOR:</b> Cursor não alterando ao entrar no modo criador.'},
            { type: 'BUGFIX', text: '<b>GAMECARDS:</b> Bordas brancas nas notas S e SS.'}
        ]
    },
    {
        version: '<b>BETA</b> 3.0.0',
        vs: 'b300',
        changes: [
            { type: 'FEATURE', text: '<b>VERSO:</b> Agora os cartões tem um verso, onde fica seu id unico, a data de criação e uma descrição personalizada! Basta clicar num cartão para virar.'},
            { type: 'UPDATE', text: '<b>GAMECARDS:</b> Novo design frontal dos gamecards.'}
        ]
    },
    {
        version: '<b>BETA</b> 2.4.0',
        vs: 'b240',
        changes: [
            { type: 'FEATURE', text: '<b>IMAGEM DO CARD:</b> Agora você pode personalizar o estilo da imagem no container e sua posição (quando aplicável no estilo).'},
            { type: 'UPDATE', text: '<b>CRIADOR:</b> Agora é fechado ao criar um novo gamecard.'},
            { type: 'UPDATE', text: '<b>GAMECARDS:</b> Removido fundo e adicionado stroke ao ano.'}
        ]
    },
    {
        version: '<b>BETA</b> 2.3.0',
        vs: 'b230',
        changes: [
            { type: 'FEATURE', text: '<b>FUNDO PERSONALIZADO:</b> Agora você pode personalizar a cor de fundo dos seus gamecards! (compativel com gamecards criados anteriormente).'},
            { type: 'UPDATE', text: '<b>GUIA:</b> Só aparece forçadamente uma única vez na sua tela.'}
        ]
    },
    {
        version: '<b>BETA</b> 2.2.1',
        vs: 'b221',
        changes: [
            { type: 'UPDATE', text: '<b>TOOLBAR:</b> Novas cores do modo selecionado (apagar/editar).'},
            { type: 'BUGFIX', text: '<b>EDITOR:</b> Cursor de lápis posicionado incorretamente.'}
        ]
    },
    {
        version: '<b>BETA</b> 2.2.0',
        vs: 'b220',
        changes: [
            { type: 'UPDATE', text: '<b>Notas:</b> Novas cores de notas, nota F removida.'},
            { type: 'UPDATE', text: '<b>Gamecards:</b> Nova cor dourada e brilho de fundo.'}
        ]
    },
    {
        version: '<b>BETA</b> 2.0.1',
        vs: 'b201',
        changes: [
            { type: 'UPDATE', text: '<b>EDITOR:</b> Você pode colocar uma casa decimal nas horas de jogo ex: 10,1h.'},
            { type: 'BUGFIX', text: '<b>CRIADOR:</b> Conquistas alcançadas não podem mais ser nulas. Imagem do placeholder não desaparece mais.'},
            { type: 'BUGFIX', text: '<b>EDITOR:</b> não permite conquistas alcançadas maiores que o máximo.'},
            { type: 'BUGFIX', text: '<b>UPLOAD:</B> gerando cartões duplicados.'}
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
            const templateChanges = `<div class="flex flex-row items-start gap-2">
                            <div class="flex justify-center items-center border gamecard-border-basic gamecard-bg-basic shrink-0 font-silkscreen text-[12px] px-1">
                                ${change.type}
                            </div>
                            <p class="font-silkscreen text-sm flex-1">
                                ${change.text}
                            </p>
                        </div>`;
            changesBlock.innerHTML += templateChanges;
        })
    })
}