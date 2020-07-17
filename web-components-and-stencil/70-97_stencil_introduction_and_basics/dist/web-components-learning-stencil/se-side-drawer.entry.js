import { r as registerInstance, h } from './core-05997c13.js';

const SideDrawer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.showContactInfo = false;
    }
    onCloseDrawer() {
        this.opened = false;
    }
    onTabSelected(tab) {
        this.showContactInfo = tab === 'contact';
    }
    open() {
        this.opened = true;
    }
    render() {
        /*
        Drawer visibility is controlled using CSS so no need the following code which is another way to open the drawer without CSS (depends also on prop open)
          let content = null;
          if (this.open) {
            content = (
              <aside>
                <header><h1>{this.title}</h1></header>
                <main><slot /></main>
              </aside>
            );
          }
          return content;
        */
        let mainContent = h("slot", null);
        if (this.showContactInfo) {
            mainContent = (h("div", { id: "contact-information" }, h("h2", null, "Contact Information"), h("p", null, "You can reach us via phone or email"), h("ul", null, h("li", null, "Phone: 01458269"), h("li", null, "Email:", h("a", { href: "mailto:someemail@email.com" }, "someemail@email.com")))));
        }
        return [
            h("aside", null, h("header", null, h("h1", null, this.title), h("button", { onClick: this.onCloseDrawer.bind(this) }, "\u00AB")), h("section", { id: "tabs" }, h("button", { class: !this.showContactInfo ? 'active' : '', onClick: this.onTabSelected.bind(this, 'nav') }, "Navigation"), h("button", { class: this.showContactInfo ? 'active' : '', onClick: this.onTabSelected.bind(this, 'contact') }, "Contact")), h("main", null, mainContent)),
            h("div", { class: "backdrop", onClick: this.onCloseDrawer.bind(this) })
        ];
    }
    static get style() { return "aside {\n  z-index: 10;\n  position: fixed;\n  top: 0;\n  left: -100%;\n  width: 30rem;\n  max-width: 80%;\n  height: 100vh;\n  background-color: #e9e9e9;\n  -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);\n  -webkit-transition: left 0.3s ease-out;\n  transition: left 0.3s ease-out;\n}\n\n:host([opened]) aside {\n  left: 0;\n}\n\nheader {\n  padding: 1rem;\n  background: black;\n  position: relative;\n}\n\nheader h1 {\n  font-size: 1.5rem;\n  color: white;\n  margin: 0;\n}\n\nheader button {\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 1rem;\n  color: white;\n  background: transparent;\n  font-size: 1.2rem;\n  border: none;\n}\n\nheader button:focus {\n  outline: none;\n}\n\nheader button:active {\n  color: #0f0;\n}\n\n#tabs {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n  justify-content: center;\n  margin: 1rem 0;\n}\n\n#tabs button {\n  width: 30%;\n  background: white;\n  color: black;\n  text-align: center;\n  border: 1px solid black;\n  font: inherit;\n  padding: 0.15rem;\n  outline: none;\n}\n\n#tabs button.active,\n#tabs button:active,\n#tabs button:hover {\n  background: black;\n  color: white;\n}\n\n#contact-information {\n  padding: 0 1rem;\n}\n\n.backdrop {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.75);\n  z-index: 1;\n  opacity: 0;\n  pointer-events: none;\n  -webkit-transition: opacity 0.3s ease-out;\n  transition: opacity 0.3s ease-out;\n}\n\n:host([opened]) .backdrop {\n  opacity: 1;\n  pointer-events: all;\n}"; }
};

export { SideDrawer as se_side_drawer };
