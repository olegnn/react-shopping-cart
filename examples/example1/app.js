// App.js
import 'bootstrap/dist/css/bootstrap.css';
import 'animate.css/animate.min.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Product from '../../src/containers/Product';
import Cart from '../../src/containers/Cart';
import CheckoutButton from '../../src/containers/CheckoutButton';
import {
  defaultLocalization, getDefaultLocalization,
} from '../../src/localization';
import store from './store';

const productLocalization = {
  colour: 'Colour',
  red: 'Red',
  green: 'Green',
  ipadTabletCase: 'iPad / Tablet case',
  GBP: '£',
};

const localization = {
  en: {
    product: {
      ...defaultLocalization.en.product,
      ...productLocalization,
    },
    cart: {
      ...defaultLocalization.en.cart,
      ...productLocalization,
    },
    checkoutButton: {
      ...defaultLocalization.en.checkoutButton,
      ...productLocalization,
    },
  },
};

export default class App extends Component {
  getProductLocalization =
    getDefaultLocalization(
      'product',
      'en',
      localization,
    );
  getCartLocalization =
    getDefaultLocalization(
      'cart',
      'en',
      localization,
    );
  getCheckoutButtonLocalization =
    getDefaultLocalization(
      'checkoutButton',
      'en',
      localization,
    );

  render() {
    const {
      getProductLocalization,
      getCartLocalization,
      getCheckoutButtonLocalization,
    } = this;

    const checkoutButton = (
      <CheckoutButton
        getLocalization={
          getCheckoutButtonLocalization
        }
        checkoutURL="/to/checkout/"
      />
    );

    return (
      <Provider store={store}>
        <div>
          <Product
            id="macbook-case"
            getLocalization={
              getProductLocalization
            }
            properties={{
              colour: ['red', 'green'],
            }}
            propertiesToShowInCart={
              ['colour']
            }
            name="ipadTabletCase"
            prices={{
              GBP: 50,
            }}
            currency="GBP"
            CheckoutButton={
              checkoutButton
            }

            path="/shop/ipad-case/"
            imagePath="1-483x321.jpeg"
          />
          <Cart
            getLocalization={
              getCartLocalization
            }
            CheckoutButton={
              checkoutButton
            }
            productPropsToShow={['colour']}
          />
        </div>
      </Provider>
    );
  }
}


const mainDiv = document.createElement('div');

document.body.appendChild(mainDiv);

ReactDOM.render(
  <App />,
  mainDiv,
);
