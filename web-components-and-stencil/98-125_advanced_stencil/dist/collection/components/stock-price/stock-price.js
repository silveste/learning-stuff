import { h } from "@stencil/core";
import { AV_API_KEY } from '../../global/av_api_key';
export class StockPrice {
    constructor() {
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
    render() {
        let dataContent = h("p", null, "Please enter a symbol");
        if (this.error) {
            dataContent = h("p", null, this.error);
        }
        if (this.fetchedPrice) {
            dataContent = h("p", null,
                "Price: $",
                this.fetchedPrice);
        }
        if (this.waiting) {
            dataContent = h("se-spinner", null);
        }
        return [
            h("form", { onSubmit: this.onFetchStockPrice.bind(this) },
                h("input", { id: "stock-symbol", ref: el => this.stockInput = el, value: this.stockUserInput, onInput: this.onUserInput.bind(this) }),
                h("button", { type: "submit", disabled: !this.stockInputValid || this.waiting }, "Fetch")),
            h("div", null,
                h("p", null, dataContent))
        ];
    }
    static get is() { return "se-stock-price"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./stock-price.css"]
    }; }
    static get styleUrls() { return {
        "$": ["stock-price.css"]
    }; }
    static get properties() { return {
        "stockSymbol": {
            "type": "string",
            "mutable": true,
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
            "attribute": "stock-symbol",
            "reflect": true
        }
    }; }
    static get states() { return {
        "symbolFetched": {},
        "fetchedPrice": {},
        "stockUserInput": {},
        "stockInputValid": {},
        "error": {},
        "waiting": {}
    }; }
    static get watchers() { return [{
            "propName": "stockSymbol",
            "methodName": "stockSymbolChanged"
        }]; }
    static get listeners() { return [{
            "name": "seSymbolSelected",
            "method": "onStockSymbolSelected",
            "target": "body",
            "capture": false,
            "passive": false
        }]; }
}
