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
) : Object =>
  ({
    type: actionTypes.CART_ADD,
    key,
    product,
    productCurrency,
  });

/**
 * @memberof actions
 */
export const removeFromCart = (key : string) : Object =>
  ({
    type: actionTypes.CART_REMOVE,
    key,
  });

/**
 * @memberof actions
 */
export const updateCart = (key : string, updateProperties : Object) : Object =>
  ({
    type: actionTypes.CART_UPDATE,
    key,
    updateProperties,
  });

/**
 * @memberof actions
 */
export const emptyCart = () : Object =>
  ({
    type: actionTypes.CART_EMPTY,
  });

/**
 * @memberof actions
 */
export const setCartCurrency = (currency: string) : Object =>
  ({
    type: actionTypes.CART_SET_CURRENCY,
    currency,
  });
