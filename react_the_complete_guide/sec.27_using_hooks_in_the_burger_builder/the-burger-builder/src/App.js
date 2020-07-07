import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authCheckState } from './store/actions';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Spinner from './components/UI/Spinner/Spinner';
const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Auth = lazy(() => import('./containers/Auth/Auth'));
const Logout = lazy(() => import('./containers/Auth/Logout/Logout'));

function App() {
  const dispatchToStore = useDispatch();
  const isAuth = useSelector(state => state.auth.token !== null);
  useEffect(() => {
    dispatchToStore(authCheckState());
  },[dispatchToStore]);

  const routes = [
    <Route key="auth" path="/auth" render={() =><Suspense fallback={<Spinner/>}><Auth/></Suspense>}/>,
    <Route key="root" path="/" component={BurgerBuilder} />,
    <Redirect key="redirectUnknown" to="/" />
  ];
  if (isAuth) {
    const authRoutes = [
      <Route key="checkout" path="/checkout" render={() =><Suspense fallback={<Spinner/>}><Checkout/></Suspense>}/>,
      <Route key="orders" path="/orders" render={() =><Suspense fallback={<Spinner/>}><Orders/></Suspense>}/>,
      <Route key="logout" path="/logout" render={() =><Suspense fallback={<Spinner/>}><Logout/></Suspense>}/>
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
