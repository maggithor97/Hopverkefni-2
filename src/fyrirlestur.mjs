function myInitCode() {}

document.addEventListener('DOMContentLoaded', load());

function load() {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  let fyrirlesturNumer;
  // event.preventDefault();
  fyrirlesturNumer = localStorage.getItem('lecNo');
  //console.log('Load Func\n\n' + fyrirlesturNumer);

  fetch('lectures.json')
    .then(result => {
      if (!result.ok) {
        throw new Error('Non 200 status');
      }
      return result.json();
    })
    .then(data => getdata(data.lectures, fyrirlesturNumer))
    .catch(error => console.error(error));
}

function getdata(dataArray, fyrirlesturNumer) {
  console.log(dataArray);
  console.log(fyrirlesturNumer);
  fyrirlesturHeader(dataArray[fyrirlesturNumer]);
  buaTilFyrirlestur(dataArray[fyrirlesturNumer]);
  buaTilTakkaNedst(fyrirlesturNumer);
}

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
function buaTilFyrirlestur(lectures, i) {
  let main = document.getElementsByClassName('fyrirlestur')[0];
  let fLesturLengd = lectures.content.length;

  // Loop'um í gegnum allt contentið
  for (let j = 0; j < fLesturLengd; j++) {
    let element = el('div');
    let x = lectures.content[j].type;
    if (x == 'youtube') {
      let myndband = el('iframe');
      myndband.src = lectures.content[j].data;
      myndband.frameborder = '0';
      myndband.allowfullscreen = '0';
      myndband.classList.add('fyrirlestur__div__myndband');
      element = el('div', myndband);
      element.classList.add('fyrirlestur__div__myndband__container');
    } else if (x == 'text') {
      element = el('p');
      var t = document.createTextNode(lectures.content[j].data);
      element.appendChild(t);
    } else if (x == 'quote') {
      let texti = el('p');
      texti.innerHTML = lectures.content[j].data;
      let hofundur = el('p');
      hofundur.innerHTML = lectures.content[j].attribute;
      element = el('div', texti, hofundur);
      element.classList.add('fyrirlestur__quote');
    } else if (x == 'image') {
      let mynd = el('img');
      mynd.src = lectures.content[j].data;
      mynd.classList.add('fyrirlestur__mynd__img');
      let txt = el('p');
      txt.innerHTML = lectures.content[j].caption;
      element = el('div', mynd, txt);
      element.classList.add('fyrirlestur__mynd');
    } else if (x == 'heading') {
      element = el('h2');
      element.innerHTML = lectures.content[j].data;
    } else if (x == 'list') {
      element = el('ul');
      let lengd = lectures.content[j].data.length;
      for (let k = 0; k < lengd; k++) {
        let ele = el('li');
        var t = document.createTextNode(lectures.content[j].data[k]);
        ele.appendChild(t);
        element.appendChild(ele);
      }
    } else if (x == 'code') {
      element = el('p');
      element.classList.add('fyrirlestur__div__code');
      var t = document.createTextNode(lectures.content[j].data);
      element.appendChild(t);
    }
    element.classList.add('fyrirlestur__div');
    main.appendChild(element);
  }
  //  Takkar neðst á síðunni
}

//  Setur mynd í header á fyrirlestrinum
function fyrirlesturHeader(lectures) {
  let hausMynd = 'url("' + lectures.image + '")';
  //console.log(lectures.image);
  let header = document.getElementById('header');
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

function buaTilTakkaNedst(i) {
  //  Búa til takkana
  let buinn = JSON.parse(localStorage.getItem('lecDone'));
  let main = document.getElementsByClassName('fyrirlestur')[0];
  let klaraFyrirlestur = el('p');
  let tilBaka = el('p');
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
  let takkar = el('div', klaraFyrirlestur, tilBaka);
  takkar.classList.add('takkar');
  main.appendChild(takkar);
  //  Setja eventListiner á þá
  klaraFyrirlestur.addEventListener('click', () => checked(klaraFyrirlestur));
  tilBaka.addEventListener(
    'click',
    function() {
      //console.log('listener tilbaka\n\n');
      location.href = 'index.html';
    },
    false
  );
}

function checked(klaraFyrirlestur) {
    klaraFyrirlestur.innerHTML = '✓ Fyrirlestur kláraður';
    klaraFyrirlestur.style.color = '#2d2';
    let fyrirlesturNumer = localStorage.getItem('lecNo');
    let buinn = JSON.parse(localStorage.getItem('lecDone'));
    console.log(buinn);
    buinn[fyrirlesturNumer] = buinn[fyrirlesturNumer] ? 0 : 1;
    console.log(buinn);
    localStorage.setItem('lecDone', JSON.stringify(buinn));
  }
