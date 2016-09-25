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
import React from 'react';
import { connect } from 'react-redux';
import { updateCart, removeFromCart } from '../actions';
import Cart from '../components/Cart';
import CheckoutButton from '../containers/CheckoutButton';
import { configure } from '../helpers';

const mapStateToProps = (
  { cart: { products, total } } : { cart : CartType, }
) : { products : ProductsMapType, } => ({
  products,
  isCartEmpty: !total,
});

const mapDispatchToProps = (dispatch : Function) : Object => ({
  onUpdateProduct: (key : string, updateProps : Object) => {
    dispatch(updateCart(key, updateProps));
  },
  onRemoveProduct: (key : string) => {
    dispatch(removeFromCart(key));
  },
});

export default(
  connect(mapStateToProps, mapDispatchToProps)(
    configure(Cart, { CheckoutButton: <CheckoutButton /> })
  )
);
