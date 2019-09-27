class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.isOpen = false;
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease-out;
        }

        :host([opened]) {
          opacity: 1;
          pointer-events: all;
        }

        :host([opened]) #modal {
          top : 15vh;
          opacity: 1;
          transition: all 0.3s ease-out;
        }

        #backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0,0,0,0.75);
          z-index: 10;
        }

        #modal {
          z-index: 100;
          position: fixed;
          top: 10vh;
          left: 25%;
          width: 50%;
          background-color: #fff;
          border-radius: 3px;
          box-shadow: 0 2px 7px rgba(0,0,0,0.25);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          opacity: 0;
        }

        header {
          padding: 1rem;
          border-bottom: 1px solid #ccc;
        }

        ::slotted(h1) {
          font-size: 1.2rem;
          margin: 0;
        }

        #main {
          padding: 1rem;
        }

        #actions {
          border-top: 1px solid #ccc;
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
        }

        #actions button {
          margin: 0 0.25rem;
        }
      </style>
      <div id="backdrop"></div>
      <div id="modal">
        <header>
          <slot name="title">Please confirm from component</slot>
        </header>
        <section id="main">
          <slot></slot>
        </section>
        <section id="actions">
          <button id="cancel-btn">Cancel</button>
          <button id="confirm-btn">Ok</button>
        </section>
      </div>
    `;

    const cancelButton = this.shadowRoot.querySelector('#cancel-btn');
    const confirmButton = this.shadowRoot.querySelector('#confirm-btn');
    const backdrop = this.shadowRoot.querySelector('#backdrop');

    cancelButton.addEventListener('click', this._cancel.bind(this));
    confirmButton.addEventListener('click', this._confirm.bind(this));
    backdrop.addEventListener('click', this.hide.bind(this));

    //There is also ways to listen to changes inside the slots and also to see the nodes inside:
    // const slots = this.shadowRoot.querySelectorAll('slot');
    // slots[1].addEventListener('slotchange', e => {
    //   console.dir(slots[1].assignedNodes());
    // });
  }

  //To show the modal can be achieved bu using CSS selectors
  // attributeChangedCallback(name, oldVal, newVal) {
  //   switch (name) {
  //     case 'opened':
  //       if (this.hasAttribute('opened')) {
  //         this.shadowRoot.host.style.opacity = 1;
  //         this.shadowRoot.host.style.pointerEvents = 'all';
  //       } else {
  //         this.shadowRoot.host.style.opacity = 0;
  //         this.shadowRoot.host.style.pointerEvents = none;
  //       }
  //       break;
  //     default:
  //       return;
  //   }
  // }

  //static get observedAttributes() {
  //  return ['opened'];
  //}

  open() {
    this.setAttribute('opened','');
    this.isOpen = true;
  }

  hide() {
    if (this.isOpen) {
      this.removeAttribute('opened');
      this.isOpen = false;
    }
  }

  _cancel(event) {
    const cancelEvent = new Event('cancel', {bubbles: true, composed: true});
        //bubbles property indicates that the event bubbles up until find an event handler
        //composed property allows the event to leave the shadow DOm and move into live DOM until finds a correct handler
    event.target.dispatchEvent(cancelEvent);
    this.hide();
  }

  _confirm(event) {
    const confirmEvent = new Event('confirm');
    //Other way to dispatch the event is using the component to dispatch it
    this.dispatchEvent(confirmEvent);
    this.hide();
  }
}

customElements.define('silveste-modal',Modal);
