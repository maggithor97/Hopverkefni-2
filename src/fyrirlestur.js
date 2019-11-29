// helper function for preparing elements
function el(name, ...children) {
  const element = document.createElement(name);
  for (const child of children) {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  }
  return element;
}

//  Hérna búum við til fyrirlestur
function buaTilFyrirlestur(lectures) {
  const main = document.getElementsByClassName('fyrirlestur')[0];
  const fLesturLengd = lectures.content.length;

  // Loop'um í gegnum allt contentið
  for (let j = 0; j < fLesturLengd; j++) {
    let element = el('div');
    let x = lectures.content[j].type; // eslint-disable-line
    if (x === 'youtube') {
      const myndband = el('iframe');
      myndband.src = lectures.content[j].data;
      myndband.frameborder = '0';
      myndband.allowfullscreen = '0';
      myndband.classList.add('fyrirlestur__div__myndband');
      element = el('div', myndband);
      element.classList.add('fyrirlestur__div__myndband__container');
    } else if (x === 'text') {
      element = el('p');
      const t = document.createTextNode(lectures.content[j].data);
      element.appendChild(t);
    } else if (x === 'quote') {
      const texti = el('p');
      texti.innerHTML = lectures.content[j].data;
      const hofundur = el('p');
      hofundur.innerHTML = lectures.content[j].attribute;
      element = el('div', texti, hofundur);
      element.classList.add('fyrirlestur__quote');
    } else if (x === 'image') {
      const mynd = el('img');
      mynd.src = lectures.content[j].data;
      mynd.classList.add('fyrirlestur__mynd__img');
      const txt = el('p');
      txt.innerHTML = lectures.content[j].caption;
      element = el('div', mynd, txt);
      element.classList.add('fyrirlestur__mynd');
    } else if (x === 'heading') {
      element = el('h2');
      element.innerHTML = lectures.content[j].data;
    } else if (x === 'list') {
      element = el('ul');
      const lengd = lectures.content[j].data.length;
      for (let k = 0; k < lengd; k++) {
        const ele = el('li');
        const t = document.createTextNode(lectures.content[j].data[k]);
        ele.appendChild(t);
        element.appendChild(ele);
      }
    } else if (x === 'code') {
      element = el('p');
      element.classList.add('fyrirlestur__div__code');
      const t = document.createTextNode(lectures.content[j].data);
      element.appendChild(t);
    }
    element.classList.add('fyrirlestur__div');
    main.appendChild(element);
  }
}

//  Setur mynd í header á fyrirlestrinum
function fyrirlesturHeader(lectures) {
  const hausMynd = 'url("' + lectures.image + '")';
  const header = document.getElementById('header');
  header.style.backgroundImage = hausMynd;
  //  Ef engin mynd þá grár bakgrunnur
  if (!lectures.image) {
    header.style.backgroundColor = '#999';
  }
  //  Setur réttan texta í haus
  let hausTextar = document.getElementsByClassName('header__h4');
  hausTextar[0].innerHTML = lectures.slug;
  hausTextar = document.getElementsByClassName('header__h1');
  hausTextar[0].innerHTML = lectures.title;
}

//  Breytir takkanum "Klára fyrirlestur"
function checked(klaraFyrirlestur) {
  klaraFyrirlestur.innerHTML = '✓ Fyrirlestur kláraður';
  klaraFyrirlestur.style.color = '#2d2';
  const fyrirlesturNumer = localStorage.getItem('lecNo');
  const buinn = JSON.parse(localStorage.getItem('lecDone'));
  buinn[fyrirlesturNumer] = buinn[fyrirlesturNumer] ? 0 : 1;
  localStorage.setItem('lecDone', JSON.stringify(buinn));
}

//  Býr til takkana "Klára fyrirlestur" og "Til baka" neðst á síðu
function buaTilTakkaNedst(i) {
  //  Búa til takkana
  const buinn = JSON.parse(localStorage.getItem('lecDone'));
  const main = document.getElementsByClassName('fyrirlestur')[0];
  const klaraFyrirlestur = el('p');
  const tilBaka = el('p');
  if (buinn[i]) {
    klaraFyrirlestur.innerHTML = '✓ Fyrirlestur kláraður';
    klaraFyrirlestur.style.color = '#2d2';
  } else {
    klaraFyrirlestur.innerHTML = 'Klára fyrirlestur';
  }
  klaraFyrirlestur.classList.add('takki', 'klara__fyrirlestur');
  klaraFyrirlestur.style.cursor = 'pointer';

  tilBaka.innerHTML = 'Til baka';
  tilBaka.classList.add('takki', 'til__baka');
  tilBaka.style.cursor = 'pointer';
  const takkar = el('div', klaraFyrirlestur, tilBaka);
  takkar.classList.add('takkar');
  main.appendChild(takkar);
  //  Setja eventListiner á þá
  klaraFyrirlestur.addEventListener('click', () => checked(klaraFyrirlestur));
  tilBaka.addEventListener(
    'click',
    () => {
      location.href = 'index.html';
    }, false,
  );
}

//  Kallar á nokkur föll til að gera síðu
function getdata(dataArray, fyrirlesturNumer) {
  fyrirlesturHeader(dataArray[fyrirlesturNumer]);
  buaTilFyrirlestur(dataArray[fyrirlesturNumer]);
  buaTilTakkaNedst(fyrirlesturNumer);
}

//  Fetchar upplýsingar frá lectures.json þegar síða load'ast
document.addEventListener('DOMContentLoaded', () => {
  let fyrirlesturNumer = localStorage.getItem('lecNo'); // eslint-disable-line

  fetch('lectures.json')
    .then((result) => {
      if (!result.ok) {
        throw new Error('Non 200 status');
      }
      return result.json();
    })
    .then((data) => getdata(data.lectures, fyrirlesturNumer))
    .catch((error) => console.error(error));
}); //  eslint-disable-line
