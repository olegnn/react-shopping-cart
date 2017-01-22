/*
 * Cart tests for JEST
 *
 * Copyright © Oleg Nosov 2016
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import IntlMessageFormat from 'intl-messageformat';
import { mount } from 'enzyme';
import { Cart } from '../src/components';

const testCartLocalization = {
  colour: 'Colour',
  iPadCase: 'iPad case',
  red: 'Red',
  shoppingCartTitle: 'My lovely shopping cart',
  productName: '{localizedName}',
  quantityLabel: 'Quantity:',
  priceLabel: 'Price:',
  priceValue: '{localizedCurrency}{price}',
  totalLabel: 'Total:',
  totalValue: '{localizedCurrency}{total, plural, ' +
              '=0 {0}' +
              'other {#}}',
  remove: 'Remove',
  productPropertyLabel: '{localizedName}:',
  productPropertyValue: '{localizedValue}',
  GBP: '£',
};

const getLocalization = (id, params = {}) =>
  new IntlMessageFormat(testCartLocalization[id]).format(params);

const createCart = ({ products }, renderFunc = mount) =>
  renderFunc(
    <Cart
      products={{ ...products }}
      onUpdateProduct={
        (key, updateProperties) =>
          // That's just a test. Don't do like this,
          // use immutable structures, please :C
          void (products[key] = { ...products[key], ...updateProperties })
      }
      onRemoveProduct={
        key => void delete products[key]
        // Don't mutate given objects, create new
      }
      CheckoutButton={
        <a />
      }
      isCartEmpty={
        false
      }
      getLocalization={
        getLocalization
      }
      currency="GBP"
    />,
  );


describe('Cart', () => {
  const iPadCaseInCart = {
    id: 'ipad-case',
    properties: {
      colour: 'red',
    },
    quantity: 1,
    productInfo: {
      name: 'iPadCase',
      prices: {
        GBP: 70,
      },
      imagePath: 'ipad-case1-483x321.jpeg',
      propertiesToShowInCart: ['colour'],
      path: '/shop/ipad-case',
    },
  };

  it('changes product quantity value', () => {
    // Create a cart with 1 red iPad case in
    const products = { 'ipad-case_red': iPadCaseInCart };

    const renderedCart = createCart({ products });

    // Change iPad cases quantity to 10
    renderedCart.find('input').simulate('change', { target: { value: 10 } });

    // Now must have 10 cases in cart
    expect(products['ipad-case_red'].quantity).toBe(10);

    // Change iPad cases quantity to -1
    renderedCart.find('input').simulate('change', { target: { value: -1 } });

    // Expect 10 iPad cases in cart
    expect(products['ipad-case_red'].quantity).toBe(10);

    // Remove our cases from cart
    renderedCart.find('button').simulate('click');

    // Now cart must be empty
    expect(Object.keys(products).length).toBe(0);
  });

  it('takes snapshot', () => {
    const products = { 'ipad-case_red': iPadCaseInCart };
    const renderedCart = createCart({ products }, renderer.create);
    expect(renderedCart.toJSON()).toMatchSnapshot();
  });
});
