import List from './lib/list';
import { buaTilForsidu } from './fyrirlestur';

let fyrirlesturNumer = 0;

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