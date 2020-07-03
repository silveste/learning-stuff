import React, { useCallback, useReducer, useMemo, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http';

const ingredientsReducer = (currentIng, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIng, action.ingredient]
    case 'DELETE':
      return currentIng.filter(ing => ing.id !== action.id);
    default:
      throw new Error(`ingredientsReducer - Unknown action type: ${action.type}`)
  }
}

/* Replaced by useHttp custom hook
const httpReducer = (httpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null };
    case 'RESPONSE':
      return { ...httpState, loading: false };
    case 'ERROR':
      return { error: action.error, loading: false };
    case 'CLEAR':
      return { ...httpState, error: action.error };
    default:
      throw new Error(`httpReducer -  Unknown action type: ${action.type}`)
  }
}
*/

const Ingredients = () => {
  const [ingredients, dispatch] = useReducer(ingredientsReducer,[]);
  const { isLoading, error, data, reqParams, sendRequest, method, clearRequest } = useHttp();

  useEffect(() => {
    if (isLoading) return;
    switch (method) {
      case 'DELETE':
        dispatch({type: 'DELETE', id: reqParams});
        break;
      case 'POST':
        dispatch({
          type: 'ADD',
          ingredient: {  id: data.name, ...reqParams }
        });
        break;
      default:
        if (method) throw new Error(`Unhandled response method: ${method}`);
    }
  },[data, reqParams, method, isLoading]);
  /* REPLACED by useHttp custom hook
  const [httpState, dispatchHttp] = useReducer(httpReducer,{ loading: false, error: null });
  */
  /* REPLACED by ingredientsReducer
  const [ ingredients, setIngredients ] = useState([]);
  */
  /* REPLACED by httpReducer
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState();
  */

  /*
  useEffect runs after every component render cicle,
  The second parameter is an array which should contains the dependecies that trigers the function.
  When any dependency change the function runs after every render cicle.
  If you pass the array empty the function only run once (similar to componentDidMount)
  */
  /* REPLACED by loading components in the search component
  useEffect(() => {
     fetch('https://react-hooks-1071f.firebaseio.com/ingredients.json')
      .then(res => res.json())
      .then(resObj => {
        const initIng = Object.keys(resObj).map(key => ({
          id: key,
          title: resObj[key].title,
          amount: resObj[key].amount
        }));
        setIngredients(initIng);
      });
  }, []);
  */

  const filteredIngredientsHandler = useCallback(
     /* REPLACED by ingredientsReducer
     setIngredients(filterIng),
     */
     filterIng => dispatch({type: 'SET', ingredients: filterIng}),
     []
  );

  const addIngredientHandler = useCallback(ingredient => {
    sendRequest(
      'https://react-hooks-1071f.firebaseio.com/ingredients.json',
      'POST',
      ingredient
    );
    /* REPLACED by useHttp custom hook
    dispatchHttp({ type: 'SEND' });
    fetch('https://react-hooks-1071f.firebaseio.com/ingredients.json',{
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-type': 'application/json' }
    }).then(res => res.json())
    .then(resObj => {
      dispatch({
        type: 'ADD',
        ingredient: {  id: resObj.name, ...ingredient }
      });
      dispatchHttp({ type: 'RESPONSE' });
    })
    /* REPLACED by ingredients reducer
    .then(resObj => setIngredients(prev => [
        ...prev,
        {  id: resObj.name, ...ingredient }
    ]))
    *//*
    .catch(err => dispatchHttp({ type: 'ERROR', error: err.message }));
    */
  },[]);

  const removeIngredientHandler = useCallback(id => {
    /* REPLACED by useHttp custom hook
    dispatchHttp({ type: 'SEND' });
    fetch(`https://react-hooks-1071f.firebaseio.com/ingredients/${id}.json`,{
      method: 'DELETE'
    })
    /* REPLACED by ingredients reducer
    .then(() => setIngredients(prev => prev.filter(ingr => ingr.id !== id )))
    *//*
    .then(() => {
      dispatch({type: 'DELETE', id });
      dispatchHttp({ type: 'RESPONSE' });
    })
    .catch(err => dispatchHttp({ type: 'ERROR', error: err.message }));
    */
    sendRequest(`https://react-hooks-1071f.firebaseio.com/ingredients/${id}.json`,'DELETE', id);
  },[sendRequest]);

  const errorConfirmedHandler = useCallback(clearRequest, []);
  /*REPLACED by useHttp custom hook
  dispatchHttp({ type: 'CLEAR' })
  ,[]);
  */

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={ingredients}
        onRemoveItem={removeIngredientHandler}
      />
    );
  },[ingredients, removeIngredientHandler]);

  return (
    <div className="App">
      { error && <ErrorModal onClose={errorConfirmedHandler}>{error}</ErrorModal> }
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
