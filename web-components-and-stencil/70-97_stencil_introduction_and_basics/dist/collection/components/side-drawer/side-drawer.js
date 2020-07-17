import { h } from "@stencil/core";
export class SideDrawer {
    constructor() {
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
            mainContent = (h("div", { id: "contact-information" },
                h("h2", null, "Contact Information"),
                h("p", null, "You can reach us via phone or email"),
                h("ul", null,
                    h("li", null, "Phone: 01458269"),
                    h("li", null,
                        "Email:",
                        h("a", { href: "mailto:someemail@email.com" }, "someemail@email.com")))));
        }
        return [
            h("aside", null,
                h("header", null,
                    h("h1", null, this.title),
                    h("button", { onClick: this.onCloseDrawer.bind(this) }, "\u00AB")),
                h("section", { id: "tabs" },
                    h("button", { class: !this.showContactInfo ? 'active' : '', onClick: this.onTabSelected.bind(this, 'nav') }, "Navigation"),
                    h("button", { class: this.showContactInfo ? 'active' : '', onClick: this.onTabSelected.bind(this, 'contact') }, "Contact")),
                h("main", null, mainContent)),
            h("div", { class: "backdrop", onClick: this.onCloseDrawer.bind(this) })
        ];
    }
    static get is() { return "se-side-drawer"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./side-drawer.css"]
    }; }
    static get styleUrls() { return {
        "$": ["side-drawer.css"]
    }; }
    static get properties() { return {
        "title": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "title",
            "reflect": true
        },
        "opened": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "opened",
            "reflect": true
        }
    }; }
    static get states() { return {
        "showContactInfo": {}
    }; }
    static get methods() { return {
        "open": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {},
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
}
