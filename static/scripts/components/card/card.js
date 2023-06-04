class Card extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(){
    const shadow = this.shadowRoot;

    const { id, text, color } = this;
    
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <style>
        :host {
          position: relative;
          background: linear-gradient(135deg, rgba(255,255,255,1) 0%, ${color} 100%);
          border-radius: 10px;
          width: 200px;
          height: 110px;
          padding: 10px;
        }
        .card {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .settings {
          position: absolute;
          right: 10px;
          top: 10px;
          cursor: pointer;
          width: 20px;
          height: 20px;
          background: url("/images/settings.svg") no-repeat 50%;
          background-size: 100%;
        }
      </style>

      <slot name="text"></slot>

      <div class="settings">
        <!-- <slot name="settings" /> -->
      </div>
    `;

    shadow.appendChild(card);
    // const textElement = shadow.querySelector('.text');
    // const settingsElement = shadow.querySelector('.settings');
  }

  disconnectedCallback(){

  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue,newValue);
    // вызывается при изменении одного из перечисленных выше атрибутов
    // this.render();
  }

  static get observedAttributes() {
    // return ['id', 'text', 'color']; 
  }

  get id() {
    return this.getAttribute('id') || ''
  }

  get color() {
    return this.getAttribute('color') || '#fff'
  }
}

customElements.define('wc-card', Card);
export default Card
