/**
 * @flow
 * @module productsReducer
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * Products reducer for cart
 *
 */

import type {
  Products,
  CartAddAction,
  CartUpdateAction,
  CartRemoveAction,
} from '../../types';

import * as actionTypes from '../../actionTypes';
import { isNaturalNumber } from '../../helpers';

const initialState: Products = {};

const handlers = {
  [actionTypes.CART_ADD]:
  (
    products: Products,
    {
      key,
      product,
    }: CartAddAction,
  ): Products => {
    const {
      [key]: cartProduct = { quantity: 0, },
      ...restOfProducts
    } = products;
    const newQuantity =
        product.quantity +
          cartProduct.quantity;
    return {
      [key]: {
        ...product,
        quantity:
            +isNaturalNumber(newQuantity)
            && newQuantity,
      },
      ...restOfProducts,
    };
  },
  [actionTypes.CART_UPDATE]:
  (
    products: Products,
    {
      key,
      updatedProduct,
    }: CartUpdateAction,
  ): Products => {
    const { ...clonedProducts } = products;
    clonedProducts[key] = updatedProduct;
    return clonedProducts;
  },
  [actionTypes.CART_REMOVE]:
  (
    products: Products,
    { key, }: CartRemoveAction,
  ): Products => {
    const { [key]: _, ...restOfProducts } = products;
    return (
      Object
        .keys(restOfProducts)
        .length
        ? restOfProducts
        : initialState
    );
  },
  [actionTypes.CART_EMPTY]:
  (): Products => initialState,
};

Object.setPrototypeOf(handlers, null);

/**
 * @function
 */
export default (
  state?: Products = initialState,
  action: Object,
): Products =>
  handlers[action.type]
    ? handlers[action.type](state, action)
    : state;
