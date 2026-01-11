import { buildCard } from "./gamecards.js";

const header = ['title','year','achievements','maxachievements','hours','score','imglink']
const data = [
];

export function writeToData(t,y,a,ma,h,s,i) {
    data.push([t,y,a,ma,h,s,i]);
    console.log(data);
    sendCardData(data);
};

let cardsID = -1;
let cardsCreated = 0;

function sendCardData(data) {
    const id = cardsID + 1;
    const title = data[id][0];
    const year = data[id][1];
    const achievements = data[id][2];
    const maxachievements = data[id][3];
    const hours = data[id][4];
    const score = data[id][5];
    const imglink = data[id][6];
    let golden = false;
    if (Number(achievements) >= 0 && Number(achievements) > 0 && achievements == maxachievements) {
        golden = true;
    }

    cardsCreated += 1;
    cardsID += 1;
    if (cardsCreated == 1) {
        document.getElementById('newGameCard').classList.add('hidden');
    };
    buildCard(title,year,achievements,maxachievements,hours,score,imglink,golden);
};