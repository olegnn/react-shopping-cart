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

const enProductPropertiesWithAdditionalCostLocalization = {
  purple: 'Purple (+{cost}{localizedCurrency})',
  yellow: 'Yellow (+{cost}{localizedCurrency})',
};

const enProductLocalization = {
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

const frProductPropertiesWithAdditionalCostLocalization = {
  purple: 'Violet (+{cost}{localizedCurrency})',
  yellow: 'Jaune (+{cost}{localizedCurrency})',
};

const frProductLocalization = {
  colour: 'Couleur',
  additionalColour: 'Couleur supplémentaire',
  red: 'Rouge',
  green: 'Vert',
  purple: 'Violet',
  yellow: 'Jaune',
  ipadTabletCase: 'iPad / Étui pour tablette',
  GBP: '£',
  EUR: '€',
  USD: '$',
};

const frDefaultLocalization = {
  cart: {
    shoppingCartTitle: {
      text: 'Le caddie',
      component: 'h4',
    },
    productName: {
      text: '{localizedName}',
      component: 'h5',
    },
    quantityLabel: 'Quantité:',
    priceLabel: 'Prix:',
    priceValue: '{localizedCurrency}{price}',
    totalLabel: 'Total:',
    totalValue: '{localizedCurrency}{total, plural, ' +
                '=0 {0}' +
                'other {#}}',
    remove: 'Supprimer',
    productPropertyLabel: '{localizedName}:',
    productPropertyValue: '{localizedValue}',
  },
  checkoutButton: {
    checkoutTotal:
      'Checkout (Somme finale {localizedCurrency}{total, plural, ' +
      '=0 {0}' +
      'other {#}})',
  },
  product: {
    price: {
      text: 'Prix: {localizedCurrency}{price}',
      component: 'strong',
    },
    quantityLabel: 'Quantité:',
    propertyLabel: '{localizedName}:',
    addToCart: 'Ajouter au caddie',
  },
};

const localization = {
  en: {
    product: {
      ...enProductLocalization,
      ...enProductPropertiesWithAdditionalCostLocalization,
    },
    cart: {
      ...enProductLocalization,
    },
    checkoutButton: {
      ...enProductLocalization,
    },
  },
  fr: {
    product: {
      ...frDefaultLocalization.product,
      ...frProductLocalization,
      ...frProductPropertiesWithAdditionalCostLocalization,
    },
    cart: {
      ...frDefaultLocalization.cart,
      ...frProductLocalization,
    },
    checkoutButton: {
      ...frDefaultLocalization.checkoutButton,
      ...frProductLocalization,
    },
  },
};

const additionalLocalization = {
  en: {
    macbookCase: 'Macbook case',
    caseForMacbookLovers: 'Case for macbook lovers',
    english: 'English',
    french: 'French',
  },
  fr: {
    macbookCase: 'Étui pour Macbook',
    caseForMacbookLovers: 'Étui pour les amateurs de Macbook',
    english: 'Anglais',
    french: 'Français',
  },
};

export default class App extends Component {

  state = {
    lang: 'en',
  };

  getLocalization = (componentName, lang = this.state.lang) =>
    getDefaultLocalization(
      componentName,
      lang,
      localization[lang][componentName],
    );

  changeCurrency = currency =>
    void store.dispatch(
      setCartCurrency(
        currency,
      ),
    );

  changeLanguage = lang =>
    void this.setState(
      { lang },
    );

  render() {
    const {
      getLocalization,
      changeCurrency,
      changeLanguage,
      state,
    } = this;

    const {
      lang,
    } = state;

    const checkoutButton = (
      <CheckoutButton
        getLocalization={
          getLocalization(
            'checkoutButton',
          )
        }
        checkoutURL="/to/checkout/"
      />
    );


    const imagePath = 'https://www.solarleague.org/'+
                      'shop/macbook-case/1-483x321.jpeg';

    const descriptionNode = (
      <div>
        <h1>
          {
            additionalLocalization[lang].macbookCase
          }
        </h1>
        <p>
          {
            additionalLocalization[lang].caseForMacbookLovers
          }
        </p>
        <img src={imagePath} />
      </div>
    );

    const afterPriceNode = (
      <div className="row justify-content-center">
        <div className="col-6 text-center">
          <button
            role="button"
            className="btn btn-success btn-block active mb-1"
            onClick={() => changeLanguage('en')}
          >
            { additionalLocalization[lang].english }
          </button>
        </div>
        <div className="col-6 text-center">
          <button
            role="button"
            className="btn btn-success btn-block active mb-1"
            onClick={() => changeLanguage('fr')}
          >
            { additionalLocalization[lang].french }
          </button>
        </div>
        <div className="col-4 text-center">
          <button
            role="button"
            className="btn btn-warning btn-block active"
            onClick={() => changeCurrency('GBP')}
          >
            GBP
          </button>
        </div>
        <div className="col-4 text-center">
          <button
            role="button"
            className="btn btn-warning btn-block active"
            onClick={() => changeCurrency('EUR')}
          >
            EUR
          </button>
        </div>
        <div className="col-4 text-center">
          <button
            role="button"
            className="btn btn-warning btn-block active"
            onClick={() => changeCurrency('USD')}
          >
            USD
          </button>
        </div>
      </div>
    );

    return (
      <Provider store={store}>
        <div className="container">
          <Product
            id="ipad-case"
            getLocalization={
              getLocalization(
                'product',
              )
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
            descriptionNode={
              descriptionNode
            }
            afterPriceNode={
              afterPriceNode
            }
          />
          <Cart
            getLocalization={
              getLocalization(
                'cart',
              )
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
