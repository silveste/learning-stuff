import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { authCheckState } from './store/actions';


function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.token !== null);
  useEffect(() => {
    dispatch(authCheckState());
  });
  const routes = [
    <Route key="auth" path="/auth" component={Auth} />,
    <Route key="root" path="/" component={BurgerBuilder} />,
    <Redirect key="redirectUnknown" to="/" />
  ];
  if (isAuth) {
    const authRoutes = [
      <Route key="checkout" path="/checkout" component={Checkout} />,
      <Route key="orders" path="/orders" component={Orders} />,
      <Route key="logout" path="/logout" component={Logout} />
    ];
    routes.splice(0,0, ...authRoutes);
  }
  return (
    <div >
      <Layout>
        <Switch>
          {routes}
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
