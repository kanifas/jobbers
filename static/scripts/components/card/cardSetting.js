class CardSetting extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(){
    const shadow = this.shadowRoot;

    const { id } = this;

    const container = document.createElement('div');
    container.classList.add('container');

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options');

    const options = JSON.parse(this.options);

    options.forEach(({ label, value }) => {
      const option = document.createElement('div');
      option.classList.add('option');
      option.innerText = label;
      option.setAttribute('data-value', value);

      option.addEventListener('click', e => {
        container.classList.remove('opened');

        const value = e.target.getAttribute('data-value');
        
        const customEvent = new CustomEvent(
          this.changeEventName || 'change',
          {
            bubbles: true,
            detail: { id, value }
          }
        );

        // Останавливаем распространение, чтобы удаленный класс opened снова выставился,
        // дойдя до контейнера (он слушает клик и ставит opened)
        e.stopPropagation();

        // Диспатичм во внешнюю среду кастомный ивент о выборе пункта меню
        e.target.dispatchEvent(customEvent);
      });

      optionsContainer.appendChild(option);
    });

    // Слушает клик (шестеренка), чтобы открыть выпадющее меню
    container.addEventListener('click', (event) => {
      container.classList.add('opened');
    });
    
    // Закрыть меню, когда не выбрали пункт и щелкнули во внешней среде
    // (чтобы меню не зависло в окрытом режиме)
    document.addEventListener('click', (event) => {
      container.classList.remove('opened');
    }, true);
 
    const style = document.createElement('style');
    style.innerHTML = `
      .container {
        cursor: pointer;
        width: 20px;
        height: 20px;
        background: url("/images/settings.svg") no-repeat 50%;
        background-size: 100%;
        position: relative;
      }
      .options {
        position: absolute;
        right: 0;
        top: 0;
        background: #fff;
        padding: 5px 0;
        font-size: 14px;
        line-height: 1;
        box-shadow: 2px 2px 10px 0 rgba(0,0,0,0.2);
        border-radius: 5px;
        display: none;
      }
      .container.opened .options {
        display: block;
      }
      .option {
        padding: 3px 10px;
        white-space: nowrap;
      }
      .option:hover {
        background: #eee;
      }
    `;

    container.appendChild(style);
    container.appendChild(optionsContainer);
    shadow.appendChild(container);
  }

  get id() {
    return this.getAttribute('id') || ''
  }

  get changeEventName() {
    return this.getAttribute('changeEventName') || ''
  }

  get options() {
    return this.getAttribute('serializedOptions') || []
  }
}

export default CardSetting;
