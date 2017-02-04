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
import * as actionTypes from './actionTypes';

/**
 * @memberof actions
 */
export const addToCart = (
  key : string,
  product : ProductType,
  productCurrency : string,
) : CartAddActionType =>
  ({
    type: actionTypes.CART_ADD,
    key,
    product,
    productCurrency,
  });

/**
 * @memberof actions
 */
export const removeFromCart = (
  key : string,
) : CartRemoveActionType =>
  ({
    type: actionTypes.CART_REMOVE,
    key,
  });

/**
 * @memberof actions
 */
export const updateCart = (
  key : string,
  updatedProduct : ProductType,
) : CartUpdateActionType =>
  ({
    type: actionTypes.CART_UPDATE,
    key,
    updatedProduct,
  });

/**
 * @memberof actions
 */
export const emptyCart = () : CartEmptyActionType =>
  ({
    type: actionTypes.CART_EMPTY,
  });

/**
 * @memberof actions
 */
export const setCartCurrency = (
  currency: string,
) : CartSetCurrencyActionType =>
  ({
    type: actionTypes.CART_SET_CURRENCY,
    currency,
  });
