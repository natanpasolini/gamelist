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
    if (img == '' || img == null) {
        img = 'https://imgs.search.brave.com/1qZ1xZHKx_mRy0qHVnLPv0oVuMyN_P5s52GP9bd1m10/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEy/ODgyNjg4NC92ZWN0/b3Ivbm8taW1hZ2Ut/dmVjdG9yLXN5bWJv/bC1taXNzaW5nLWF2/YWlsYWJsZS1pY29u/LW5vLWdhbGxlcnkt/Zm9yLXRoaXMtbW9t/ZW50LmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz0zOTBlNzZ6/Tl9USjdIWkhKcG5J/N2pObDdVQnBPM1VQ/N2hwUjJtZUUxUWQ0/PQ';
    }


    previewTitle.innerHTML = title;
    previewYear.innerHTML = year;
    previewAchievements.innerHTML = achievements;
    previewHours.innerHTML = hours;
    previewScore.innerHTML = score;
    previewImg.src = `${img}`;
}