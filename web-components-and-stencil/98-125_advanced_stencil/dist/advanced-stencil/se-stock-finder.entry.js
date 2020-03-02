import { r as registerInstance, c as createEvent, h } from './core-4cbd5493.js';
import { A as AV_API_KEY } from './av_api_key-34800469.js';

const StockFinder = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.searchResults = [];
        this.seSymbolSelected = createEvent(this, "seSymbolSelected", 7);
    }
    onFindStocks(event) {
        event.preventDefault();
        const stockName = this.stockNameInput.value;
        this.waiting = true;
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
            .then(res => res.json())
            .then(parsedRes => {
            this.searchResults = parsedRes['bestMatches'].map((match) => {
                this.waiting = false;
                return {
                    symbol: match['1. symbol'],
                    name: match['2. name']
                };
            });
        })
            .catch(err => {
            this.waiting = false;
            console.error(err);
        });
    }
    onSelectSymbol(symbol) {
        this.seSymbolSelected.emit(symbol);
    }
    render() {
        let content = (h("ul", null, this.searchResults.map(result => (h("li", { onClick: this.onSelectSymbol.bind(this, result.symbol) }, h("strong", null, result.symbol), "-", result.name)))));
        if (this.waiting) {
            content = h("se-spinner", null);
        }
        return [
            h("form", { onSubmit: this.onFindStocks.bind(this) }, h("input", { id: "stock-symbol", ref: el => this.stockNameInput = el }), h("button", { type: "submit" }, "Find!")),
            content
        ];
    }
    static get style() { return ":host {\n  font-family: sans-serif;\n  border: 2px solid var(--color-primary, black);\n  margin: 2rem;\n  padding: 1rem;\n  display: block;\n  width: 20rem;\n  max-width: 100%;\n}\n\nform input {\n  font: inherit;\n  color: var(--color-primary, black);\n  padding: 0.1rem 0.25rem;\n  margin-bottom: 0.5rem;\n}\n\nform button {\n  font: inherit;\n  padding: 0.25rem 0.5rem;\n  border: 1px solid var(--color-primary, black);\n  background: var(--color-primary, black);\n  color: var(--color-primary-inverse, #f5f5f5);\n  cursor: pointer;\n  display: block;\n  border-radius: 3px;\n  -webkit-box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5);\n  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5);\n}\n\nform input:focus,\nform button:focus {\n  outline: none;\n}\n\nform button:hover,\nform button:active {\n  background: var(--color-primary-light, #999);\n  border-color: var(--color-primary-light, #999);\n}\n\nform button:active {\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n\nform button:disabled {\n  background: #ccc;\n  border-color: #ccc;\n  color: var(--color-primary-inverse, #f5f5f5);\n  cursor: not-allowed;\n}\n\nul {\n  margin: 0;\n  list-style: none;\n  padding: 0;\n}\n\nli {\n  margin: 0.25rem 0;\n  padding: 0.25rem;\n  border: 1px solid #ccc;\n  cursor: pointer;\n}\n\nli:hover,\nli:active {\n  background: var(--color-primary-light, #999);\n  color: var(--color-primary-inverse, #f5f5f5);\n}"; }
};

export { StockFinder as se_stock_finder };
