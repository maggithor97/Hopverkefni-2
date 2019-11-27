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

let hh = el('p');
hh.innerHTML = 'TEST: Hallo heimur'; //document.getElementById('lecture-page').appendChild(hh);

function buaTilFyrirlestur(lectures, i) {
  console.log(lectures[i]);
  debugger; //console.log(lectures[i].content.length);

  let hh = el('p');
  hh.innerHTML = 'TEST: Hallo heimur';
  document.getElementById('lecture-page').appendChild(hh);
  document.location.href = 'fyrirlestur.html';
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