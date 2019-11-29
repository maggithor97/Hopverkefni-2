/* eslint-disable linebreak-style */

// Global variables to be used by more than 1 function:
// 1. indicates active buttons, used by more than 1 function
// eslint-disable-next-line prefer-const
let activebtns = [0, 0, 0];
//  2. Fetched array of data from Lectures.json
let lectures;
//  3. array of the buttons

const button = [
  document.getElementById('htmlbtn'),
  document.getElementById('cssbtn'),
  document.getElementById('jsbtn')
];

//   Hérna búum við til forsíðuna
function buaTilForsidu() {
  let card;
  let image;
  let img;
  let box;
  let box2;
  let box3;
  let h4;
  let h1;
  let checked;
  let flag;
  const container = document.querySelector('.container');
  const fylki = JSON.parse(localStorage.getItem('lecDone'));
  container.innerHTML = ''; //  Clearing the html from previous call
  for (let i = 0; i < lectures.length; flag = 0, i++) {
    flag = isrelevant(i); //  Marks relevance of card

    if (flag) {
      img = el('img');
      if (lectures[i].thumbnail) {
        img.src = lectures[i].thumbnail;
        img.alt = 'Thumbnail';
      }
      image = el('div', img);
      image.classList.add('index__image');

      h4 = el('h4', lectures[i].category);
      h1 = el('h1', lectures[i].title);
      box = el('div', h4, h1);
      box.classList.add('text__left');

      checked = el('p', '✓');
      box2 = el('div', checked);
      flag = fylki[i] ? 'checked' : 'unchecked';
      box2.classList.add(flag);

      box3 = el('div', box, box2);

      card = el('div', image, box3);
      flag = fylki[i] ? 'card2' : 'card';
      card.classList.add(flag);
      container.appendChild(card);
      card.addEventListener(
        'click',
        () => {
          // console.log('listener card\n\n' + i + '\n\n');
          localStorage.setItem('lecNo', i);
          location.href = 'fyrirlestur.html';
        },
        false
      );
    }
  }
}

//  helper function for preparing elements
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

//  selecting if card should appear on the page
function isrelevant(i) {
  const category = ['html', 'css', 'javascript'];
  const totalActiveBtns = activebtns.reduce((a, b) => a + b);
  if (totalActiveBtns === 1 || totalActiveBtns === 2) {
    for (let j = 0; j < activebtns.length; j++) {
      if (lectures[i].category === category[j])
        if (activebtns[j]) return 1;
        else return 0;
    } ////////////////////
  }
  return 1;
}

//  add event listeners for the buttons
function addListenerBtn() {
  for (let i = 0; i < button.length; i++) {
    button[i].addEventListener(
      'click',
      () => {
        clickHandler(i);
      },
      false
    );
  }
}
//  set button active color on/off
function clickHandler(btntype) {
  activebtns[btntype] = activebtns[btntype] === 1 ? 0 : 1;
  for (let i = 0; i < activebtns.length; i++) {
    if (activebtns[i] === 1) {
      if (!button[i].classList.contains('btn__active')) {
        button[i].classList.add('btn__active');
      }
    } else if (button[i].classList.contains('btn__active'))
      button[i].classList.toggle('btn__active');
  }
  buaTilForsidu();
}

function setfylki(len) {
  const fylki = [];
  if (!window.localStorage.lecDone) {
    for (let j = 0; j < len; j++) {
      fylki[j] = 0;
      localStorage.setItem('lecDone', JSON.stringify(fylki));
    }
  }
}

function getdata(dataArray) {
  lectures = dataArray.lectures;
  const lecturesLen = dataArray.lectures.length;
  localStorage.setItem('dataLectures', JSON.stringify(dataArray));
  setfylki(lecturesLen);
  buaTilForsidu();
}

function load() {
  addListenerBtn();

  //   Fetchar og lætur búa til index síðu
  fetch('lectures.json')
    .then(result => {
      if (!result.ok) {
        throw new Error('Non 200 status');
      }
      return result.json();
    })
    .then(data => getdata(data))
    .catch(error => console.error(error));
}

document.addEventListener('DOMContentLoaded', () => {
  load();
});
