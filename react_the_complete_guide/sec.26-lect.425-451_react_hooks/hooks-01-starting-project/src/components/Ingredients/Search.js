import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http';
import './Search.css';

const Search = React.memo(props => {
  const [filterText, setFilterText] = useState('');
  const { onLoadIngredients } = props;
  const inputRef = useRef();
  const { isLoading, error, data, sendRequest, clearRequest } = useHttp();

  useEffect(() => {
    const timerId = setTimeout(() => {
      if(filterText === inputRef.current.value) {
        const query = filterText.length === 0
        ? ''
        : `?orderBy="title"&equalTo="${filterText}"`;
        sendRequest(`https://react-hooks-1071f.firebaseio.com/ingredients.json${query}`);
      }
    }, 500);
    //Clean up function, runs before next useEffect of this type runs (If dependencies are not updated useffect doesn run so it runs when component is unmounted)
    return () => {
      clearTimeout(timerId)
    };
  }, [filterText, inputRef, sendRequest]);

  useEffect(() => {
    if(isLoading || error || !data) return;
    const ingredients = Object.keys(data).map(key => ({
       id: key,
       title: data[key].title,
       amount: data[key].amount
     }));
     onLoadIngredients(ingredients);
  },[data, isLoading, error, onLoadIngredients ]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clearRequest}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input
            ref={inputRef}
            type="text"
            value={filterText}
            onChange={e => setFilterText(e.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
