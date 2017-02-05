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
import * as actionTypes from '../../actionTypes';
import { isNaturalNumber } from '../../helpers';

const initialState = {};

const handlers = {
  [actionTypes.CART_ADD]:
    (
      {
        [key]: cartProduct = { quantity: 0 },
        ...restOfProducts
      } : ProductsMapType,
      {
        key,
        product,
      } : CartAddActionType,
    ) : ProductsMapType => {
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
      products : ProductsMapType,
      {
        key,
        updatedProduct,
      } : CartUpdateActionType,
    ) : ProductsMapType => ({
      ...products,
      [key]: updatedProduct,
    }),
  [actionTypes.CART_REMOVE]:
    (
      { [key]: _, ...restOfProducts } : ProductsMapType,
      { key } : CartRemoveActionType,
    ) : ProductsMapType => restOfProducts,
  [actionTypes.CART_EMPTY]:
    () : ProductsMapType => initialState,
};

export default (
  state : ProductsMapType = initialState,
  action,
) =>
  handlers[action.type]
    ? handlers[action.type](state, action)
    : state;
