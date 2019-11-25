/*import List from './lib/list';
 */

 //indicates active buttons
let activebtns = [0, 0, 0];

// array of the buttons
const button = [
  (htmlbtn = document.getElementById('htmlbtn')),
  (cssbtn = document.getElementById('cssbtn')),
  (jsbtn = document.getElementById('jsbtn'))
];

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  event.preventDefault();

  if (isLecturePage) {  
    //  Fetchar og lætur búa til fyrirlesturs síðu
    fetch('lectures.json')
    .then((result) => {
      if (!result.ok) {
        throw new Error('Non 200 status');
      }
      return result.json();
    })
    .then(data => buaTilFyrirlestur(data, fyrirlesturNumer))
    .catch(error => console.error(error));

  } else {
    
    const list = new List();
    list.load();

    //  Fetchar og lætur búa til index síðu
    fetch('lectures.json')
  .then((result) => {
    if (!result.ok) {
      throw new Error('Non 200 status');
    }
    return result.json();
  })
  .then(data => buaTilForsidu(data))
  .catch(error => console.error(error));
  }
});

//  Hérna búum við til forsíðuna
/*
function buaTilForsidu(data) {
  console.log(data.lectures[0]);

}

*/
//  Hérna búum við til fyrirlestur
function buaTilFyrirlestur(data, i) {
  console.log(data.lectures[i]);
}




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

// set button active color on/off
function clickHandler(btntype) {
  activebtns[btntype] = activebtns[btntype] === 1 ? 0 : 1;
  var totalActiveBtns = activebtns.reduce((a, b) => a + b);
  console.log('active buttons: ' + totalActiveBtns);
  for (let i = 0; i < 3; i++) {
    if (activebtns[i] === 1) {
      if (!button[i].classList.contains('btn__active'))
        button[i].classList.add('btn__active');
    } else {
      if (button[i].classList.contains('btn__active'))
        button[i].classList.toggle('btn__active');
    }
  }

}
  