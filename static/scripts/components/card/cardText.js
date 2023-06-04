import $api from '../../api/api.js';

class CardText extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(){
    const shadow = this.shadowRoot;

    const { id, text } = this;

    const element = document.createElement('div');
    element.classList.add('container');
    element.setAttribute('contenteditable', true);
    element.innerHTML = `
      <style>
        :host {
        }
        .container {
          transition: padding 0.5s ease;
        }
        .container:focus {
          background: rgba(255,255,255,0.5);
          outline: 1px solid #bbb;
          padding-left: 5px;
          border-radius: 3px;
        }
      </style>
      ${text}
    `;
    
    let debounceTimer;
    const handleInput = (e) => {
      clearTimeout(debounceTimer);
      const text = e.target.innerText;
      debounceTimer = setTimeout(() => {
        $api.updateItem(id, { text })
      }, 1000);
    };

    element.addEventListener('input', handleInput, false);

    shadow.appendChild(element);
  }

  disconnectedCallback(){
    // noop
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // this.render();
  }

  static get observedAttributes() {
    // return ['id', 'text', 'color']; 
  }

  get id() {
    return this.getAttribute('id') || ''
  }

  get text() {
    return this.getAttribute('text') || ''
  }
}

customElements.define('wc-card-text', CardText);
export default CardText;
