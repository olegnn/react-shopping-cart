/**
 * @flow
 * @module CheckoutButtonContainer
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * Redux container for CheckoutButton
 */

import { connect } from 'react-redux';

import type {
  CartState,
} from '../types';

import CheckoutButtonComponent
  from '../components/CheckoutButton/CheckoutButton';
import { getDefaultLocalization } from '../localization';
import {
  totalSelector,
  currencySelector,
  isCartEmptySelector,
} from '../selectors';
import { configure } from '../helpers';

const mapStateToProps = (state: CartState) => ({
  grandTotal: totalSelector(state),
  hidden: isCartEmptySelector(state),
  currency: currencySelector(state),
});

export default (
  connect(mapStateToProps)(
    configure(CheckoutButtonComponent, {
      getLocalization: getDefaultLocalization('checkoutButton'),
    }),
  )
);
