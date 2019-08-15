# React shopping cart

[![npm](https://img.shields.io/npm/v/react-shopping-cart.svg)](https://www.npmjs.com/package/react-shopping-cart)
[![Build Status](https://travis-ci.org/olegnn/react-shopping-cart.svg?branch=master)](https://travis-ci.org/olegnn/react-shopping-cart)
[![npm](https://img.shields.io/npm/dm/react-shopping-cart.svg)](https://www.npmjs.com/package/react-shopping-cart)
[![peerDependencies Status](https://david-dm.org/olegnn/react-shopping-cart/peer-status.svg)](https://david-dm.org/olegnn/react-shopping-cart?type=peer)
[![dependencies](https://david-dm.org/olegnn/react-shopping-cart.svg)](https://david-dm.org/olegnn/react-shopping-cart)
[![devDependencies Status](https://david-dm.org/olegnn/react-shopping-cart/dev-status.svg)](https://david-dm.org/olegnn/react-shopping-cart?type=dev)

Shopping cart package provides several components:

- [**Cart**](#cart)
- [**Product**](#product)
- [**CheckoutButton**](#checkoutbutton)

which can be used separately or in union.
By default [**Redux**](https://github.com/reactjs/redux) is the framework to operate with data.

So, it's your choice to use Redux or not, but its reducers, actions and action types are already included.

Pay attention! All components are [**Pure**](https://facebook.github.io/react/docs/react-api.html#react.purecomponent).

**Meta**

- **author**: Oleg Nosov &lt;olegnosov1@gmail.com>
- **license**: MIT

## Demo

[`Latest version demo (example1)`](https://olegnn.github.io/react-shopping-cart)

**Usage**

```shell
yarn add react-shopping-cart
```

```shell
npm i --save react-shopping-cart
```

**Examples**

In all cases you must include bootstrap version 4 (^alpha 0.6) in your project

```javascript
import "bootstrap/dist/css/bootstrap.css";
```

And if you want to see animation, also include animate.css

```javascript
import "animate.css/animate.min.css";
```

Also want some icons?

```javascript
import "font-awesome/css/font-awesome.min.css";
```

**With Redux.** After store initialization you must dispatch setCartCurrency action or 'USD' will be used as cart's currency.

```javascript
import React, { PureComponent } from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import {
  Cart,
  Product,
  CheckoutButton,
  cartLocalization,
  cartReducer,
  setCartCurrency
} from "react-shopping-cart";

import "bootstrap/dist/css/bootstrap.css";
import "animate.css/animate.min.css";
import "font-awesome/css/font-awesome.min.css";

const { getDefaultLocalization } = cartLocalization;

// You may take localization object from wherever you want, that's just an example
// For more information, see localization section
const iPadCaseLocalization = {
  color: "Color",
  iPadCase: "iPad case",
  red: "Red",
  green: "Green",
  yellow: "Yellow",
  GBP: "£",
  EUR: "€",
  USD: "$"
};

const iPadPropertiesWithAdditionalCostLocalization = {
  yellow: "Yellow (+{cost}{localizedCurrency})"
};

const store = createStore(
  combineReducers({
    cart: cartReducer
    // Your own reducers, sir
  })
);

store.dispatch(setCartCurrency("USD"));

class App extends PureComponent {
  state = {
    product: {
      name: "iPadCase",
      id: "ipad-case",
      path: "/shop/ipad-case/",
      properties: {
        color: [
          "red",
          "green",
          {
            additionalCost: {
              GBP: 1,
              EUR: 2,
              USD: 3.5
            },
            value: "yellow"
          }
        ]
      },
      propertiesToShowInCart: ["color"],
      prices: { GBP: 70, EUR: 80, USD: 90 },
      currency: "GBP",
      imageSrc: "1-483x321.jpeg"
    },
    getProductLocalization: getDefaultLocalization("product", "en", {
      ...iPadCaseLocalization,
      ...iPadPropertiesWithAdditionalCostLocalization
    }),
    getCheckoutButtonLocalization: getDefaultLocalization(
      "checkoutButton",
      "en",
      iPadCaseLocalization
    ),
    getCartLocalization: getDefaultLocalization(
      "cart",
      "en",
      iPadCaseLocalization
    )
  };

  render() {
    const {
      product,
      getCheckoutButtonLocalization,
      getProductLocalization,
      getCartLocalization
    } = this.state;

    const checkoutButtonElement = (
      <CheckoutButton
        getLocalization={getCheckoutButtonLocalization}
        checkoutURL="/to/my/checkout"
      />
    );
    return (
      <Provider store={store}>
        <div className="container">
          <Product
            {...product}
            checkoutButton={checkoutButtonElement}
            getLocalization={getProductLocalization}
          />
          <Cart
            checkoutButton={checkoutButtonElement}
            getLocalization={getCartLocalization}
          />
        </div>
      </Provider>
    );
  }
}

export default App;
```

```javascript
// You may also import actions and actionTypes

import { cartActions, cartActionTypes } from "react-shopping-cart";

// And do some cool things with them
```

**Without redux**

```javascript
import React, { PureComponent } from "react";
import {
  CartComponent,
  ProductComponent,
  CheckoutButtonComponent,
  cartLocalization
} from "react-shopping-cart";

import "bootstrap/dist/css/bootstrap.css";
import "animate.css/animate.min.css";
import "font-awesome/css/font-awesome.min.css";

const { getDefaultLocalization } = cartLocalization;

// You may take localization object from wherever you want, that's just an example
// For more information, see localization section
const iPadCaseLocalization = {
  color: "Color",
  iPadCase: "iPad case",
  red: "Red",
  green: "Green",
  yellow: "Yellow",
  GBP: "£",
  EUR: "€",
  USD: "$"
};

const iPadPropertiesWithAdditionalCostLocalization = {
  yellow: "Yellow (+{cost}{localizedCurrency})"
};

class App extends PureComponent {
  state = {
    products: {},
    product: {
      name: "iPadCase",
      id: "ipad-case",
      path: "/shop/ipad-case/",
      properties: {
        color: [
          "red",
          "green",
          {
            additionalCost: {
              GBP: 1,
              EUR: 2,
              USD: 3.5
            },
            value: "yellow"
          }
        ]
      },
      propertiesToShowInCart: ["color"],
      prices: { GBP: 70, EUR: 80, USD: 90 },
      currency: "GBP",
      imageSrc: "1-483x321.jpeg"
    },
    getProductLocalization: getDefaultLocalization("product", "en", {
      ...iPadCaseLocalization,
      ...iPadPropertiesWithAdditionalCostLocalization
    }),
    getCheckoutButtonLocalization: getDefaultLocalization(
      "checkoutButton",
      "en",
      iPadCaseLocalization
    ),
    getCartLocalization: getDefaultLocalization(
      "cart",
      "en",
      iPadCaseLocalization
    )
  };

  addProduct = (key, product, currency) =>
    void this.setState(
      ({
        products: { [key]: cartProduct = { quantity: 0 }, ...restOfProducts }
      }) => ({
        products: {
          ...restOfProducts,
          [key]: {
            ...product,
            quantity: product.quantity + cartProduct.quantity
          }
        }
      })
    );

  generateProductKey = (id, properties) =>
    `${id}/${Object.entries(properties).join("_")}`;

  updateProduct = (key, updatedProduct) => void console.log(":)");

  removeProduct = key => void console.log(":C");

  render() {
    const {
      addProduct,
      generateProductKey,
      updateProduct,
      removeProduct,
      state
    } = this;

    const {
      getProductLocalization,
      getCheckoutButtonLocalization,
      getCartLocalization,
      products,
      product
    } = state;

    const checkoutButtonElement = (
      <CheckoutButtonComponent
        grandTotal={500}
        hidden={false}
        checkoutURL="/to/my/checkout"
        currency="GBP"
        getLocalization={getCheckoutButtonLocalization}
      />
    );
    return (
      <div className="container">
        <ProductComponent
          {...product}
          checkoutButton={checkoutButtonElement}
          onAddProduct={
            addProduct
            // Help product to get into the cart
          }
          generateProductKey={
            generateProductKey
            // create product key as you wish
          }
          getLocalization={getProductLocalization}
        />

        <CartComponent
          products={
            products
            // Provide your own product's Object(Look at Products)
          }
          onUpdateProduct={
            updateProduct
            // Update something
          }
          getLocalization={getCartLocalization}
          currency="GBP"
          onRemoveProduct={
            removeProduct
            // Remove something
          }
          checkoutButton={checkoutButtonElement}
          isCartEmpty={false}
          getLocalization={getCartLocalization}
        />
      </div>
    );
  }
}

export default App;
```
