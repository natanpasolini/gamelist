import { importCSV, useObserver } from './src/modules/gamecards.js';
import { injectModals } from './src/modules/modals.js';
import { writeToData } from './src/modules/cardsdata.js';

function filterCards(platform, year) {
    platform = platform.toLowerCase();
    if (platform == 'all' && year == 'all') {
        document.querySelectorAll('[id*="gamecard"]').forEach(card => {
        card.classList.remove('hide');
    });
    } else if (platform == 'all' && year != 'all') {
        document.querySelectorAll(`[id*="${year}"]`).forEach(card => {
            card.classList.remove('hide');
        });
    } else {
        document.querySelectorAll('[id*="gamecard"]').forEach(card => {
            card.classList.add('hide');
        });
    if (year != 'all'){
        document.querySelectorAll(`[id*="${platform}-${year}"]`).forEach(card => {
            card.classList.remove('hide');
        });
    } else {
        document.querySelectorAll(`[id*="${platform}"]`).forEach(card => {
            card.classList.remove('hide');
        });
    }
    }
    useObserver();
}

const handleFilterChange = () => {
    const p = document.getElementById('platform-filter').value;
    const y = document.getElementById('year-filter').value;
    filterCards(p, y);
};

document.getElementById('platform-filter').addEventListener('change', handleFilterChange);
document.getElementById('year-filter').addEventListener('change', handleFilterChange);

async function getLastCommit() {
    try {
        const url = 'https://api.github.com/repos/natanpasolini/gamelist/commits?per_page=1';
        const feed = await fetch(url);
        const data = await feed.json();
        
        if (data && data.length > 0) {
            const shrink = data[0].sha.substring(0, 7);
            document.getElementById('commit').textContent = `#${shrink}`;
        }
    } catch (error) {
        console.error('Erro ao buscar commit:', error);
    }
};

/* importCSV(); */
getLastCommit();
injectModals();

const handlePreviewChange = () => {
    const title = document.getElementById('inputGameTitle').value;
    const year = document.getElementById('inputGameYear').value;
    const ach = document.getElementById('inputGameAch').value;
    const maxach = document.getElementById('inputGameMaxAch').value;
    let achievements = '';
    if (maxach == '' || maxach == null || maxach == 0) {
        achievements = 'N/A';
    } else {
        achievements = ach + '/' + maxach;
    }
    const hours = document.getElementById('inputGameHours').value;
    const score = document.getElementById('inputGameScore').value;
    const img = document.getElementById('inputGameImg').value;
    previewCardChange(title,year,achievements,hours,score,img);
}

document.querySelectorAll('[id*="inputGame"]').forEach(input => {
    input.addEventListener('change', handlePreviewChange);
});

function previewCardChange(title,year,achievements,hours,score,img) {
    const previewTitle = document.getElementById('previewcardTitle');
    const previewAchievements = document.getElementById('previewcardAchievements');
    const previewYear = document.getElementById('previewcardYear');
    const previewHours = document.getElementById('previewcardHours');
    const previewScore = document.getElementById('previewcardScore');
    const previewImg = document.getElementById('previewcardImg');

    if (title == '' || title == null) {
        title = 'título';
    }
    if (year == '' || year == null) {
        year = 'ano';
    }
    if (hours == '' || hours == null) {
        hours = 'HORAS';
    } else {
        hours += 'h';
    }
    if (score == '' || score == null) {
        score = 'N/A';
    }

    previewTitle.innerHTML = title;
    previewYear.innerHTML = year;
    previewAchievements.innerHTML = achievements;
    previewHours.innerHTML = hours;
    previewScore.innerHTML = score;
    previewImg.src = `${img}`;
}

document.getElementById('cardCreator').addEventListener('submit', (event) => {
    event.preventDefault();
    let t = document.getElementById('inputGameTitle').value;
    let y = document.getElementById('inputGameYear').value;
    let a = document.getElementById('inputGameAch').value;
    let ma = document.getElementById('inputGameMaxAch').value;
    let h = document.getElementById('inputGameHours').value;
    let s = document.getElementById('inputGameScore').value;
    let i = document.getElementById('inputGameImg').value;
    writeToData(t,y,a,ma,h,s,i);
    event.target.reset();
});