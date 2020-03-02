import { r as registerInstance, h } from './core-4cbd5493.js';

const Spinner = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("div", { class: "lds-ellipsis" }, h("div", null), h("div", null), h("div", null), h("div", null)));
    }
    static get style() { return ".lds-ellipsis {\n  display: inline-block;\n  position: relative;\n  width: 64px;\n  height: 64px;\n}\n\n.lds-ellipsis div {\n  position: absolute;\n  top: 27px;\n  width: 11px;\n  height: 11px;\n  border-radius: 50%;\n  background: var(--color-primary-light, black);\n  -webkit-animation-timing-function: cubic-bezier(0, 1, 1, 0);\n  animation-timing-function: cubic-bezier(0, 1, 1, 0);\n}\n\n.lds-ellipsis div:nth-child(1) {\n  left: 6px;\n  -webkit-animation: lds-ellipsis1 0.6s infinite;\n  animation: lds-ellipsis1 0.6s infinite;\n}\n\n.lds-ellipsis div:nth-child(2) {\n  left: 6px;\n  -webkit-animation: lds-ellipsis2 0.6s infinite;\n  animation: lds-ellipsis2 0.6s infinite;\n}\n\n.lds-ellipsis div:nth-child(3) {\n  left: 26px;\n  -webkit-animation: lds-ellipsis2 0.6s infinite;\n  animation: lds-ellipsis2 0.6s infinite;\n}\n\n.lds-ellipsis div:nth-child(4) {\n  left: 45px;\n  -webkit-animation: lds-ellipsis3 0.6s infinite;\n  animation: lds-ellipsis3 0.6s infinite;\n}\n\n\@-webkit-keyframes lds-ellipsis1 {\n  0% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  }\n\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n  }\n}\n\n\@keyframes lds-ellipsis1 {\n  0% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  }\n\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n  }\n}\n\n\@-webkit-keyframes lds-ellipsis3 {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n  }\n\n  100% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  }\n}\n\n\@keyframes lds-ellipsis3 {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n  }\n\n  100% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  }\n}\n\n\@-webkit-keyframes lds-ellipsis2 {\n  0% {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0);\n  }\n\n  100% {\n    -webkit-transform: translate(19px, 0);\n    transform: translate(19px, 0);\n  }\n}\n\n\@keyframes lds-ellipsis2 {\n  0% {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0);\n  }\n\n  100% {\n    -webkit-transform: translate(19px, 0);\n    transform: translate(19px, 0);\n  }\n}"; }
};

export { Spinner as se_spinner };
