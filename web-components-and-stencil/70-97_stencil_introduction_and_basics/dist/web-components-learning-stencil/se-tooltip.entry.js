import { r as registerInstance, h } from './core-05997c13.js';

const Tooltip = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.hidden = true;
    }
    onToggleTip() {
        this.hidden = !this.hidden;
    }
    render() {
        return (h("p", null, h("slot", null), h("div", { id: "icon", onClick: this.onToggleTip.bind(this) }, "?", this.hidden ? null : h("div", { id: "tip" }, this.tip))));
    }
    static get style() { return "#icon {\n      position: relative;\n      display: inline-block;\n      padding: 0.3em 0.6em;\n      color: white;\n      background-color: black;\n      border-radius: 50%;\n      cursor: pointer;\n    }\n\n    #tip {\n      position: absolute;\n      top: 1.8em;\n      color: white;\n      background-color: black;\n      border-radius: 3px;\n      -webkit-box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);\n      box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);\n      width: 10em;\n      padding: 1em;\n      -webkit-transform: translateX(-50%);\n      transform: translateX(-50%);\n    }"; }
};

export { Tooltip as se_tooltip };
