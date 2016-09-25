/**
 * @flow
 * @module CheckoutButton
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * React stateless component.
 * Checkout button with grand total.
 *
 */
import React, { Component, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import Transition from 'react-overlays/lib/Transition';

import { animate } from '../helpers';

const
/**
  * @static propTypes
  * @memberof CheckoutButton
  *
  * @prop {string} checkoutURL - Link to checkout page.
  * Default is '/shop/checkout/'
  * @prop {string} iconCheckoutClassName - ClassName for cart icon on checkout button.
  * Default is 'icon-basket'
  */
  propTypes = {
    checkoutURL: PropTypes.string,
    iconCheckoutClassName: PropTypes.string,
  },
/**
  * @static containerPropTypes
  * @memberof CheckoutButton
  *
  * @prop {number} grandTotal - Amount of money to pay. Required
  * @prop {boolean} hidden - Show or hide button. Required
  */
  containerPropTypes = {
    grandTotal: PropTypes.number.isRequired,
    hidden: PropTypes.bool.isRequired,
  },
  defaultProps = {
    checkoutURL: '/shop/checkout/',
    iconCheckoutClassName: 'icon-basket',
  };

function CheckoutButton (
  { grandTotal, hidden, checkoutURL, iconCheckoutClassName } : Object
) : React$Element<any> {
  return (
    <Transition
      style={ animate(500) }
      in={ !hidden }
      enteringClassName="fadeInUp"
      exitingClassName="fadeOut"
      timeout={ 500 }
      unmountOnExit
    >
      <Link to={ checkoutURL } className="btn btn-primary btn-block">
        <i className={ iconCheckoutClassName } />
        Checkout (Grand total £{ grandTotal.toFixed(2) })
      </Link>
    </Transition>
  );
}

CheckoutButton.propTypes = { ...propTypes, ...containerPropTypes };
CheckoutButton.defaultProps = defaultProps;

export default CheckoutButton;
