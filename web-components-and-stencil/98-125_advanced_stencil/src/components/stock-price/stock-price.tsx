import { h, Component, State, Prop, Watch, Listen } from "@stencil/core";
import { AV_API_KEY } from '../../global/av_api_key';

@Component({
  tag: 'se-stock-price',
  styleUrl: './stock-price.css',
  shadow: true
})

export class StockPrice {
  stockInput: HTMLInputElement;
  //@Element is used to reference an element using query selector
  //@Element() el: HTMLElement;
  @State() symbolFetched: string;
  @State() fetchedPrice: number;
  @State() stockUserInput: string;
  @State() stockInputValid = false;
  @State() error: string;
  @State() waiting: boolean;

  @Prop({mutable: true, reflectToAttr: true}) stockSymbol: string;

  @Watch('stockSymbol')
  stockSymbolChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.fetchStockPrice(newValue);
    }
  }

  onUserInput(event: Event){
    this.stockUserInput = (event.target as HTMLInputElement).value;
    this.stockInputValid = this.stockUserInput.trim() !== '' &&
                        this.stockUserInput.trim() !== this.symbolFetched;
  }

  onFetchStockPrice(event: Event){
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

  fetchStockPrice(stockSymbol: string) {
    this.stockInputValid = false;
    this.waiting = true;
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
      .then((res: Response)=> {
        if (res.status !== 200) {
          throw new Error('Invalid!');
        }
        return res.json()
      })
      .then((parsedResponse: JSON) => {
        if( !parsedResponse['Global Quote'] ||
            !parsedResponse['Global Quote']['05. price']){
          throw new Error('Invalid Symbol!!!');
        }
        this.waiting = false;
        this.fetchedPrice = +parsedResponse['Global Quote']['05. price']
        this.symbolFetched = stockSymbol;
      })
      .catch(err => {
        this.waiting = false;
        this.error = err.message
      });
  }

  //hosData is executed whenever render is executed
  hostData() {
    return {class: this.error ? 'error' : '' }
  }

  componentWillLoad() {
    console.log('componentWillLoad triggers before component has been rendered');
    if(this.stockSymbol) {
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

  @Listen('body:seSymbolSelected')
  onStockSymbolSelected(event: CustomEvent) {
    console.log(' Stock symbol selected');
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
    }
  }

  render() {
    let dataContent = <p>Please enter a symbol</p>;
    if (this.error) {
      dataContent = <p>{this.error}</p>;
    }
    if(this.fetchedPrice){
      dataContent = <p>Price: ${this.fetchedPrice}</p>;
    }
    if(this.waiting){
      dataContent = <se-spinner></se-spinner>;
    }
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
       <input
        id="stock-symbol"
        ref={el => this.stockInput = el}
        value={this.stockUserInput}
        onInput={this.onUserInput.bind(this)}
      />
       <button type="submit" disabled={!this.stockInputValid || this.waiting }>
        Fetch
      </button>
      </form>,
      <div>
        <p>{dataContent}</p>
      </div>
    ];
  }
}
