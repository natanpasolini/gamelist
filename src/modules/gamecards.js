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

export function buildCard(title,year,achievements,maxachievements,hours,score,imglink,golden) {
    hours += 'h';
    let textColor = 'white';
    let bgColor = 'basic';
    if (Number(achievements) < 0 || Number(maxachievements) <= 0) {
        achievements = 'N/A';
    } else {
        achievements += '/' + maxachievements;
    }
    if (golden == true) {
        textColor = 'gold';
        bgColor = 'gold';
    }
    const templateHtml = `
    <div class="flex flex-row justify-center items-center w-full gap-4">
                <div class="hover-3d">
                    <figure>
                        <div class="card-hidden rounded-xl flex flex-col py-6 px-4 shadow-md w-[295px] md:w-[350px] xl:w-[400px] gamecard-bg-${bgColor} backdrop-blur-md border gamecard-border-${bgColor}">
                            <div class="relative">
                                <div class="px-[6px] py- m-0 bg-black border border-white rounded flex justify-center items-center absolute -rotate-30 select-none top-1 -left-3">
                                    <span class="text-${textColor} text-2xl leading-none font-silkscreen" id="previewcardYear">
                                        ${year}
                                    </span>
                                </div>
                                <div class="w-full px-5 py-3">
                                    <div class="border-2 rounded">
                                        <div class="aspect-video flex justify-center">
                                            <img src="${imglink}" class="aspect-video border border-white rounded object-cover" id="previewcardImg">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col justify-center items-center h-full">
                                <div class="bg-transparent p-1 w-full flex justify-center items-center h-[60px]">
                                    <h1 class="text-${textColor} text-center text-xl font-silkscreen line-clamp-2" id="previewcardTitle">
                                        ${title}
                                    </h1>
                                </div>
                                <div class="grid grid-cols-2 w-full">
                                    <div class="flex flex-col items-start pt-1 border-2 border-black gap-1 bg-black">
                                        <div class="flex justify-start items-center pl-2 gap-2">
                                            <i class="hn hn-trophy-solid text-yellow-300 text-3xl"></i>
                                            <span class="text-${textColor} leading-none text-3xl font-micro-5 select-none" id="previewcardAchievements">
                                                ${achievements}
                                            </span>
                                        </div>
                                        <div class="flex justify-start items-center pl-2 gap-2">
                                            <i class="hn hn-clock text-yellow-300 text-3xl"></i>
                                            <span class="text-white leading-none text-3xl font-micro-5 select-none" id="previewcardHours">
                                                ${hours}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="flex justify-center h-20">
                                        <div class="p-2 flex justify-center items-center w-full border-2 border-black score-${score}">
                                            <span class="text-3xl font-pixelify-sans select-none" id="previewcardScore">
                                                ${score}
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
    document.querySelector('#gamelist').insertAdjacentHTML('afterbegin', templateHtml);
    useObserver();
};

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
};

