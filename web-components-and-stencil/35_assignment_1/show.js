class Show extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <button>Show</button>
      <p><slot></slot></p>
    `;
  }
  connectedCallback () {
    const button = this.shadowRoot.querySelector('button');
    const infoEl = this.shadowRoot.querySelector('p');

    let isHidden = this.getAttribute('content-hidden') !== 'false'; //By setting !=='false' instead ==='true' we allow the user to include content-hidden with no value in the markup and still is true

    if (isHidden) {
      infoEl.style.display = 'none';
    }

    button.addEventListener('click', () => {
      if (isHidden) {
        infoEl.style.display = 'block';
        button.textContent = 'Hide';
        isHidden = false;
      } else {
        infoEl.style.display = 'none';
        button.textContent = 'Show';
        isHidden = true;
      }
    });
  }
}

customElements.define('silveste-show', Show);
