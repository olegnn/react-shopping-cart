/**
 * @flow
 * @module ProductContainer
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * Redux container for Product
 */

import type {
  Dispatch,
} from 'redux';

import React from 'react';
import { connect } from 'react-redux';

import type {
  CartAction,
  CartState,
  ProductData,
} from '../types';

import Product from '../components/Product/Product';
import CheckoutButton from '../containers/CheckoutButton';
import { addToCart } from '../actions';
import { currencySelector } from '../selectors';
import { configure } from '../helpers';
import { getDefaultLocalization } from '../localization';

const mapStateToProps = (state: CartState) => ({
  currency: currencySelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch<CartAction>) => ({
  onAddProduct: (
    key: string,
    product: ProductData,
    productCurrency: string,
  ) => void dispatch(
    addToCart(key, product, productCurrency),
  ),
});

export default (
  connect(mapStateToProps, mapDispatchToProps)(
    configure(Product, {
      checkoutButton: <CheckoutButton />,
      getLocalization: getDefaultLocalization('product'),
    }),
  )
);
