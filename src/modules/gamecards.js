export async function importCSV() {
    const url = "src/csv/games.csv";
    const feedback = await fetch(url);
    const data = await feedback.text();
    
    processCSV(data);
}

function processCSV(text) {
    const lines = text.split("\n").filter(line => line.trim() !== "");

    const gameList = lines.slice(1).map(line => {
        const indexes = line.replace(/\r/g, "").split(",");

        return {
            title: indexes[0],
            platform: indexes[1],
            achievements: indexes[2] || "N/A",
            maxachievements: indexes[3] || "N/A",
            hours: indexes[4],
            score: indexes[5] || "N/A",
            year: indexes[6],
            steamid: indexes[7]
        };
    });
    gameList.reverse();
    renderCards(gameList);
}

importCSV();
function renderCards(games) {
    let gameId = games.length + 1;
    games.forEach((game, index) => {
        game.platform = game.platform.toLowerCase();
        let platformicon = game.platform;
        let gamecardColor = 'basic';
        let gamecardTextColor = 'white';
        let achievements = `${game.achievements}/${game.maxachievements}`;
        gameId -= 1;
        if (game.maxachievements == 'N/A') {
            achievements = 'N/A';
        }
        if (game.steamid != null) {
            game.img = `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.steamid}/header.jpg`
        }
        if (game.platform == 'emulador' || game.platform == 'switch') {
            platformicon = 'gaming';
        }
        else if (game.platform !== 'steam') {
            platformicon = 'technology';
        }
        if (game.achievements == game.maxachievements && game.maxachievements != 'N/A') {
            gamecardColor = 'gold';
            gamecardTextColor = 'gold';
        }
        const gamecardHtml =
        `
        <div class="hover-3d" id="gamecard-${game.platform}-${game.year}-${gameId}">
            <figure>
                <div class="card-hidden rounded-xl flex flex-col py-6 px-4 shadow-md max-w-[295px] md:max-w-[400px] gamecard-bg-${gamecardColor} backdrop-blur-md border gamecard-border-${gamecardColor}">
                                <div class="flex justify-end w-full">
                                    <span class="text-${gamecardTextColor} text-2xl leading-none font-silkscreen">
                                        #${gameId}
                                    </span>
                                </div>
                                <div class="relative">
                                    <div class="px-[6px] py- m-0 bg-black border border-white rounded flex justify-center items-center absolute -rotate-30 select-none top-1 -left-3">
                                        <span class="text-${gamecardTextColor} text-2xl leading-none font-silkscreen">
                                            ${game.year}
                                        </span>
                                    </div>
                                    <div class="w-full px-5 py-3">
                                        <div class="border-2 rounded">
                                            <div class="aspect-video flex justify-center">
                                                <img src="${game.img}" class="aspect-video border border-white rounded object-cover">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-col justify-center items-center h-full">
                                    <div class="bg-black p-1 w-full flex justify-center items-center h-[60px]">
                                        <h1 class="text-${gamecardTextColor} text-center text-xl font-silkscreen">
                                            ${game.title}
                                        </h1>
                                    </div>
                                    <div class="grid grid-cols-2 w-full">
                                        <div class="flex flex-col items-start pt-1 border-2 border-black gap-1 bg-black">
                                            <div class="flex justify-start items-center pl-2 gap-2">
                                                <i class="hn hn-trophy-solid text-yellow-300 text-3xl"></i>
                                                <span class="text-${gamecardTextColor} leading-none text-3xl font-micro-5 select-none">
                                                    ${achievements}
                                                </span>
                                            </div>
                                            <div class="flex justify-start items-center pl-2 gap-2">
                                                <i class="hn hn-clock text-yellow-300 text-3xl"></i>
                                                <span class="text-white leading-none text-3xl font-micro-5 select-none">
                                                    ${game.hours}h
                                                </span>
                                            </div>
                                        </div>
                                        <div class="flex justify-center h-20">
                                            <div class="w-full p-2 flex justify-center items-center border-2 border-black border-x-0 platform-${game.platform}">
                                                <i class="hn hn-${platformicon} text-3xl text-white"></i>
                                            </div>
                                            <div class="p-2 flex justify-center items-center w-full border-2 border-black score-${game.score}">
                                                <span class="text-3xl font-pixelify-sans select-none">
                                                    ${game.score}
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
                    </div>`;
        document.querySelector('#gamelist').innerHTML += gamecardHtml;
    });
    useObserver();
}

const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting);
    
    visible.forEach((entry, index) => {
        setTimeout(() => {
                entry.target.classList.add('card-visible');
                observer.unobserve(entry.target); 
            }, index * 100); 
        });
}, { threshold: 0.1, rootMargin: '100px' });

export function useObserver() {
    const cards = document.querySelectorAll('.card-hidden');
    cards.forEach(card => observer.observe(card));
}