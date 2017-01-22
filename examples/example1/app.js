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
  setCartCurrency,
} from '../../src/actions';
import {
  getDefaultLocalization,
} from '../../src/localization';
import store from './store';

const productLocalization = {
  colour: 'Colour',
  red: 'Red',
  green: 'Green',
  ipadTabletCase: 'iPad / Tablet case',
  GBP: '£',
  EUR: '€',
  USD: '$',
};

export default class App extends Component {

  getProductLocalization =
    getDefaultLocalization(
      'product',
      'en',
      productLocalization,
    );

  getCartLocalization =
    getDefaultLocalization(
      'cart',
      'en',
      productLocalization,
    );

  getCheckoutButtonLocalization =
    getDefaultLocalization(
      'checkoutButton',
      'en',
      productLocalization,
    );

  changeCurrency = currency =>
    void store.dispatch(
      setCartCurrency(
        currency,
      ),
    );

  render() {
    const {
      getProductLocalization,
      getCartLocalization,
      getCheckoutButtonLocalization,
      changeCurrency,
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
        <div className="container">
          <Product
            id="ipad-case"
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
              EUR: 60,
              USD: 70,
            }}
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
          <button
            className="btn btn-primary"
            onClick={() => changeCurrency('GBP')}
          >
            GBP
          </button>
          <button
            className="btn btn-primary"
            onClick={() => changeCurrency('EUR')}
          >
            EUR
          </button>
          <button
            className="btn btn-primary"
            onClick={() => changeCurrency('USD')}
          >
            USD
          </button>
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
