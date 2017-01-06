import { combineReducers, createStore } from 'redux';
import cartReducer from '../../src/reducer';

/*eslint-disable*/
export default createStore(combineReducers(
  {
    cart: cartReducer,
  },
), window.__REDUX_DEVTOOLS_EXTENSION__
   && window.__REDUX_DEVTOOLS_EXTENSION__()
 );
