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
    element.innerText = text;

    const style = document.createElement('style');
    style.innerText = `
      :host {}
      :root {}
      .container {
        transition: padding 0.5s ease;
        font-size: 14px;
      }
      .container:focus {
        background: rgba(255,255,255,0.5);
        outline: 1px solid #bbb;
        padding-left: 5px;
        border-radius: 3px;
      }
    `;
    
    element.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        element.innerText = text;
        element.blur();
      }
    });

    shadow.appendChild(style);
    shadow.appendChild(element);
  }

  // attributeChangedCallback(name, oldValue, newValue) {
  //   // this.render();
  // }

  // static get observedAttributes() {
  //   // return ['id', 'text', 'color']; 
  // }

  get id() {
    return this.getAttribute('id') || ''
  }

  get text() {
    return this.getAttribute('text') || ''
  }
}

export default CardText;
