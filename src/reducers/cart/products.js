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
      { [key]: product, ...restOfProducts } : ProductsMapType,
      {
        key,
        id,
        quantity,
        properties,
        productInfo,
      } : CartAddActionType,
    ) : ProductsMapType => {
      const newQuantity =
        quantity + (
          !!product && product.quantity
        );
      return {
        [key]: {
          id,
          quantity:
            +Number.isSafeInteger(newQuantity)
            && newQuantity,
          properties,
          productInfo,
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
