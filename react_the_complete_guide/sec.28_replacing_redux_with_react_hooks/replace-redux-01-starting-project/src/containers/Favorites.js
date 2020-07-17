import React, { useContext } from 'react';

import FavoriteItem from '../components/Favorites/FavoriteItem';
/* Replaced by custom hook store
import { ProductsContext } from '../context/products-context'*/
import { useStore } from '../hooks-store/store';
import './Products.css';

const Favorites = props => {
  /* Replaced by custom hook store
  const favoriteProducts = useContext(ProductsContext).products.filter(product => product.isFavorite);*/
  const state = useStore()[0];
  const favoriteProducts = state.products.filter(product => product.isFavorite);
  let content = <p className="placeholder">Got no favorites yet!</p>;
  if (favoriteProducts.length > 0) {
    content = (
      <ul className="products-list">
        {favoriteProducts.map(prod => (
          <FavoriteItem
            key={prod.id}
            id={prod.id}
            title={prod.title}
            description={prod.description}
          />
        ))}
      </ul>
    );
  }
  return content;
};

export default Favorites;
