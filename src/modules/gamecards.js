import { useObserver } from "./observer.js";
import { mouseState } from "../../main.js";
import { data, refreshData } from "./handlerData.js";
import { cardEditor } from "./cardEditor.js";

export function buildCard(uid,title,year,achievements,maxachievements,hours,score,imglink,golden) {
    hours += 'h';
    let textColor = 'white';
    let bgColor = 'basic';
    let dropShadow = '';
    if (Number(achievements) < 0 || Number(maxachievements) <= 0) {
        achievements = 'N/A';
    } else {
        if (achievements == maxachievements) {
            golden = true;
        }
        achievements += '/' + maxachievements;
    }
    if (golden == true) {
        textColor = 'gold';
        bgColor = 'gold';
        dropShadow = 'animate-drop-shadow-glow-gold';
    }
    const templateHtml = `
    <div class="flex flex-row justify-center items-center w-full gap-4 ${dropShadow}" id="gamecard" data-uid="${uid}" onclick="cardFunctions(event)">
                <div class="hover-3d">
                    <figure>
                        <div class="card-hidden rounded-xl flex flex-col py-6 px-4 shadow-md w-[295px] md:w-[350px] xl:w-[400px] gamecard-bg-${bgColor} backdrop-blur-md border gamecard-border-${bgColor}">
                            <div class="relative">
                                <div class="px-[6px] py- m-0 bg-black border border-white rounded flex justify-center items-center absolute -rotate-30 select-none top-1 -left-3">
                                    <span class="text-${textColor} text-2xl leading-none font-silkscreen">
                                        ${year}
                                    </span>
                                </div>
                                <div class="w-full px-5 py-3">
                                    <div class="border-2 rounded">
                                        <div class="aspect-video flex justify-center">
                                            <img src="${imglink}" class="aspect-video border border-white rounded object-cover">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col justify-center items-center h-full">
                                <div class="bg-transparent pb-2 w-full flex justify-center items-center h-[60px]">
                                    <h1 class="text-${textColor} text-center text-xl font-silkscreen line-clamp-2 text-shadow-[2px_2px_4px_rgba(0,0,0,1)]" id="gameTitle">
                                        ${title}
                                    </h1>
                                </div>
                                <div class="grid grid-cols-2 w-full">
                                    <div class="flex flex-col items-start pt-1 border-2 border-black gap-1 bg-black">
                                        <div class="flex justify-start items-center pl-2 gap-2">
                                            <i class="hn hn-trophy-solid text-yellow-300 text-3xl"></i>
                                            <span class="text-${textColor} leading-none text-3xl font-micro-5 select-none">
                                                ${achievements}
                                            </span>
                                        </div>
                                        <div class="flex justify-start items-center pl-2 gap-2">
                                            <i class="hn hn-clock text-yellow-300 text-3xl"></i>
                                            <span class="text-white leading-none text-3xl font-micro-5 select-none">
                                                ${hours}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="flex justify-center h-20">
                                        <div class="p-2 flex justify-center items-center w-full border-2 border-black score-${score}">
                                            <span class="text-3xl font-pixelify-sans select-none text-shadow-lg/60">
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
