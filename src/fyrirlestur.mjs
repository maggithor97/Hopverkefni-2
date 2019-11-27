//  Hérna búum við til fyrirlestur

//////////////////////////////////////////////////
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
    //  .then(data => buaTilFyrirlestur(data.lectures, fyrirlesturNumer))
      .then(data => buaTilFyrirlestur(data.lectures, 5))
      .catch(error => console.error(error));
  } else {
    addListenerBtn();
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
      .then(data => getdata(data.lectures))
      .catch(error => console.error(error));
  }
});
//////////////////////////////////////////////////
function buaTilFyrirlestur(lectures, i) {
  console.log("i: "+i+"\n"+lectures)
  ////////////////////////////////////////////
  //hreinsaSidu();
  //////////////////////////////////////

  let main = document.getElementById('foo');
 // main.classList.add('fyrirlestur');
  main.innerHTML='';
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
    } else if (x == 'image') {
      let mynd = el('img');
      mynd.src = lectures[i].content[j].data;
      let txt = el('p');
      txt.innerHTML = lectures[i].content[j].caption;
      element = el('div', mynd, txt);
      element.classList.add('fyrirlestur__mynd');
    } else if (x == 'heading') {
      element = el('h2');
      element.innerHTML = lectures[i].content[j].data;
    } else if (x == 'list') {
      element = el('ul');
      let lengd = lectures[i].content[j].data.length;
      for (let k = 0; k < lengd; k++) {
        let ele = el('li');
        ele.innerHTML = lectures[i].content[j].data[k];
        element.appendChild(ele);
      }
    } else if (x == 'code') {
      //Virkar ekki nógu vel
      element = el('p');
      element.classList.add('fyrirlestur__div__code');
      element.innerHTML = lectures[i].content[j].data;
    }
    element.classList.add('fyrirlestur__div');
    main.appendChild(element);
  }
  console.log(document.getElementById('lecture-page'));
}

function hreinsaSidu() {
  var e = document.getElementById('adal');
  e.classList.add('clear');
}
function buaTilFyrirlestur1(i) {
  console.log("fyrirlestur "+i);
}
export { buaTilFyrirlestur };


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