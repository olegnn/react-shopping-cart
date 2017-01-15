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
import { Cart } from '../components';
import CheckoutButton from '../containers/CheckoutButton';
import { configure } from '../helpers';
import { getDefaultLocalization } from '../localization';
import { isCartEmptySelector } from '../selectors';

const mapStateToProps = (
  state,
) : Object => ({
  products: state.cart.products,
  isCartEmpty: isCartEmptySelector(state),
  currency: state.cart.currency,
});

const mapDispatchToProps = (dispatch : Function) : Object => ({
  onUpdateProduct: (key : string, updateProperties : Object = {}) =>
    void dispatch(updateCart(key, updateProperties)),
  onRemoveProduct: (key : string) =>
    void dispatch(removeFromCart(key)),
});

export default(
  connect(mapStateToProps, mapDispatchToProps)(
    configure(Cart,
      {
        CheckoutButton: <CheckoutButton />,
        getLocalization: getDefaultLocalization('cart'),
      },
    ),
  )
);
