/*
 * Product tests for JEST
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
import Product from '../src/components/Product/Product';
import { generateProductKey } from '../src/helpers';

Enzyme.configure({ adapter: new Adapter(), });

const testProductLocalization = {
  color: 'Color',
  iPadCase: 'iPad case',
  red: 'Red',
  green: 'Green',
  price: 'Price: {localizedCurrency}{price}',
  GBP: '£',
  quantityLabel: 'Quantity:',
  propertyLabel: '{localizedName}:',
  addToCart: 'Add to my cart :)',
};

const getLocalization = (id, params = {}) =>
  new IntlMessageFormat(testProductLocalization[id], 'en').format(params);

const createProduct = ({ cartState, props, }, renderFunc = mount) =>
  renderFunc(<Product
    {...props}
    onAddProduct={
      (
          key,
          product,
      ) => {
          cartState[key] = product;
      }
    }
    checkoutButton={<a />}
    getLocalization={
        getLocalization
      }
    currency="GBP"
    generateProductKey={generateProductKey}
  />);


describe('Product', () => {
  const iPadCaseProps = {
    name: 'ipadCase',
    id: 'ipad-case',
    path: '/shop/ipad-case/',
    properties: {
      color: [ 'red', 'green', ],
    },
    propertiesToShowInCart: [ 'color', ],
    prices: { GBP: 70, },
    currency: 'GBP',
    imageSrc: '1-483x321.jpeg',
  };

  it('adds products to cart', () => {
    // Create empty cart
    const cartState = {};

    // Current product is ipad case (see props above)
    const renderedProduct = createProduct({ cartState, props: iPadCaseProps, });

    const productKey = generateProductKey(
      iPadCaseProps.id,
      { color: 'red', },
    );

    const simulateAddProductEvent =
      () => renderedProduct.find('form').simulate('submit');

    simulateAddProductEvent();

    // Our product is in cart already
    expect(cartState[productKey].quantity).toBe(1);

    const quantityInput = renderedProduct.find('input');

    // Try to change quantity to -1
    quantityInput.instance().value = -1;

    renderedProduct.find('input').simulate('change');

    expect(renderedProduct.update().state().quantity).toBe(1);

    const colorSelect =
      renderedProduct
        .find('select');

    // Now add green case in our cart
    colorSelect.instance().value = 'green';

    renderedProduct
      .find('select')
      .simulate('change');

    simulateAddProductEvent();

    // Have two products in cart
    expect(Object.keys(cartState).length).toBe(2);
  });

  it('takes snapshot', () => {
    const renderedProduct = createProduct(
      { props: iPadCaseProps, },
      renderer.create,
    );
    expect(renderedProduct.toJSON()).toMatchSnapshot();
  });
});
