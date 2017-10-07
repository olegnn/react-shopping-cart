/**
 * @flow
 * @namespace actions
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * Redux action generators
 */

import type {
  ProductData,
  CartAddAction,
  CartUpdateAction,
  CartRemoveAction,
  CartSetCurrencyAction,
  CartEmptyAction,
} from './types';

import * as actionTypes from './actionTypes';

/**
 * @memberof actions
 */
export const addToCart = (
  key: string,
  product: ProductData,
  productCurrency: string,
): CartAddAction => ({
  type: actionTypes.CART_ADD,
  key,
  product,
  productCurrency,
});

/**
 * @memberof actions
 */
export const removeFromCart = (key: string): CartRemoveAction => ({
  type: actionTypes.CART_REMOVE,
  key,
});

/**
 * @memberof actions
 */
export const updateCart = (
  key: string,
  updatedProduct: ProductData,
): CartUpdateAction => ({
  type: actionTypes.CART_UPDATE,
  key,
  updatedProduct,
});

/**
 * @memberof actions
 */
export const emptyCart = (): CartEmptyAction => ({
  type: actionTypes.CART_EMPTY,
});

/**
 * @memberof actions
 */
export const setCartCurrency = (currency: string): CartSetCurrencyAction => ({
  type: actionTypes.CART_SET_CURRENCY,
  currency,
});
