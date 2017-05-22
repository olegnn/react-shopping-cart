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

import type {
  Products,
  CartState,
} from '../types';

/**
 * @memberof selectors
 */
export const productsSelector = (
  {
    cart: { products }
  }: CartState
): Products => products;

/**
 * @memberof selectors
 */
export const currencySelector = (
  {
    cart: { currency }
  }: CartState
): string => currency;

/**
 * @memberof selectors
 * @description
 * Calculate total products' cost
 */
export const totalSelector = createSelector(
  productsSelector,
  currencySelector,
  (products: Products, currency: string): number =>
    Object
      .values(products)
      .map(
        (
          { quantity, prices: { [currency]: price } },
        ) => quantity * price,
      )
      .reduce(
        (total: number, current: number) => total + current, 0
      ),
);

/**
 * @memberof selectors
 */
export const isCartEmptySelector = createSelector(
  productsSelector,
  (products: Products): boolean =>
    !Object
      .keys(products)
      .length,
);
