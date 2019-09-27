class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = 'This is a tool tip';
  }

  connectedCallback() {
    this._tooltipText = this.getAttribute('text') || this._tooltipText;
    const icon = document.createElement('span');
    icon.textContent = ' (?)';
    icon.addEventListener('mouseenter', this._showTooltip.bind(this));
    icon.addEventListener('mouseleave', this._hideTooltip.bind(this));
    this.appendChild(icon);
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    this.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.removeChild(this._tooltipContainer);
  }

}

customElements.define('silveste-tooltip',Tooltip);
