import { importCSV, useObserver } from './src/modules/gamecards.js';
import { injectModals } from './src/modules/modals.js';

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

importCSV();
getLastCommit();
injectModals();