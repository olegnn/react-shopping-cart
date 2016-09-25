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
import { addToCart } from '../actions';
import Product from '../components/Product';
import CheckoutButton from '../containers/CheckoutButton';
import { configure } from '../helpers';

const mapDispatchToProps = (dispatch : Function) : Object => ({
  onAddProduct: (id : string, props : Object) => {
    dispatch(addToCart(id, props));
  },
});

export default(
  connect(null, mapDispatchToProps)(
    configure(Product, { CheckoutButton: <CheckoutButton /> })
  )
);
