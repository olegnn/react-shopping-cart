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
 * @memberof helpers
 */
export function addToCart(id : string, props : Object) : Object {
  return {
    type: actionTypes.CART_ADD,
    id,
    ...props,
  };
}

/**
 * @memberof helpers
 */
export function removeFromCart(key : string) : Object {
  return {
    type: actionTypes.CART_REMOVE,
    key,
  };
}

/**
 * @memberof helpers
 */
export function updateCart(key : string, updateProps : Object) : Object {
  return {
    type: actionTypes.CART_UPDATE,
    key,
    updateProps,
  };
}

/**
 * @memberof helpers
 */
export function emptyCart() : Object {
  return {
    type: actionTypes.CART_EMPTY,
  };
}
