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
 * @static
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
 * @static
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
 * @static
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
 * @static
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
