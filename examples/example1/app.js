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

const productPropertiesWithAdditionalCostLocalization = {
  purple: 'Purple (+{cost}{localizedCurrency})',
  yellow: 'Yellow (+{cost}{localizedCurrency})',
};

const productLocalization = {
  colour: 'Colour',
  additionalColour: 'Additional colour',
  red: 'Red',
  green: 'Green',
  purple: 'Purple',
  yellow: 'Yellow',
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
      {
        ...productLocalization,
        ...productPropertiesWithAdditionalCostLocalization,
      },
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

    const imagePath = 'https://www.solarleague.org/'+
                      'shop/macbook-case/1-483x321.jpeg';
    return (
      <Provider store={store}>
        <div className="container">
          <Product
            id="ipad-case"
            getLocalization={
              getProductLocalization
            }
            properties={{
              colour: ['red', 'green', {
                additionalCost: {
                  GBP: 10,
                  EUR: 15,
                  USD: 20,
                },
                value: 'purple',
              }],
              additionalColour: ['red', 'green', {
                additionalCost: {
                  GBP: 1,
                  EUR: 2,
                  USD: 3.50,
                },
                value: 'yellow',
              }],
            }}
            propertiesToShowInCart={
              ['colour', 'additionalColour']
            }
            name="ipadTabletCase"
            prices={{
              GBP: 50,
              EUR: 60,
              USD: 70,
            }}
            checkoutButton={
              checkoutButton
            }

            path="/shop/ipad-case/"
            imagePath={imagePath}
            afterPriceNode={
              <div className="row justify-content-center pb-3">
                <div className="col-4 text-center">
                  <button
                    role="button"
                    key={0}
                    className="btn btn-warning btn-block active"
                    onClick={() => changeCurrency('GBP')}
                  >
                    GBP
                  </button>
                </div>
                <div className="col-4 text-center">
                  <button
                    role="button"
                    key={1}
                    className="btn btn-warning btn-block active"
                    onClick={() => changeCurrency('EUR')}
                  >
                    EUR
                  </button>
                </div>
                <div className="col-4 text-center">
                  <button
                    role="button"
                    key={2}
                    className="btn btn-warning btn-block active"
                    onClick={() => changeCurrency('USD')}
                  >
                    USD
                  </button>
                </div>
              </div>
            }
          />
          <Cart
            getLocalization={
              getCartLocalization
            }
            checkoutButton={
              checkoutButton
            }
          />
        </div>
      </Provider>
    );
  }
}

window.onload = () => {
  const mainDiv = document.createElement('div');

  document.body.appendChild(mainDiv);

  ReactDOM.render(
    <App />,
    mainDiv,
  );
};
