export const handlePreviewChange = () => {
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