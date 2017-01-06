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
export const addToCart = (id : string, props : Object) : Object =>
  ({
    type: actionTypes.CART_ADD,
    id,
    ...props,
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
export const updateCart = (key : string, updateProps : Object) : Object =>
  ({
    type: actionTypes.CART_UPDATE,
    key,
    updateProps,
  });

/**
 * @memberof actions
 */
export const emptyCart = () : Object =>
  ({
    type: actionTypes.CART_EMPTY,
  });
