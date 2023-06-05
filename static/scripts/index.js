import $api from './api/api.js';
import { observer } from './store/store.js';
import './components/register.components.js';

async function main() {
  const settingOptions = JSON.stringify([
    {label: 'Переименовать', value: 'rename'},
    {label: 'Сдвинуть назад', value: 'back'},
    {label: 'Сдвинуть вперед', value: 'forward'},
    {label: 'Удалить', value: 'delete'},
  ]);

  const buildCardAndPaste = ({ id, text, color, byUI }) => {
    const element = document.createElement('wc-card');
    element.classList.add('item');
    if (byUI) {
      element.classList.add('new');
    }
    element.setAttribute('id', id);
    element.setAttribute('color', color);

    element.innerHTML = `
      <wc-card-text
        slot="text"
        id="${id}"
        text="${text}"
      ></wc-card-text>

      <wc-card-setting
        slot="settings"
        id="${id}"
        serializedOptions='${settingOptions}'
        changeEventName="select-setting"
      ></wc-card-setting>
    `;

    const textElement = element.querySelector('[slot="text"]');
    textElement.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        event.target.blur();
        const text = textElement.shadowRoot.querySelector('.container').innerText;
        $api.updateItem(id, {text})
      }
    });
    
    const settingElement = element.querySelector('[slot="settings"]');
    settingElement.shadowRoot.addEventListener('select-setting', async e => {
      const { id, value } = e.detail;
      switch(value) {
        case 'rename': {
          const textElemenContainer = textElement.shadowRoot.querySelector('.container');
          textElemenContainer.focus();
          const range = document.createRange();
          range.selectNodeContents(textElemenContainer);
          range.collapse(false);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          break
        }

        case 'back': {
          $api.moveItemBack(id);
          break
        }

        case 'forward': {
          $api.moveItemForward(id);
          break
        }

        case 'delete': {
          const shure = window.confirm('Подтвердите удаление');
          if (!shure) return;

          try {
            await $api.deleteItem(id);
            const targetItem = document.getElementById(id);
            targetItem.classList.add('delete');
            setTimeout(() => targetItem.remove(), 300);
          } catch(err) {
            alert(`Не удалось удалить\n${err}`)
          }
          break
        }
      }
    });

    const container = document.querySelector('#root');
    const items = container.querySelectorAll('.item');
    if (items.length === 0) {
      container.prepend(element);
    } else {
      items[items.length - 1].after(element);
    }
  };

  const render = (cards) => {
    const container = document.querySelector('#root');
    container.innerHTML = '';

    cards.forEach(buildCardAndPaste);

    const style = document.createElement('style');
    style.innerText = `
      @keyframes new-item-animation {
        from {
          opacity: 0;
          transform: scale(0);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      :root {
        counter-reset: num 0;
      }
      .item {
        overflow: hidden;
        transition: all .3s ease-in-out;
      }
      .item.delete {
        opacity: 0;
        transform: scale(0);
      }
      .item.new {
        animation: new-item-animation 0.3s 1;
      }
      .item:before {
        counter-increment: num;
        content: counter(num);
        position: absolute;
        left: 10px;
        top: 10px;
        font-size: 16px;
        color: red;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
      }
      .add-button {
        width: 200px;
        height: 110px;
        border: 1px solid #bcbccd;
        cursor: pointer;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .add-button svg {
        margin-right: 15px;
      }
      .add-button:hover {
        border-color: #62a0ca;
        color: #62a0ca;
      }
      .add-button:hover svg {
        fill: #62a0ca;
      }
    `
    container.appendChild(style);
    
    // Кнопка добавления
    const addButton = document.createElement('div');
    addButton.innerHTML = `
      <svg fill="#000000" height="30px" width="30px" viewBox="0 0 455 455" xml:space="preserve">
        <polygon points="455,212.5 242.5,212.5 242.5,0 212.5,0 212.5,212.5 0,212.5 0,242.5 212.5,242.5 212.5,455 242.5,455 242.5,242.5 
        455,242.5 "/>
      </svg>
      Добавить
    `;
    addButton.classList.add('add-button')
    container.appendChild(addButton);
    addButton.addEventListener('click', async () => {
      try {
        const newItem = await $api.createItem({
          text: 'Новый объект',
          color: randomColor(),
        });
        buildCardAndPaste({
          ...newItem,
          byUI: true,
        });
      } catch(err) {
        alert(`Не удалось добавить\n${err}`)
      }
    });
  }

  observer.subscribe(render);
  // $api.fetchItems();
}

main();
