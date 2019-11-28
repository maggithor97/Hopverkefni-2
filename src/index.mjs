//import { klaradirFyrirlestrar  as old} from './fyrirlestur.mjs';
//console.log(old);
// Global variables to be used by more than 1 function:
// 1. indicates active buttons, used by more than 1 function
let activebtns = [0, 0, 0];
// 2. Fetched array of data from Lectures.json
let lectures;
// 3. array of the buttons
let htmlbtn, cssbtn, jsbtn, hreflink;
let button = [
  (htmlbtn = document.getElementById('htmlbtn')),
  (cssbtn = document.getElementById('cssbtn')),
  (jsbtn = document.getElementById('jsbtn')),
  (hreflink = document.getElementById('foo'))
];
//console.log(button);

//  Index á fyrirlestri
let fyrirlesturNumer = 0;

document.addEventListener('DOMContentLoaded', () => {
 // load();
 // setfylki(); ////////////
});
function load() {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  event.preventDefault();

  if (isLecturePage) {
    //console.log('it is lecture page');
    buaTilFyrirlestur(5);
    return;
    // if (isLecturePage) {
    //  Fetchar og lætur búa til fyrirlesturs síðu
    fetch('lectures.json')
      .then(result => {
        if (!result.ok) {
          throw new Error('Non 200 status');
        }
        return result.json();
      })
      .then(data => buaTilFyrirlestur(data, fyrirlesturNumer))
      .catch(error => console.error(error));
  } else {

    addListenerBtn();

    //  Fetchar og lætur búa til index síðu
    fetch('lectures.json')
      .then(result => {
        if (!result.ok) {
          throw new Error('Non 200 status');
        }
        return result.json();
      })
      .then(data => getdata(data))
      .catch(error => console.error(error));
    addListenerBtn();
  }
}

function getdata(dataArray) {
  lectures = dataArray.lectures;
  localStorage.setItem('dataLectures', JSON.stringify(dataArray));
  ////console.log("1\n"+JSON.stringify(localStorage.getItem('dataLectures')));
  //console.log('2\n' + dataArray);
  // //console.log('3\n' + localStorage.getItem('dataLectures'));
  buaTilForsidu();
}

//  Hérna búum við til forsíðuna
function buaTilForsidu() {
  let card, image, img, box, h4, h1, flag;
  const container = document.querySelector('.container');
  container.innerHTML = ''; // Clearing the html from previous call
  for (let i = 0; i < lectures.length; flag = 0, i++) {
    //console.log(lectures[i]);
    //console.log(lectures[i].content.length);
    flag = isrelevant(i);

    if (!flag) continue;
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
    box.classList.add('index__card__bottom');

    card = el('div', image, box);
    card.classList.add('card');
    container.appendChild(card);
    card.addEventListener(
      'click',
      function() {
        //console.log('listener card\n\n' + i + '\n\n');
        localStorage.setItem('rrr', i);
        location.href = 'fyrirlestur.html';

        //        buaTilFyrirlestur(lectures, i);
      },
      false
    );
  }
}

// helper function for preparing elements
function el(name, ...children) {
  const element = document.createElement(name);
  for (const child of children) {
    //for (let i = 0; i < arguments.length; i++) {

    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  }
  return element;
}

// selecting if card should appear on the page
function isrelevant(i) {
  const category = ['html', 'css', 'javascript'];
  var totalActiveBtns = activebtns.reduce((a, b) => a + b);
  if (totalActiveBtns === 1 || totalActiveBtns === 2) {
    for (let j = 0; j < 3; j++)
      if (lectures[i].category === category[j])
        if (activebtns[j]) return 1;
        else return 0;
  } else return 1;
}

// add event listeners for the buttons
function addListenerBtn() {
  /////////////////////////////////////////////
  for (let i = 0; i < 4; i++)
    button[i].addEventListener(
      'click',
      function() {
        clickHandler(i);
      },
      false
    );
}
// set button active color on/off
function clickHandler(btntype) {
  activebtns[btntype] = activebtns[btntype] === 1 ? 0 : 1;
  for (let i = 0; i < 3; i++) {
    if (activebtns[i] === 1) {
      if (!button[i].classList.contains('btn__active'))
        button[i].classList.add('btn__active');
    } else {
      if (button[i].classList.contains('btn__active'))
        button[i].classList.toggle('btn__active');
    }
  }
  buaTilForsidu();
  if (btntype === 3) p = 8;
}

let rrr = 1;
window.onload = function() {
  var getInput = rrr;
  localStorage.setItem('rrr', getInput);
};

function setfylki() {
  let bar,
    fylki = [];
  bar = JSON.parse(localStorage.getItem('foo'));
  if (!window.localStorage.foo) {
    console.log("blablabla");
    for (let j = 0; j < 13; j++) {
      debugger;
      fylki[j] = 0;
  console.log(fylki);
  localStorage.setItem('foo', JSON.stringify(fylki));
    }
  }
  console.log(bar);
}
