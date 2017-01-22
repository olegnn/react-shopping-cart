import { combineReducers, createStore } from 'redux';
import cart from '../../src/reducers/cart';

/*eslint-disable*/
export default createStore(combineReducers(
  {
    cart,
  },
), window.__REDUX_DEVTOOLS_EXTENSION__
   && window.__REDUX_DEVTOOLS_EXTENSION__()
 );
