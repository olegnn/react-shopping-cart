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
  macbookCase: 'Macbook case',
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
  macbookCase: 'Étui pour macbook',
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
    selectCurrency: 'Select currency',
    selectLanguage: 'Select language',
    english: 'English',
    french: 'French',
  },
  fr: {
    macbookCase: 'Étui pour Macbook',
    caseForMacbookLovers: 'Étui pour les amateurs de Macbook',
    selectCurrency: 'Choisir la devise',
    selectLanguage: 'Choisir la langue',
    english: 'Anglais',
    french: 'Français',
  },
};

export default class App extends Component {

  state = {
    lang: 'en',
    currency: 'USD',
  };

  getLocalization = (componentName, lang = this.state.lang) =>
    getDefaultLocalization(
      componentName,
      lang,
      localization[lang][componentName],
    );

  changeCurrency = currency =>
    void (store.dispatch(
      setCartCurrency(
        currency,
      ),
    ), // Because this component isn't inside Provider
       // Don't do like this
       // I was drunk, sorry :C
      this.setState({ currency })
    );

  changeLanguage = lang =>
    void this.setState(
      { lang },
    );

  handleLanguageChange = (
    { target: { value } },
  ) => void this.changeLanguage(value);

  handleCurrencyChange = (
    { target: { value } },
  ) => void this.changeCurrency(value);


  render() {
    const {
      getLocalization,
      changeCurrency,
      changeLanguage,
      handleLanguageChange,
      handleCurrencyChange,
      state,
    } = this;

    const {
      lang,
      currency,
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
        <img className="img-fluid" src={imagePath} />
      </div>
    );

    const afterPriceNode = (
      <form className="d-flex flex-row justify-content-around">
        <fieldset className="form-group text-center">
          <legend>{ additionalLocalization[lang].selectLanguage }</legend>
          {
            Object
              .entries({ en: 'english', fr: 'french' })
              .map(
                ([short, full]) => (
                  <div key={full} className="form-check">
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        onChange={handleLanguageChange}
                        value={short}
                        checked={lang === short}
                      />
                      { ` ${additionalLocalization[lang][full]}` }
                    </label>
                  </div>
                ),
            )
          }
        </fieldset>
        <fieldset className="form-group text-center">
          <legend>{ additionalLocalization[lang].selectCurrency }</legend>
          {
            ['GBP', 'EUR', 'USD']
              .map(
                name => (
                  <div key={name} className="form-check">
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        onChange={handleCurrencyChange}
                        value={name}
                        checked={currency === name}
                      />
                      { ` ${name}` }
                    </label>
                  </div>
                ),
            )
          }
        </fieldset>
      </form>
    );

    return (
      <Provider store={store}>
        <div className="container">
          <Product
            id="macbook-case"
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
            name="macbookCase"
            prices={{
              GBP: 50,
              EUR: 60,
              USD: 70,
            }}
            checkoutButton={
              checkoutButton
            }

            path="/shop/macbook-case/"
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
