class Button extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const text = this.text;
    const width = this.width;
    const height = this.height;
    const isBlock = this.block;

    shadow.innerHTML = `
      <style>
        .button {
          display: ${isBlock ? 'block' : 'inline-block'};
          font-size: 20px;
          padding: 20px;
          color: blue;
          cursor: pointer;
          border: 1px solid;
          border-radius: 5px;
        }
      </style>
      <div class="button">
        ${text}
      </div>
    `;

    // shadow.appendChild(button);
  }

  // connectedCallback(){
  //   this.attachShadow()
  // }

  get text() {
    return this.getAttribute('text') || ''
  }
  get isBlock() {
    return this.hasAttribute('block')
  }  
  get height() {
    return this.getAttribute('height') || 'auto'
  }  
  get width() {
    return this.getAttribute('width') || 'auto'
  }
  get size() {
    return this.getAttribute('size')
  }

}

customElements.define('wc-button', Button);
export default Button
