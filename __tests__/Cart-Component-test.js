/*
 * Cart tests for JEST
 *
 * Copyright © Oleg Nosov 2016-Present
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import IntlMessageFormat from 'intl-messageformat';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Cart from '../src/components/Cart/Cart';

Enzyme.configure({ adapter: new Adapter(), });

const testCartLocalization = {
  color: 'Color',
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
  new IntlMessageFormat(testCartLocalization[id], 'en').format(params);

const createCart = ({ products, }, renderFunc = mount) =>
  renderFunc(<Cart
    products={{ ...products, }}
    onUpdateProduct={
      (key, updatedProduct) => {
          // That's just a test. Don't do like this,
          // use immutable structures
        products[key] = { ...products[key], ...updatedProduct, };
      }
    }
    onRemoveProduct={
        key => void delete products[key]
        // Don't mutate given objects, create new
    }
    checkoutButton={
      <a />
    }
    isCartEmpty={
        false
      }
    getLocalization={
        getLocalization
      }
    currency="GBP"
  />);


describe('Cart', () => {
  const iPadCaseInCart = {
    id: 'ipad-case',
    properties: {
      color: 'red',
    },
    quantity: 1,
    name: 'iPadCase',
    prices: {
      GBP: 70,
    },
    imageSrc: 'ipad-case1-483x321.jpeg',
    propertiesToShowInCart: [ 'color', ],
    path: '/shop/ipad-case',
  };

  it('changes product quantity value', () => {
    // Create a cart with 1 red iPad case in
    const products = { 'ipad-case_red': iPadCaseInCart, };

    const renderedCart = createCart({ products, });

    const quantityInput = renderedCart.find('input');

    // Change iPad case quantity to 10
    quantityInput.instance().value = 10;

    renderedCart.find('input').simulate('change');

    // Now must have 10 cases in cart
    expect(products['ipad-case_red'].quantity).toBe(10);

    quantityInput.instance().value = -1;

    renderedCart.find('input').simulate('change');

    // Expect 10 iPad cases in cart
    expect(products['ipad-case_red'].quantity).toBe(10);

    // Remove our cases from cart
    renderedCart.find('button').simulate('click');

    // Now cart must be empty
    expect(Object.keys(products).length).toBe(0);
  });

  it('takes snapshot', () => {
    const products = { 'ipad-case_red': iPadCaseInCart, };
    const renderedCart = createCart({ products, }, renderer.create);
    expect(renderedCart.toJSON()).toMatchSnapshot();
  });
});
