import { h, Component, State, Event, EventEmitter } from '@stencil/core';
import { AV_API_KEY } from '../../global/av_api_key';

@Component({
  tag: 'se-stock-finder',
  styleUrl: './stock-finder.css',
  shadow: true
})
export class StockFinder {
  stockNameInput: HTMLInputElement;

  @State() searchResults: {symbol: string, name: string}[] = [];
  @State() waiting: boolean;

  @Event({bubbles: true, composed: true}) seSymbolSelected: EventEmitter<string>;

  onFindStocks (event: Event) {
    event.preventDefault();
    const stockName = this.stockNameInput.value;
    this.waiting = true;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
      .then(res => res.json())
      .then(parsedRes => {
        this.searchResults = parsedRes['bestMatches'].map( (match: {}) =>{
          this.waiting = false;
          return {
            symbol: match['1. symbol'],
            name: match['2. name']
          }
        });
      })
      .catch(err => {
        this.waiting = false;
        console.error(err)
      });
  }

  onSelectSymbol(symbol: string) {
    this.seSymbolSelected.emit(symbol);
  }

  render () {
    let content = (
      <ul>
        {this.searchResults.map( result => (
          <li onClick={this.onSelectSymbol.bind(this,result.symbol)}>
            <strong>{result.symbol}</strong>-{result.name}
          </li>)
        )}
      </ul>
    );
    if (this.waiting) {
      content = <se-spinner></se-spinner>;
    }
    return [
      <form onSubmit={this.onFindStocks.bind(this)}>
       <input
        id="stock-symbol"
        ref={el => this.stockNameInput = el}
      />
       <button type="submit">
        Find!
      </button>
      </form>,
      content
    ]
  }
}
