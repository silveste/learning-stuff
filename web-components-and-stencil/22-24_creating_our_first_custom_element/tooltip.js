//See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
class Tooltip extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const icon = document.createElement('span');
    icon.textContent = ' (?)';
    this.appendChild(icon);
  }
}

//see https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements
customElements.define('silveste-tooltip',Tooltip);
