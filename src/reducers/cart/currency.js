/**
 * @flow
 * @module currencyReducer
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * Currency reducer for cart
 *
 */
import * as actionTypes from '../../actionTypes';

const initialState = 'USD';

const handlers = {
  [actionTypes.CART_SET_CURRENCY]:
    (
      _,
      { currency } : CartSetCurrencyActionType,
    ) : string => currency,
};

export default (
  state : string = initialState,
  action,
) =>
  handlers[action.type]
    ? handlers[action.type](state, action)
    : state;
