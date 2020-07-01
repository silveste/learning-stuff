import { put } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from '../../axios-orders';

export function* initIngredientsSaga(action) {
    try {
      const res = yield axios.get('https://react-my-burger-19c13.firebaseio.com/ingredients.json');
      yield put(actions.setIngredients(res.data));
    } catch (err) {
      yield put(actions.fetchIngredientsFailed())
    }
}
