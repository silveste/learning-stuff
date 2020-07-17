import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
/* Replaced by custom hook store
import ProductsProvider from './context/products-context';*/
import configureProductStore from './hooks-store/products-store';

configureProductStore();

ReactDOM.render(
  /* Replaced by custom hook store
  <ProductsProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProductsProvider>,*/
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
