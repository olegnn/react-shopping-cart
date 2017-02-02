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

const initialState = {};

const productActions = {
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
            +Number.isSafeInteger(newQuantity)
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
        updateProperties,
      } : CartUpdateActionType,
    ) : ProductsMapType => ({
      ...products,
      [key]: {
        ...products[key],
        ...updateProperties,
      },
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
  productActions[action.type]
  ? productActions[action.type](state, action)
  : state;
