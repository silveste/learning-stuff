import { r as registerInstance, h, H as Host } from './core-4cbd5493.js';
import { A as AV_API_KEY } from './av_api_key-34800469.js';

const StockPrice = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.stockInputValid = false;
    }
    stockSymbolChanged(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.stockUserInput = newValue;
            this.fetchStockPrice(newValue);
        }
    }
    onUserInput(event) {
        this.stockUserInput = event.target.value;
        this.stockInputValid = this.stockUserInput.trim() !== '' &&
            this.stockUserInput.trim() !== this.symbolFetched;
    }
    onFetchStockPrice(event) {
        //There are different ways to reference to an element
        //A) Using query selector
        //const stockSymbol: string = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
        //B) Using ref attribute provided by stencil (See input element in JSX)
        event.preventDefault();
        this.error = null;
        this.fetchedPrice = null;
        this.symbolFetched = null;
        this.stockSymbol = this.stockInput.value;
    }
    fetchStockPrice(stockSymbol) {
        this.stockInputValid = false;
        this.waiting = true;
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
            .then((res) => {
            if (res.status !== 200) {
                throw new Error('Invalid!');
            }
            return res.json();
        })
            .then((parsedResponse) => {
            if (!parsedResponse['Global Quote'] ||
                !parsedResponse['Global Quote']['05. price']) {
                throw new Error('Invalid Symbol!!!');
            }
            this.waiting = false;
            this.fetchedPrice = +parsedResponse['Global Quote']['05. price'];
            this.symbolFetched = stockSymbol;
        })
            .catch(err => {
            this.waiting = false;
            this.error = err.message;
        });
    }
    //hosData is executed whenever render is executed
    hostData() {
        return { class: this.error ? 'error' : '' };
    }
    componentWillLoad() {
        console.log('componentWillLoad triggers before component has been rendered');
        if (this.stockSymbol) {
            this.stockUserInput = this.stockSymbol;
            this.fetchStockPrice(this.stockSymbol);
        }
    }
    componentDidLoad() {
        console.log('componentDidLoad triggers after component has been rendered');
    }
    componentWillUpdate() {
        console.log('componentWillUpdate triggers before component has been rendered after update');
    }
    componentDidUpdate() {
        console.log('componentDidLoad triggers after component has been rendered after update');
    }
    componentDidUnload() {
        console.log('componentDidUnload triggers after component has been rremoved from the DOM');
    }
    onStockSymbolSelected(event) {
        console.log(' Stock symbol selected');
        if (event.detail && event.detail !== this.stockSymbol) {
            this.stockSymbol = event.detail;
        }
    }
    __stencil_render() {
        let dataContent = h("p", null, "Please enter a symbol");
        if (this.error) {
            dataContent = h("p", null, this.error);
        }
        if (this.fetchedPrice) {
            dataContent = h("p", null, "Price: $", this.fetchedPrice);
        }
        if (this.waiting) {
            dataContent = h("se-spinner", null);
        }
        return [
            h("form", { onSubmit: this.onFetchStockPrice.bind(this) }, h("input", { id: "stock-symbol", ref: el => this.stockInput = el, value: this.stockUserInput, onInput: this.onUserInput.bind(this) }), h("button", { type: "submit", disabled: !this.stockInputValid || this.waiting }, "Fetch")),
            h("div", null, h("p", null, dataContent))
        ];
    }
    static get watchers() { return {
        "stockSymbol": ["stockSymbolChanged"]
    }; }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ":host {\n  font-family: sans-serif;\n  border: 2px solid var(--color-primary, black);\n  margin: 2rem;\n  padding: 1rem;\n  display: block;\n  width: 20rem;\n  max-width: 100%;\n}\n\n:host(.error) {\n  border: 5px solid var(--color-error, #f00);\n}\n\nform input {\n  font: inherit;\n  color: var(--color-primary, black);\n  padding: 0.1rem 0.25rem;\n  margin-bottom: 0.5rem;\n}\n\nform button {\n  font: inherit;\n  padding: 0.25rem 0.5rem;\n  border: 1px solid var(--color-primary, black);\n  background: var(--color-primary, black);\n  color: var(--color-primary-inverse, #f5f5f5);\n  cursor: pointer;\n  display: block;\n  border-radius: 3px;\n  -webkit-box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5);\n  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5);\n}\n\nform input:focus,\nform button:focus {\n  outline: none;\n}\n\nform button:hover,\nform button:active {\n  background: var(--color-primary-light, #999);\n  border-color: var(--color-primary-light, #999);\n}\n\nform button:active {\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n\nform button:disabled {\n  background: #ccc;\n  border-color: #ccc;\n  color: var(--color-primary-inverse, #f5f5f5);\n  cursor: not-allowed;\n}"; }
};

export { StockPrice as se_stock_price };
