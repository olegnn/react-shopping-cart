/*
 * CheckoutButton tests for JEST
 *
 * Copyright © Oleg Nosov 2016-Present
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import IntlMessageFormat from 'intl-messageformat';
import CheckoutButton
  from '../src/components/CheckoutButton/CheckoutButton';

const testCheckoutButtonLocalization = {
  checkoutTotal:
    'Checkout (Grand total {localizedCurrency}{total, plural, ' +
    '=0 {0}' +
    'other {#}})',
  GBP: '£',
};

const getLocalization = (id, params = {}) =>
  new IntlMessageFormat(
    testCheckoutButtonLocalization[id], 'en',
  ).format(params);

describe('CheckoutButton', () => {
  it('takes snapshot', () => {
    const renderedCheckoutButton = renderer.create(
      <CheckoutButton
        getLocalization={
          getLocalization
        }
        grandTotal={100}
        hidden={false}
        checkoutURL="/to/checkout/"
        currency="GBP"
      />,
    );
    expect(renderedCheckoutButton.toJSON()).toMatchSnapshot();
  });
});
