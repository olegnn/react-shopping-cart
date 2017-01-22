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
  getDefaultLocalization,
} from '../../src/localization';
import store from './store';

const productLocalization = {
  colour: 'Colour',
  red: 'Red',
  green: 'Green',
  ipadTabletCase: 'iPad / Tablet case',
  GBP: '£',
  EUR: {
    props: {}, // Optional props object for component
    component: 'strong', // String or react component
    text: '€',
  },
  USD: {
    props: {}, // Optional props object for component
    component: 'h1', // String or react component
    text: '$',
  },
};

export default class App extends Component {

  static currencies = [
    'USD', 'EUR', 'GBP',
  ];

  state = {
    currencyIndex: 0,
  };

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

  changeCurrency = () =>
    void this.setState({
      currencyIndex: +(
        this.state.currencyIndex < App.currencies.length - 1
        && this.state.currencyIndex + 1
      ),
    });

  render() {
    const {
      getProductLocalization,
      getCartLocalization,
      getCheckoutButtonLocalization,
    } = this;

    const { currencies } = App;


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
            currency={currencies[currencyIndex]}
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
          <button onClick={() => changeCurrency('GBP')} />
          <button onClick={() => changeCurrency('EUR')} />
          <button onClick={() => changeCurrency('USD')} />
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
