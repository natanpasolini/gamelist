export async function carregarDados() {
    const url = "./csv/jogos.csv";
    const resposta = await fetch(url);
    const dadosBrutos = await resposta.text();
    
    processarCSV(dadosBrutos);
}

function processarCSV(texto) {
    const linhas = texto.split("\n").filter(linha => linha.trim() !== "");

    const listaJogos = linhas.slice(1).map(linha => {
        const valores = linha.replace(/\r/g, "").split(",");

        return {
            title: valores[0],
            platform: valores[1],
            achievements: valores[2] || "N/A",
            maxachievements: valores[3] || "N/A",
            hours: valores[4],
            score: valores[5] || "N/A",
            year: valores[6],
            steamid: valores[7]
        };
    });
    listaJogos.reverse();
    renderizarCards(listaJogos);
}

carregarDados();
function renderizarCards(jogos) {
    let idJogo = jogos.length + 1;
    jogos.forEach((jogo, index) => {
        jogo.platform = jogo.platform.toLowerCase();
        let platformicon = jogo.platform;
        let gamecardColor = 'purple';
        let gamecardTextColor = 'white';
        let achievements = `${jogo.achievements}/${jogo.maxachievements}`;
        idJogo -= 1;
        if (jogo.maxachievements == 'N/A') {
            achievements = 'N/A';
        }
        if (jogo.steamid != null) {
            jogo.img = `https://cdn.cloudflare.steamstatic.com/steam/apps/${jogo.steamid}/header.jpg`
        }
        if (jogo.platform == 'emulador' || jogo.platform == 'switch') {
            platformicon = 'gaming';
        }
        else if (jogo.platform !== 'steam') {
            platformicon = 'technology';
        }
        if (jogo.platform == 'gp') {
            jogo.platform = 'xbox';
        }
        if (jogo.achievements == jogo.maxachievements && jogo.maxachievements != 'N/A') {
            gamecardColor = 'gold';
            gamecardTextColor = 'gold';
        }
        const gamecardHtml =
        `<div class="card-hidden rounded-xl flex flex-col py-6 px-4 shadow-md max-w-[400px] gamecard-bg-${gamecardColor}">
                        <div class="flex justify-end w-full">
                            <span class="text-${gamecardTextColor} text-2xl leading-none font-silkscreen">
                                #${idJogo}
                            </span>
                        </div>
                        <div class="relative">
                            <div class="px-[6px] py- m-0 bg-black border border-white rounded flex justify-center items-center absolute -rotate-30 select-none top-1 -left-3">
                                <span class="text-${gamecardTextColor} text-2xl leading-none font-silkscreen">
                                    ${jogo.year}
                                </span>
                            </div>
                            <div class="w-full px-5 py-3">
                                <div class="border-2 rounded">
                                    <div class="aspect-video flex justify-center">
                                        <img src="${jogo.img}" class="aspect-video border border-white rounded object-cover">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center items-center h-full">
                            <div class="bg-black p-1 w-full flex justify-center items-center">
                                <h1 class="text-${gamecardTextColor} text-center text-base font-silkscreen">
                                    ${jogo.title}
                                </h1>
                            </div>
                            <div class="grid grid-cols-2 w-full">
                                <div class="flex flex-col items-start pt-1 border-2 gap-1 bg-black">
                                    <div class="flex justify-start items-center pl-2 gap-2">
                                        <i class="hn hn-trophy-solid text-yellow-300 text-3xl"></i>
                                        <span class="text-${gamecardTextColor} leading-none text-3xl font-micro-5 select-none" id="gamecard-achievements">
                                            ${achievements}
                                        </span>
                                    </div>
                                    <div class="flex justify-start items-center pl-2 gap-2">
                                        <i class="hn hn-clock text-yellow-300 text-3xl"></i>
                                        <span class="text-white leading-none text-3xl font-micro-5 select-none" id="gamecard-hours">
                                            ${jogo.hours}h
                                        </span>
                                    </div>
                                </div>
                                <div class="flex justify-center h-20">
                                    <div class="w-full p-2 flex justify-center items-center border-2 border-x-0 platform-${jogo.platform}">
                                        <i class="hn hn-${platformicon} text-3xl text-white"></i>
                                    </div>
                                    <div class="p-2 flex justify-center items-center w-full border-2 score-${jogo.score}">
                                        <span class="text-3xl font-pixelify-sans select-none">
                                            ${jogo.score}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        document.querySelector('#gamelist').innerHTML += gamecardHtml;
    });
    ativarObservador();
}

const observer = new IntersectionObserver((entries) => {
    const visibleEntries = entries.filter(entry => entry.isIntersecting);

    visibleEntries.forEach((entry, index) => {
        setTimeout(() => {
            entry.target.classList.add('card-visible');
            observer.unobserve(entry.target);
        }, index * 200);
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

function ativarObservador() {
    const cards = document.querySelectorAll('.card-hidden');
    cards.forEach(card => observer.observe(card));
}