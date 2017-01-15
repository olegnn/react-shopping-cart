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
import { CheckoutButton } from '../components';
import { getDefaultLocalization } from '../localization';
import { totalSelector, isCartEmptySelector } from '../selectors';
import { configure } from '../helpers';

const mapStateToProps = (
  state,
) : Object => ({
  grandTotal: totalSelector(state),
  hidden: isCartEmptySelector(state),
  currency: state.cart.currency,
});

export default (
  connect(mapStateToProps)(
    configure(CheckoutButton, {
      getLocalization: getDefaultLocalization('checkoutButton'),
    }),
  )
);
