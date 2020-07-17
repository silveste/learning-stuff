export declare class StockPrice {
    stockInput: HTMLInputElement;
    symbolFetched: string;
    fetchedPrice: number;
    stockUserInput: string;
    stockInputValid: boolean;
    error: string;
    waiting: boolean;
    stockSymbol: string;
    stockSymbolChanged(newValue: string, oldValue: string): void;
    onUserInput(event: Event): void;
    onFetchStockPrice(event: Event): void;
    fetchStockPrice(stockSymbol: string): void;
    hostData(): {
        class: string;
    };
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentWillUpdate(): void;
    componentDidUpdate(): void;
    componentDidUnload(): void;
    onStockSymbolSelected(event: CustomEvent): void;
    render(): any[];
}
