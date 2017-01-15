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

const productsSelector = ({ cart: { products } }) => products;
const currencySelector = ({ cart: { currency } }) => currency;

/*
 * Generate description in format
 * product.name: product.quantity product.properties[...]
 * For Example 'MacBook case: 1; The West End: 1 nickel finish XS:31”;'
 */
export const summarySelector = createSelector(
   productsSelector,
   (products : ProductsMapType) =>
     Object
       .values(products)
       .map(
         ({ quantity, properties, productInfo: { name } }) =>
         `${`${name}:` +
         ` ${quantity}`}${
         Object
           .values(properties)
           .reduce(
             (str, propValue) =>
               str + (propValue && ` ${propValue}` || ''), '',
           )}`,
       )
       .join('; '),
 );

/*
 * Calculate total products' cost
 */
export const totalSelector = createSelector(
  productsSelector,
  currencySelector,
  (products : ProductsMapType, currency : string) =>
    Object
      .values(products)
      .map(
        (
          { quantity, productInfo: { prices } },
        ) => quantity * prices[currency],
      )
      .reduce((total : number, current : number) => total + current, 0),
);

export const isCartEmptySelector = createSelector(
  productsSelector,
  products => !Object.keys(products).length,
);
