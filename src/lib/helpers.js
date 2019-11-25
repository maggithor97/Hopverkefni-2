export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

//  Hægt er að nota þetta fall til að búa til element
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