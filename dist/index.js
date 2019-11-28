//import List from './lib/list';
//importScripts(fyrirlestur);
//indicates active buttons
let activebtns = [0, 0, 0]; // array of the buttons

const button = [htmlbtn = document.getElementById('htmlbtn'), cssbtn = document.getElementById('cssbtn'), jsbtn = document.getElementById('jsbtn')]; //  Index á fyrirlestri

let fyrirlesturNumer = 0;
document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  event.preventDefault();

  if (isLecturePage) {
    //  Fetchar og lætur búa til fyrirlesturs síðu
    fetch('lectures.json').then(result => {
      if (!result.ok) {
        throw new Error('Non 200 status');
      }

      return result.json();
    }).then(data => buaTilFyrirlestur(data.lectures, fyrirlesturNumer)).catch(error => console.error(error));
  } else {
    //const list = new List();
    //list.load();
    //  Fetchar og lætur búa til index síðu
    fetch('lectures.json').then(result => {
      if (!result.ok) {
        throw new Error('Non 200 status');
      }

      return result.json();
    }).then(data => buaTilForsidu(data.lectures)).catch(error => console.log(error));
  }
}); //  Hérna búum við til forsíðuna

function buaTilForsidu(data) {} //console.log(data.lectures[0]);

/*
// add event listeners for the buttons
for (let i = 0; i < 3; i++)
  button[i].addEventListener(
    'click',
    function() {
      clickHandler(i);
    },
    false
  );
console.log(button);
*/
// set button active color on/off


function clickHandler(btntype) {
  activebtns[btntype] = activebtns[btntype] === 1 ? 0 : 1;
  var totalActiveBtns = activebtns.reduce((a, b) => a + b);
  console.log('active buttons: ' + totalActiveBtns);

  for (let i = 0; i < 3; i++) {
    if (activebtns[i] === 1) {
      if (!button[i].classList.contains('btn__active')) button[i].classList.add('btn__active');
    } else {
      if (button[i].classList.contains('btn__active')) button[i].classList.toggle('btn__active');
    }
  }
} //  Hjálparfall


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
/*********************************************
 * ****** Maggi ******************************
 * ******************************************/
//  Hérna búum við til fyrirlestur


function buaTilFyrirlestur(lectures, i) {
  console.log(lectures[i]);
  console.log(lectures[i].content.length);
  document.location.href = 'fyrirlestur.html'; //  testa

  let x = el('p');
  x.innerHTML = 'Hallo heimur';
  document.getElementById('lecture-page').appendChild(x); ////////////////////////////////////////////

  document.location.href = 'fyrirlestur.html';
  debugger;
  let section = el('section');
  section.classList.add('fyrirlestur');
  let fLesturLengd = lectures[i].content.length; // Loop'um í gegnum allt contentið  

  for (let j = 0; j < fLesturLengd; j++) {
    let element = el('div');
    let x = lectures[i].content[j].type;

    if (x == 'youtube') {
      element = el('iframe');
      element.src = lectures[i].content[j].data;
      element.frameborder = "0";
      element.allowfullscreen = "0";
    } else if (x == 'text') {
      element = el('p');
      element.innerHTML = lectures[i].content[j].data;
    } else if (x == 'quote') {
      let texti = el('p');
      texti.innerHTML = lectures[i].content[j].data;
      let hofundur = el('p');
      hofundur.innerHTML = lectures[i].content[j].attribute;
      element = el('div', texti, hofundur);
      element.classList.add('fyrirlestur__quote');
    }

    document.getElementById('lecture-page').appendChild(element);
  }

  debugger;
  console.log(document.getElementById('lecture-page'));
}

function hreinsaSidu() {
  {
    var e = document.querySelector('.body'); //e.firstElementChild can be used. 

    var child = e.lastElementChild;

    while (child) {
      e.removeChild(child);
      child = e.lastElementChild;
    }
  }
}