import $api from './api/api.js';
import { observer } from './store/store.js';
import './components/ui/button/button.js';
import './components/card/card.js';
import './components/card/cardText.js';


async function main() {
  const handleStateChange = ({ cards }) => {
    const container = document.querySelector('#root');

    cards.forEach((item, index) => {
      const { id, text, color, order } = item;
      const element = document.createElement('wc-card');

      element.classList.add('item');
      element.setAttribute('id', id);
      element.setAttribute('color', color);

      element.innerHTML = `
        <wc-card-text
          id="${id}"
          text="${text}"
          slot="text"
        ></wc-card-text>

        <div slot="settings">+</div>
      `;

      element.addEventListener('click', (e)=>{
        console.log(order)
        if (e.offsetX < 70) {
          console.log('<<<')
        } else {
          console.log('>>>')
        }
      });

      container.appendChild(element);
    });
  }

  observer.subscribe(handleStateChange);

  // setTimeout(()=>{
  //   $api.createItem({
  //     text: 'Какой-то текст 1',
  //     color: randomColor(),
  //   });
  // }, 1000);

  // setTimeout(()=>{
  //   $api.createItem({
  //     text: 'Какой-то текст 2',
  //     color: randomColor(),
  //   });
  // }, 2500);

  // setTimeout(()=>{
  //   $api.createItem({
  //     text: 'Какой-то текст 3',
  //     color: randomColor(),
  //   });
  // }, 4000);
}

main();
