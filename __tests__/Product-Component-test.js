/*
 * Product tests for JEST
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
import { Product } from '../src/components';
import { generateProductKey } from '../src/helpers';

const testProductLocalization = {
  colour: 'Colour',
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
  new IntlMessageFormat(testProductLocalization[id]).format(params);

const createProduct = ({ cartState, props }, renderFunc = mount) =>
  renderFunc(
    <Product
      {...props}
      onAddProduct={
        (
          key,
          {
            id,
            quantity,
            productInfo,
            properties,
          },
        ) => void (
          cartState[key] =
            { quantity, id, productInfo, properties }
          )
      }
      CheckoutButton={<a />}
      getLocalization={
        getLocalization
      }
      currency="GBP"
      generateProductKey={generateProductKey}
    />,
  );


describe('Product', () => {
  const iPadCaseProps = {
    name: 'ipadCase',
    id: 'ipad-case',
    path: '/shop/ipad-case/',
    properties: {
      colour: ['red', 'green'],
    },
    propertiesToShowInCart: ['colour'],
    prices: { GBP: 70 },
    currency: 'GBP',
    imagePath: '1-483x321.jpeg',
  };

  it('adds products to cart', () => {
    // Create empty cart
    const cartState = {};

    // Current product is ipad case (see props above)
    const renderedProduct = createProduct({ cartState, props: iPadCaseProps });

    const productKey = generateProductKey(
      iPadCaseProps.id,
      { colour: 'red' },
    );

    const simulateAddProductEvent =
      () => renderedProduct.find('form').simulate('submit');

    simulateAddProductEvent();
    
    // Our product is in cart already
    expect(cartState[productKey].quantity).toBe(1);

    // Try to change quantity to -1
    renderedProduct.find('input').simulate('change', { target: { value: -1 } });


    expect(renderedProduct.state().quantity).toBe(1);

    // Now add green case in our cart

    renderedProduct
      .find('select')
      .simulate('change', { target: { value: 'green' } });

    simulateAddProductEvent();

    // Have two products in cart
    expect(Object.keys(cartState).length).toBe(2);
  });

  it('takes snapshot', () => {
    const renderedProduct = createProduct(
      { props: iPadCaseProps },
      renderer.create,
    );
    expect(renderedProduct.toJSON()).toMatchSnapshot();
  });
});
