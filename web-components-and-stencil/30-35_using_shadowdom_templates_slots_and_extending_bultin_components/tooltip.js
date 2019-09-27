class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = 'This is a tool tip';
    this.attachShadow({mode: 'open'}); //Using the shadow DOM

    //Note that shadow dom access is different than real dom
    //Therefore no need to wait for connectedCallback to perform actions
    //in the shadow DOM

    //To use templates defined in the HTML:
    //const template = document.querySelector('#tooltip-template');
    //this.shadowRoot.appendChild(template.content.cloneNode(true));

    //To use templates defined in JS
    this.shadowRoot.innerHTML = `
      <style>
        div {
          background-color: black;
          color: white;
          position: absolute;
          z-index: 10;
        }
      </style>
      <slot>This is the default value</slot>
      <span>(?)</span>
    `;

  }

  connectedCallback() {
    this._tooltipText = this.getAttribute('text') || this._tooltipText;
    const icon = this.shadowRoot.querySelector('span');
    icon.addEventListener('mouseenter', this._showTooltip.bind(this));
    icon.addEventListener('mouseleave', this._hideTooltip.bind(this));

    //No need to append as a child as is defined in the innerHTML or in the HTML template
    //this.shadowRoot.appendChild(icon);

    this.style.position = 'relative';
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;

    //Styles are applied directly in the innerHTML property
    //this._tooltipContainer.style.backgroundColor = 'black';
    //this._tooltipContainer.style.color = 'white';
    //this._tooltipContainer.style.position = 'absolute';
    //this._tooltipContainer.style.zIndex = '10';
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }

}

customElements.define('silveste-tooltip',Tooltip);
