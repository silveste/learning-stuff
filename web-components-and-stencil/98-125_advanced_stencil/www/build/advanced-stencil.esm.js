import { p as patchBrowser, g as globals, b as bootstrapLazy } from './core-4cbd5493.js';

patchBrowser().then(options => {
  globals();
  return bootstrapLazy([["se-spinner",[[1,"se-spinner"]]],["se-stock-finder",[[1,"se-stock-finder",{"searchResults":[32],"waiting":[32]}]]],["se-stock-price",[[1,"se-stock-price",{"stockSymbol":[1537,"stock-symbol"],"symbolFetched":[32],"fetchedPrice":[32],"stockUserInput":[32],"stockInputValid":[32],"error":[32],"waiting":[32]},[[32,"seSymbolSelected","onStockSymbolSelected"]]]]]], options);
});
