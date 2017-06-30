import { combineReducers, createStore } from 'redux';
import cart from '../../src/reducers/cart';
import { setCartCurrency } from '../../src/actions';

/*eslint-disable*/
const store = createStore(
  combineReducers(
    {
      cart,
    },
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.dispatch(
  setCartCurrency('USD'),
);


export default store;
