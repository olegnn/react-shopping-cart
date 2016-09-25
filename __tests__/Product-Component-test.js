/*
 * Product tests for JEST
 *
 * Copyright © Oleg Nosov 2016
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import Product from '../src/components/Product';

const createProduct = ({ cartState, props }) =>
  mount(
    <Product
      { ...props }
      onAddProduct={
        (id, { quantity, productInfo, properties }) => { cartState[id + Object.values(properties).join('_')] = { quantity, id, ...productInfo, properties }; }
      }
      CheckoutButton={ <a /> }
    />);


describe('Product', () => {
  const iPadCaseInCart = {
    id: '/shop/ipad-case/',
    properties: {
      colour: 'red',
    },
    quantity: 1,
    productInfo: {
      name: 'iPad / Tablet case',
      price: 70,
      imagePath: '/shop/ipad-case/1-483x321.jpeg',
      currency: '£',
    },
  };

  const iPadCaseProps = {
    options: {
      colour: ['red', 'green'],
    },
    name: 'iPad / Tablet case',
    price: 70,
    path: '/shop/ipad-case/',
    imagePath: '1-483x321.jpeg',
  };

  it('adds products to cart', () => {
    // Create empty cart
    const cartState = {};

    // Current product is ipad case (see props above)
    const renderedProduct = createProduct({ cartState, props: iPadCaseProps });

    const simulateAddProductEvent = () => renderedProduct.find('form').simulate('submit');

    simulateAddProductEvent();


    // Our product is in cart already
    expect(cartState['/shop/ipad-case/red'].quantity).toBe(1);

    // Try to change quantity to -1
    renderedProduct.find('input').simulate('change', { target: { value: -1 } });


    expect(renderedProduct.state().quantity).toBe(1);

    // Now add green case in our cart

    renderedProduct.find('select').simulate('change', { target: { value: 'green' } });

    simulateAddProductEvent();

    // Have two products in cart
    expect(Object.keys(cartState).length).toBe(2);
  });

  it('takes snapshot', () => {
    const cartState = {};
    const renderedProduct = createProduct({ cartState, props: iPadCaseProps });
    expect(renderedProduct.html()).toMatchSnapshot();
  });
});
