import { h } from "@stencil/core";
import { AV_API_KEY } from '../../global/av_api_key';
export class StockFinder {
    constructor() {
        this.searchResults = [];
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
        let content = (h("ul", null, this.searchResults.map(result => (h("li", { onClick: this.onSelectSymbol.bind(this, result.symbol) },
            h("strong", null, result.symbol),
            "-",
            result.name)))));
        if (this.waiting) {
            content = h("se-spinner", null);
        }
        return [
            h("form", { onSubmit: this.onFindStocks.bind(this) },
                h("input", { id: "stock-symbol", ref: el => this.stockNameInput = el }),
                h("button", { type: "submit" }, "Find!")),
            content
        ];
    }
    static get is() { return "se-stock-finder"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./stock-finder.css"]
    }; }
    static get styleUrls() { return {
        "$": ["stock-finder.css"]
    }; }
    static get states() { return {
        "searchResults": {},
        "waiting": {}
    }; }
    static get events() { return [{
            "method": "seSymbolSelected",
            "name": "seSymbolSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            }
        }]; }
}
