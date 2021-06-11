import './App.css';
import HomePage from './containers/HomePage/index.js';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import ProductListPage from './containers/ProductListPage';
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn} from "./actions";
import { useEffect } from 'react';
import ProductDetails from './containers/ProductDetails';
import CartPage from './containers/CartPage';
import { updateCart } from './actions/cart';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(()=>{
    dispatch(updateCart());
  },[auth.authenticate]);

  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/cart" component={CartPage} />
            <Route path="/:productSlug/:productId/p" component={ProductDetails} />
            <Route path="/:slug" component={ProductListPage} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
