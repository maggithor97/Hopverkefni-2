//import { buaTilFyrirlestur } from "./fyrirlestur";

/*import List from './lib/list';
 */
// Global variables to be used by more than 1 function:
// 1. indicates active buttons, used by more than 1 function
let activebtns = [0, 0, 0];
// 2. Fetched array of data from Lectures.json
let lectures;

// 3. array of the buttons
let htmlbtn, cssbtn, jsbtn;
const button = [
  (htmlbtn = document.getElementById('htmlbtn')),
  (cssbtn = document.getElementById('cssbtn')),
  (jsbtn = document.getElementById('jsbtn'))
];
//  4. kláraðir fyrirlestrar fylki
let klaradirFyrirlestrar = [];

//  Index á fyrirlestri
let fyrirlesturNumer = 0;

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  event.preventDefault();

  if (isLecturePage) {
    //  Fetchar og lætur búa til fyrirlesturs síðu
    fetch('lectures.json')
      .then(result => {
        if (!result.ok) {
          throw new Error('Non 200 status');
        }
        return result.json();
      })
      .then(data => buaTilFyrirlestur(data.lectures, fyrirlesturNumer))
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
      .then(data => getdata(data.lectures))
      .catch(error => console.error(error));
  }
});

function getdata(dataArray) {
  lectures = dataArray;
  buaTilForsidu();
}

//  Hérna búum við til forsíðuna
function buaTilForsidu() {
  let card, image, img, box, h4, h1, flag;
  const container = document.querySelector('.container');
  container.innerHTML = ''; // Clearing the html from previous call
  for (let i = 0; i < lectures.length; flag = 0, i++) {
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
    card.addEventListener('click', ()=>{
      buaTilFyrirlestur(lectures,i);
    })
    for(let x = 0; x < klaradirFyrirlestrar.length; x++){
      if(klaradirFyrirlestrar[x]=i){
        box.innerHTML = 'Kláradur';
      }
    }
  }

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
  for (let i = 0; i < 3; i++)
    button[i].addEventListener(
      'click',
      function () {
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
}


/*********************************************
 * ****** Maggi ******************************
 * ******************************************/

//  Hérna búum við til fyrirlestur
function buaTilFyrirlestur(lectures, i) {
  //  Hreinsum núverandi síðu
  hreinsaSidu();
  //  Setjum rétta mynd og texta í header
  fyrirlesturHeader(lectures, i);
 
  
  let main = document.getElementsByClassName('fyrirlestur')[0];
  main.classList.add('fyrirlestur');
  let fLesturLengd = lectures[i].content.length;

  // Loop'um í gegnum allt contentið
  for (let j = 0; j < fLesturLengd; j++) {
    let element = el('div');
    let x = lectures[i].content[j].type;
    if (x == 'youtube') {
      let myndband = el('iframe');
      myndband.src = lectures[i].content[j].data;
      myndband.frameborder = "0";
      myndband.allowfullscreen = "0";
      myndband.classList.add('fyrirlestur__div__myndband');
      element = el('div', myndband);
      element.classList.add('fyrirlestur__div__myndband__container')
    } else
      if (x == 'text') {
        element = el('p');
        var t = document.createTextNode(lectures[i].content[j].data);
        element.appendChild(t);
      } else
        if (x == 'quote') {
          let texti = el('p');
          texti.innerHTML = lectures[i].content[j].data;
          let hofundur = el('p');
          hofundur.innerHTML = lectures[i].content[j].attribute;
          element = el('div', texti, hofundur);
          element.classList.add('fyrirlestur__quote');
        } else
          if (x == 'image') {
            let mynd = el('img');
            mynd.src = lectures[i].content[j].data;
            mynd.classList.add('fyrirlestur__mynd__img');
            let txt = el('p');
            txt.innerHTML = lectures[i].content[j].caption;
            element = el('div', mynd, txt);
            element.classList.add('fyrirlestur__mynd');
          } else
            if (x == 'heading') {
              element = el('h2');
              element.innerHTML = lectures[i].content[j].data;
            } else
              if (x == 'list') {
                element = el('ul');
                let lengd = lectures[i].content[j].data.length;
                for (let k = 0; k < lengd; k++) {
                  let ele = el('li');
                  var t = document.createTextNode(lectures[i].content[j].data[k]);
                  ele.appendChild(t);
                  element.appendChild(ele);
                }
              } else
                if (x == 'code') {
                  element = el('p');
                  element.classList.add('fyrirlestur__div__code');
                  var t = document.createTextNode(lectures[i].content[j].data);
                  element.appendChild(t);
                }
    element.classList.add('fyrirlestur__div');
    main.appendChild(element);

  }
  //  Takkar neðst á síðunni
  buaTilTakkaNedst(i);
}

//  Hreinsar síðuna
function hreinsaSidu() {
  var e = document.getElementById('adal');
  e.classList.add('clear');
}

//  Setur mynd í header á fyrirlestrinum
function fyrirlesturHeader(lectures, i) {
  let hausMynd = 'url("' + lectures[i].image + '")';
  console.log(lectures[i].image);
  let header = document.getElementById('header');
  header.style.backgroundImage = hausMynd;
  //  Ef engin mynd þá grár bakgrunnur
  if (!lectures[i].image) {
    header.style.backgroundColor = '#999';
  }
  //  Setur réttan texta í haus
  let hausTextar = document.getElementsByClassName('header__h');
  hausTextar[0].innerHTML = lectures[i].slug;
  hausTextar[1].innerHTML = lectures[i].title;
}

function buaTilTakkaNedst(i) {
  //  Búa til takkana
  let main = document.getElementsByClassName('fyrirlestur')[0];
  let klaraFyrirlestur = el('p');
  let tilBaka = el('p');
  klaraFyrirlestur.innerHTML = 'Klára fyrirlestur';
  tilBaka.innerHTML = 'Til baka';
  klaraFyrirlestur.classList.add('takki', 'klara__fyrirlestur');
  tilBaka.classList.add('takki', 'til__baka');
  let takkar = el('div', klaraFyrirlestur, tilBaka);
  takkar.classList.add('takkar');
  main.appendChild(takkar);
  //  Setja eventListiner á þá
  klaraFyrirlestur.addEventListener(
    'click',() => {
      klaraFyrirlestur.innerHTML = "<img src='img\html-boxes.svg'></img>" +' Fyrirlestur kláraður!';
      klaraFyrirlestur.style.color = '#2d2';
      klaradirFyrirlestrar[klaradirFyrirlestrar.length] = i;
      //  *Merkja fyrirlesturinn sem kláraðann
    }
  );
  tilBaka.addEventListener(
    'click', () =>{
      var e = document.getElementById('adal');
      e.classList.remove('clear');
      var b = document.getElementById('fyrirlestur');
      b.innerHTML = '';
    }
  )
}