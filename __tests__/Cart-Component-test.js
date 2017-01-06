/*
 * Cart tests for JEST
 *
 * Copyright © Oleg Nosov 2016
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import { Cart } from '../src/components';

const createCart = ({ products }) =>
  mount(
    <Cart
      products={products}
      onUpdateProduct={
        (key, updateProps) =>
          void (products[key] = { ...products[key], ...updateProps })
      }
      onRemoveProduct={
        key => void delete products[key]
      }
      CheckoutButton={
        <a />
      }
      isCartEmpty={
        false
      }
    />);


describe('Cart', () => {
  const iPadCaseInCart = {
    id: 'shop/ipad-case/',
    properties: {
      colour: 'red',
    },
    quantity: 1,
    productInfo: {
      name: 'iPad / Tablet case',
      price: 70,
      imagePath: 'shop/ipad-case/1-483x321.jpeg',
      currency: '£',
    },
  };

  it('changes product quantity value', () => {
    // Create a cart with 1 red iPad case in
    const products = { 'shop/ipad-case/_red': iPadCaseInCart };

    const renderedCart = createCart({ products });

    // Change iPad cases quantity to 10
    renderedCart.find('input').simulate('change', { target: { value: 10 } });

    // Now must have 10 cases in cart
    expect(products['shop/ipad-case/_red'].quantity).toBe(10);

    // Change iPad cases quantity to -1
    renderedCart.find('input').simulate('change', { target: { value: -1 } });

    // Expect 10 iPad cases in cart
    expect(products['shop/ipad-case/_red'].quantity).toBe(10);

    // Remove our cases from cart
    renderedCart.find('button').simulate('click');

    // Now cart must be empty
    expect(Object.keys(products).length).toBe(0);
  });

  it('takes snapshot', () => {
    const products = { 'shop/ipad-case/_red': iPadCaseInCart };
    const renderedCart = createCart({ products });
    expect(renderedCart.html()).toMatchSnapshot();
  });
});
