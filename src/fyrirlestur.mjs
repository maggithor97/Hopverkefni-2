
debugger;
import { p } from './index.mjs';
//debugger;

//const {p} = object

console.log("fyrirlestur.mjs\n value from index: "+p);
//  Hérna búum við til fyrirlestur
function buaTilFyrirlestur(i) {
  console.log(lectures[i]);
  console.log(lectures[i].content.length);
  document.location.href = 'fyrirlestur.html';

  //  testa
  let x = el('p');
  x.innerHTML = 'Hallo heimur';
  document.getElementById('lecture-page').appendChild(x);
  ////////////////////////////////////////////
  document.location.href = 'fyrirlestur.html';
  debugger;
  let section = el('section');
  section.classList.add('fyrirlestur');
  let fLesturLengd = lectures[i].content.length;

  // Loop'um í gegnum allt contentið
  for (let j = 0; j < fLesturLengd; j++) {
    let element = el('div');
    let x = lectures[i].content[j].type;
    if (x == 'youtube') {
      element = el('iframe');
      element.src = lectures[i].content[j].data;
      element.frameborder = '0';
      element.allowfullscreen = '0';
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
