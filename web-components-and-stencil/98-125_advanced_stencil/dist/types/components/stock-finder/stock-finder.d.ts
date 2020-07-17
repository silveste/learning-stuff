import { EventEmitter } from '../../stencil.core';
export declare class StockFinder {
    stockNameInput: HTMLInputElement;
    searchResults: {
        symbol: string;
        name: string;
    }[];
    waiting: boolean;
    seSymbolSelected: EventEmitter<string>;
    onFindStocks(event: Event): void;
    onSelectSymbol(symbol: string): void;
    render(): any[];
}
