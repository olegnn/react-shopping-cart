/**
 * @flow
 * @module CartContainer
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * Redux container for Cart
 */

import type {
  Dispatch,
} from 'redux';

import React from 'react';
import { connect } from 'react-redux';

import type {
  CartState,
  CartAction,
  ProductData,
} from '../types';

import { updateCart, removeFromCart } from '../actions';
import Cart from '../components/Cart/Cart';
import CheckoutButton from '../containers/CheckoutButton';
import { configure } from '../helpers';
import { getDefaultLocalization } from '../localization';
import {
  productsSelector,
  currencySelector,
  isCartEmptySelector,
} from '../selectors';

const mapStateToProps = (state: CartState) => ({
  products: productsSelector(state),
  isCartEmpty: isCartEmptySelector(state),
  currency: currencySelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch<CartAction>) => ({
  onUpdateProduct: (key: string, updatedProduct: ProductData) =>
    void dispatch(updateCart(key, updatedProduct)),
  onRemoveProduct: (key: string) =>
    void dispatch(removeFromCart(key)),
});

export default (
  connect(mapStateToProps, mapDispatchToProps)(
    configure(Cart,
      {
        checkoutButton: <CheckoutButton />,
        getLocalization: getDefaultLocalization('cart'),
      },
    ),
  )
);
