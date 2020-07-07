import { put } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from '../../axios-orders';

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const res = yield axios.post(`orders.json?auth=${action.token}`, action.orderData);
    yield put(actions.purchaseBurgerSuccess(res.data.name, action.orderData));
  } catch (err) {
    yield put(actions.purchaseBurgerFailed(err));
  }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
    //Side note: Firebase is not correct configured an a user would be able to use its token to retrieve the informastion of other user by changing userId on the post request
    const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
    try {
      const res = yield axios.get(`orders.json${queryParams}`);
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key
        })
      };
      yield put(actions.fetchOrdersSuccess(fetchedOrders));
    } catch (err) {
      yield put(actions.fetchOrdersFailed(err))
    }
}
