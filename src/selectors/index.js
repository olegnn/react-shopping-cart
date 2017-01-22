/**
 * @flow
 * @namespace selectors
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * Selectors for cart
 *
 */
import { createSelector } from 'reselect';

/**
 * @memberof selectors
 * @private
 */
const productsSelector = ({ cart: { products } }) => products;

/**
 * @memberof selectors
 * @private
 */
const currencySelector = ({ cart: { currency } }) => currency;

/**
 * @memberof selectors
 * @description
 * Calculate total products' cost
 */
export const totalSelector = createSelector(
  productsSelector,
  currencySelector,
  (products : ProductsMapType, currency : string) : number =>
    Object
      .values(products)
      .map(
        (
          { quantity, productInfo: { prices: { [currency]: price } } },
        ) => quantity * price,
      )
      .reduce((total : number, current : number) => total + current, 0),
);

/**
 * @memberof selectors
 */
export const isCartEmptySelector = createSelector(
  productsSelector,
  (products : ProductsMapType) : boolean => !Object.keys(products).length,
);
