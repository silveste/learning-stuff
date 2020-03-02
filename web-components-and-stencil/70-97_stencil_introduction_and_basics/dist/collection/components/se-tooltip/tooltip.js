import { h } from "@stencil/core";
export class Tooltip {
    constructor() {
        this.hidden = true;
    }
    onToggleTip() {
        this.hidden = !this.hidden;
    }
    render() {
        return (h("p", null,
            h("slot", null),
            h("div", { id: "icon", onClick: this.onToggleTip.bind(this) },
                "?",
                this.hidden ? null : h("div", { id: "tip" }, this.tip))));
    }
    static get is() { return "se-tooltip"; }
    static get encapsulation() { return "shadow"; }
    static get styles() { return "#icon {\n      position: relative;\n      display: inline-block;\n      padding: 0.3em 0.6em;\n      color: white;\n      background-color: black;\n      border-radius: 50%;\n      cursor: pointer;\n    }\n\n    #tip {\n      position: absolute;\n      top: 1.8em;\n      color: white;\n      background-color: black;\n      border-radius: 3px;\n      box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);\n      width: 10em;\n      padding: 1em;\n      transform: translateX(-50%);\n    }"; }
    static get properties() { return {
        "tip": {
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
            "attribute": "tip",
            "reflect": false
        }
    }; }
    static get states() { return {
        "hidden": {}
    }; }
}
