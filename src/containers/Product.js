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
import React from 'react';
import { connect } from 'react-redux';

import { Product } from '../components';
import CheckoutButton from '../containers/CheckoutButton';
import { addToCart } from '../actions';
import { configure, generateProductKey } from '../helpers';
import { getDefaultLocalization } from '../localization';

const mapStateToProps = (state : Object) : Object => ({
  currency: state.cart.currency,
});

const mapDispatchToProps = (dispatch : Function) : Object => ({
  onAddProduct: (key : string, product : Object, productCurrency: string) =>
    void dispatch(addToCart(key, product, productCurrency)),
});

export default(
  connect(mapStateToProps, mapDispatchToProps)(
    configure(Product, {
      checkoutButton: <CheckoutButton />,
      getLocalization: getDefaultLocalization('product'),
      generateProductKey,
    }),
  )
);
