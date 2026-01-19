export const handlePreviewChange = () => {
    let title = document.getElementById('inputGameTitle').value;
    if (title == '' || title == null) title = 'TíTULO';

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
    if (hours == '' || hours == null) hours = 'HORAS';

    const score = document.getElementById('inputGameScore').value;
    let img = document.getElementById('inputGameImg').value;
    if (img == '' || img == null) img = './src/assets/placeholder.webp';

    let inputColor = document.getElementById('inputGameColor');

    const rgb = hexToRGB(inputColor.value);

    previewCardChange(title,year,achievements,hours,score,img,rgb);
}

export function formValueFix() {
    let title = document.getElementById('inputGameTitle').value;
    let year = document.getElementById('inputGameYear').value;
    let ach = document.getElementById('inputGameAch').value;
    let maxach = document.getElementById('inputGameMaxAch').value;
    let hours = document.getElementById('inputGameHours').value;
    let score = document.getElementById('inputGameScore').value;
    let img = document.getElementById('inputGameImg').value;
    let imgStyle = document.getElementById('inputGameImgStyle').value;

    let inputImgPos = document.getElementById('inputGameImgPos');
    let inputColor = document.getElementById('inputGameColor');

    const rgb = hexToRGB(inputColor.value);

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

    if (img == '' || img == null) img = './src/assets/placeholder.webp';
    if (imgStyle == 'object-cover' || imgStyle == 'object-contain') inputImgPos.parentElement.classList.remove('hidden'); else inputImgPos.parentElement.classList.add('hidden');

    if (!document.getElementById('modalCardEditor')) {
        previewCardChange(title,year,achievements,hours,score,img,rgb);
    }
}

function previewCardChange(title,year,achievements,hours,score,img,rgb) {
    const previewTitle = document.getElementById('previewcardTitle');
    const previewAchievements = document.getElementById('previewcardAchievements');
    const previewYear = document.getElementById('previewcardYear');
    const previewHours = document.getElementById('previewcardHours');
    const previewScore = document.getElementById('previewcardScore');
    const previewScoreBG = document.getElementById('previewcardScoreBG')
    const previewImg = document.getElementById('previewcardImg');
    const previewBG = document.getElementById('previewcardCard');
    const previewBGMobile = document.getElementById('previewcardCardMobile');
    const r = rgb.r;
    const b = rgb.b;
    const g = rgb.g;
    const previewStatsBG = document.getElementById('previewcardStats');
    const previewVerso = document.getElementById('versoCreator');

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
    const imgClasses = ['object-contain','object-fit','object-fill','object-cover','object-left','object-center','object-right'];
    imgClasses.forEach(object => {
        previewImg.classList.remove(object);
    });
    const previewImgStyle = document.getElementById('inputGameImgStyle').value;
    const previewImgPos = document.getElementById('inputGameImgPos').value;
    previewImg.classList.add(previewImgStyle,previewImgPos)

    let bgcolor = `radial-gradient(circle,rgba(${r}, ${g}, ${b}, 0.7) 0%, rgba(${Math.round(r * 0.4)}, ${Math.round(g * 0.4)}, ${Math.round(b * 0.4)}, 0.7) 100%)`;
    let bordercolor = `rgb(${r},${g},${b})`;

    previewBG.style.background = bgcolor;
    previewBG.style.borderColor = bordercolor;
    previewBGMobile.style.background = bgcolor;
    previewBGMobile.style.borderColor = bordercolor;
    previewStatsBG.style.background = bgcolor;
    previewStatsBG.style.borderColor = bordercolor;
    previewVerso.style.background = bgcolor;
    previewVerso.style.borderColor = bordercolor;
}

export function hexToRGB(hex) {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Handle shorthand 3-digit hex (e.g., #f00 → #ff0000)
  if (hex.length === 3) {
    hex = hex.split('').map(digit => digit + digit).join('');
  }

  // Extract R, G, B components and convert from hex to decimal
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return { r, g, b };
}

export function rgbToHex(r, g, b) {
  const componentToHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}