import { h } from "@stencil/core";
export class Spinner {
    render() {
        return (h("div", { class: "lds-ellipsis" },
            h("div", null),
            h("div", null),
            h("div", null),
            h("div", null)));
    }
    static get is() { return "se-spinner"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./spinner.css"]
    }; }
    static get styleUrls() { return {
        "$": ["spinner.css"]
    }; }
}
