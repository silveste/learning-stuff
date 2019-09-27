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
        /*
          How to style elements inside <slot>
          Only can target parent elements and CSS nested rules to target children don't apply
          Note that styles applied in live DOM have more specifity than shadow
        */
        ::slotted(.highlight) {
          border-bottom: 3px solid red;
        }
        /*
          How to target the parent element of the custom component (silveste-tooltip)
          Note that styles applied in live DOM have more specifity than in shadow dom
        */
        :host {
          border: 3px solid #ffaaaa;
          padding: 10px;
        }

        /*To apply styles conditionally to the host:*/

        /*We can target the host based on classes or IDs*/
        :host(.important) {
          border: 3px solid red;
        }
        /*We also can set a condition based on the surrounding elements */
        :host-context(.wrapper) {
          background-color: pink;
          color: navy;
        }

        /*
        CSS styles have access to variables defined in the live DOM
        Note that a fallback value has also been passed
        */
        span {
          color: var(--color-primary, #999);
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
