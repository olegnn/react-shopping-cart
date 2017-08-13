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

import type { CartSetCurrencyAction } from '../../types';

import * as actionTypes from '../../actionTypes';

const initialState = 'USD';

const handlers = {
  [actionTypes.CART_SET_CURRENCY]:
  (
    _: string,
    { currency, }: CartSetCurrencyAction,
  ): string => currency,
};

Object.setPrototypeOf(handlers, null);

/**
 * @function
 */
export default (
  state?: string = initialState,
  action: Object,
): string =>
  handlers[action.type]
    ? handlers[action.type](state, action)
    : state;
