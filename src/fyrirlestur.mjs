
console.log('foo');
//  var result = [lectures];
//console.log(datafyrirlestur);
//Check load
if (document.readyState !== 'loading') {
  console.log('document is already ready, just execute code here');

  load();
  console.log('fyrirlestur load listener');
  myInitCode();
} else {
  document.addEventListener('DOMContentLoaded', function() {
    console.log('document was not ready, place code here');
    myInitCode();
  });
}

function myInitCode() {}

document.addEventListener('DOMContentLoaded', () => {
  console.log('document is already ready, just execute code here');

  load();
  console.log('DOM listener');
  /*
  let arrIndex = localStorage.getItem('dataLectures');
  console.log(arrIndex);
  buaTilFyrirlestur(arrIndex);
  console.log('fyrirlestur load listener');
*/
});
//console.log("fyrirlestur.mjs\n value from index: "+p);

function buaTilFyrirlestur(lectures) {
  console.log(lectures);
  console.log(lectures.content.length);
  //document.location.href = 'fyrirlestur.html';

  //  testa
  let x = el('p');
  x.innerHTML = 'Hallo heimur';
  document.getElementById('lecture-page').appendChild(x);
  ////////////////////////////////////////////
 // document.location.href = 'fyrirlestur.html';

  let section = el('section');
  section.classList.add('fyrirlestur');
  let fLesturLengd = lectures.content.length;

  // Loop'um í gegnum allt contentið
  for (let j = 0; j < fLesturLengd; j++) {
    let element = el('div');
    let x = lectures.content[j].type;
    if (x == 'youtube') {
      element = el('iframe');
      element.src = lectures.content[j].data;
      element.frameborder = '0';
      element.allowfullscreen = '0';
    } else if (x == 'text') {
      element = el('p');
      element.innerHTML = lectures.content[j].data;
    } else if (x == 'quote') {
      let texti = el('p');
      texti.innerHTML = lectures.content[j].data;
      let hofundur = el('p');
      hofundur.innerHTML = lectures.content[j].attribute;
      element = el('div', texti, hofundur);
      element.classList.add('fyrirlestur__quote');
    }
    document.getElementById('lecture-page').appendChild(element);
  }

  console.log(document.getElementById('lecture-page'));
}

function hreinsaSidu() {
  {
    var e = document.querySelector('.body');

    //e.firstElementChild can be used.
    var child = e.lastElementChild;
    while (child) {
      e.removeChild(child);
      child = e.lastElementChild;
    }
  }
}

function load() {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  // event.preventDefault();
  let fyrirlesturNumer = localStorage.getItem('rrr');
  console.log('Load Func\n\n' + fyrirlesturNumer);

  if (isLecturePage) {
    //  Fetchar og lætur búa til fyrirlesturs síðu
    fetch('lectures.json')
      .then(result => {
        if (!result.ok) {
          throw new Error('Non 200 status');
        }
        return result.json();
      })
      .then(data => getdata(data.lectures, fyrirlesturNumer))
      .catch(error => console.error(error));
  } else {
    // const list = new List();
    // list.load();

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

let lectures;
function getdata(dataArray, fyrirlesturNumer) {

  lectures = dataArray;
  for (let j = 0; j<13;j++)
  console.log(dataArray[j]);
  prof(dataArray);

  buaTilFyrirlestur(dataArray[fyrirlesturNumer] );
}
function prof(lectures) {
  console.log(lectures[5]);
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


//===============================================================
/*import {
  activebtns,
  // lectures,
  button,
  buaTilFyrirlestur,
  finished,
  el
} from './lib/helpers.mjs';

console.log('fyrirlestur\n' + finished);

const clear = document.getElementById('klara');
console.log('\n\n\n\n' + clear + '\n\n\n');
clear.addEventListener(
  'click',
  function() {
    clear.classList.toggle("klara__fyrirlestur");

  },
  false
);
*/

