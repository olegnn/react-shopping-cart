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
import { getProductKey } from '../../helpers';
import * as actionTypes from '../../actionTypes';

const initialState = {};

const productActions = {
  [actionTypes.CART_ADD]:
    (
      products : ProductsMapType,
      {
        id,
        quantity,
        properties,
        productInfo,
      } : CartAddActionType,
    ) : ProductsMapType => {
      const productKey = getProductKey(id, properties);
      const { [productKey]: product, ...restOfProducts } = products;

      return {
        [productKey]: {
          id,
          quantity:
            quantity + (
              !!product && product.quantity
            ),
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
      { [key]: _, ...restOfProducts },
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
