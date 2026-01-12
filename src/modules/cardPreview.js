export const handlePreviewChange = () => {
    const title = document.getElementById('inputGameTitle').value;
    let ach = document.getElementById('inputGameAch').value;
    let year = document.getElementById('inputGameYear').value;
    if (year == '' || year == null) {
        year = 'ANO'
    }
    const maxach = document.getElementById('inputGameMaxAch').value;
    let achievements = '';
    if (!(maxach == '' || maxach == null || maxach == 0)) {
        achievements = ach + '/' + maxach;
    } else {
        achievements = 'CONQUISTAS';
    }
    let hours = document.getElementById('inputGameHours').value;
    if (hours == '' || hours == null) {
        hours = 'HORAS'
    }
    const score = document.getElementById('inputGameScore').value;
    const img = '/src/imgs/placeholder.webp';
    previewCardChange(title,year,achievements,hours,score,img);
}

export function formValueFix() {
    let title = document.getElementById('inputGameTitle').value;
    let year = document.getElementById('inputGameYear').value;
    let ach = document.getElementById('inputGameAch').value;
    let maxach = document.getElementById('inputGameMaxAch').value;
    let hours = document.getElementById('inputGameHours').value;
    let score = document.getElementById('inputGameScore').value;
    let img = document.getElementById('inputGameImg').value;

    let achievements = '';
    if (!(maxach == '' || maxach == null || maxach == 0)) {
        achievements = ach + '/' + maxach;
    } else {
        achievements = 'CONQUISTAS';
    }

    if (title == '' || title == null) {
        title = 'título';
    }

    if (year == '' || year == null) {
        year = 'ano'
    } else if (Number(year) < 1900) {
        year = 1900;
        document.getElementById('inputGameYear').value = year;
    } else if (Number(year) > 2099) {
        year = 2099;
        document.getElementById('inputGameYear').value = year;
    }

    if (hours == '' || hours == null) {
        hours = 'HORAS'
    } else if (Number(hours) > 100000) {
        hours = 100000;
        document.getElementById('inputGameHours').value = hours;
    }

    if (score == '' || score == null) {
        score = 'N/A';
    }

    if (img == '' || img == null) {
        img = '/src/imgs/placeholder.webp';
    }
    if (!document.getElementById('modalCardEditor')) {
        previewCardChange(title,year,achievements,hours,score,img);
    }
}

function previewCardChange(title,year,achievements,hours,score,img) {
    const previewTitle = document.getElementById('previewcardTitle');
    const previewAchievements = document.getElementById('previewcardAchievements');
    const previewYear = document.getElementById('previewcardYear');
    const previewHours = document.getElementById('previewcardHours');
    const previewScore = document.getElementById('previewcardScore');
    const previewScoreBG = document.getElementById('previewcardScoreBG')
    const previewImg = document.getElementById('previewcardImg');

    previewTitle.innerHTML = title;
    previewYear.innerHTML = year;
    previewAchievements.innerHTML = achievements;
    if (hours != 'HORAS') {
        previewHours.innerHTML = hours + 'h';
    } else {
        previewHours.innerHTML = hours;
    }
    previewScore.innerHTML = score;
    const scoreClasses = ['score-N/A','score-F','score-D','score-C','score-B','score-A','score-S','score-SS','score-SSS'];
    scoreClasses.forEach(score => {
        previewScoreBG.classList.remove(score);
    });
    previewScoreBG.classList.add(`score-${score}`)
    previewImg.src = `${img}`;
}