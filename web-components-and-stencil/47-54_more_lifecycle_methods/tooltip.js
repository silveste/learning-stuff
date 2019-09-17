class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipVisible;
    this._tooltipIcon;
    this._tooltipText = 'This is a tool tip';
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: relative;
        }
        div {
          background-color: black;
          font-weight: lighter;
          color: white;
          position: absolute;
          top: 1.25em;
          left: 0.25rem;
          z-index: 10;
          padding: 0.25rem;
          border-radius: 3px;
          box-shadow: 1px 1px 7px rgba(0,0,0,0.50);
        }
        span {
          color: var(--color-primary, #999);
          font-size: 0.50em;
          vertical-align: super;
        }
      </style>
      <slot>This is the default value</slot>
      <span>(?)</span>
    `;

  }

  connectedCallback() {
    this._tooltipText = this.getAttribute('text') || this._tooltipText;
    this._tooltipIcon = this.shadowRoot.querySelector('span');
    this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
  }

  /*
  To allow updating any observable attribute value at runtime we need to use attributeChangedCallback
  This callback is called by the browser when any observable attribute has been changed
  For that is required to define the observable attributes inside our component
  */
  attributeChangedCallback(name, oldValue, newValue){
    if (oldValue === newValue) {
      return;
    }
    switch(name) {
      case 'text':
        this._tooltipText = newValue;
        break;
      default:
        return;
    }
  }
  //Define the observable attributes
  static get observedAttributes() {
    return ['text'];
  }

  disconnectedCallback() {
    this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
    this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
    console.log('All cleaned');
  }

  _render() {
    let tooltipContainer = this.shadowRoot.querySelector('#tooltip-container');
    if (this._tooltipVisible){
      tooltipContainer = document.createElement('div');
      tooltipContainer.setAttribute("id","tooltip-container");
      tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(tooltipContainer);
    } else {
      if (tooltipContainer) {
        this.shadowRoot.removeChild(tooltipContainer);
      }
    }

  }

  _showTooltip() {
    this._tooltipVisible = true;
    this._render();
  }

  _hideTooltip() {
    this._tooltipVisible = false;
    this._render();
  }

}

customElements.define('silveste-tooltip',Tooltip);
