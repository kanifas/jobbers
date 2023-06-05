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

    const style = document.createElement('style');
    style.innerHTML = `
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
      }
    `;

    card.innerHTML = `
      <slot name="text"></slot>

      <div class="settings">
        <slot name="settings" />
      </div>
    `;

    shadow.appendChild(style);
    shadow.appendChild(card);
  }

  disconnectedCallback(){}

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log(name, oldValue,newValue);
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

export default Card
