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

## Localization

The default localization library is [intl-messageformat](https://github.com/yahoo/intl-messageformat).
In order to localize your cart, you can chose one of the possible ways:
- Create your own __getLocalization__ function and pass it as prop to the cart's components
- Create getLocalization function with bound localization using __defaultLocalization__ object and __getLocalization__,  __getDefaultLocalization__ functions from _cartLocalization_ module, pass it as prop to the cart's components
- Don't do anything and see only default language in your cart :C

Generally, components require a function, which takes id and params(optional) and returns string, based on received arguments.

The first one should look like that if you're also using intl-messageformat:

```javascript
  import React from 'react';
  import IntlMessageFormat from 'intl-messageformat';
  import { Cart } from 'react-shopping-cart';

  const localization = {
    en: {
      cart : {
        GBP: '£',
      },
    },
  };

  const getLocalization = (localizationPart, language, id, params = {}) =>  
    new IntlMessageFormat(localizationPart[id], language).format(params);

  <Cart
    getLocalization={(...args) => getLocalization(localization.en.cart, 'en', ...args)}
  />
```
Or you could use __getDefaultLocalization__ function from _cartLocalization_:
```javascript
  import React from 'react';
  import { Cart, cartLocalization } from 'react-shopping-cart';

  const { getDefaultLocalization } = cartLocalization;

  const localization = {
    GBP: '£',
    USD: '$',
  };

  <Cart
    getLocalization={getDefaultLocalization('cart', 'en', localization)}
  />
```
Example usage of __getLocalization__ function from _cartLocalization_:
```javascript
  import React from 'react';
  import { Cart, cartLocalization } from 'react-shopping-cart';

  const { getLocalization, defaultLocalization } = cartLocalization;

  const localization = {
    en: {
      cart : {
        GBP: '£',
      },
    },
  };

  const mergedEnCartLocalization = {
    ...localization.en.cart,
    ...defaultLocalization.en.cart,
  };

  <Cart
    getLocalization={(...args) => getLocalization(mergedEnCartLocalization, 'en', ...args)}
  />
```
For built-in getLocalization function you may write your translation for default statements as a string or object in format { component : Function | string, text : string, props? : object }. Because all components are pure, in order to relocalize your components, you should pass new getLocalization function, not old with changed scope.

__Localization__ default ids and params bindings:
- __cart:__
  - _no params_
    - shoppingCartTitle

  - _{
      quantity,
      price,
      total,
      currency,
      name,
      localizedName,
      localizedCurrency,
    }_
    - productName
    - quantityLabel
    - priceLabel
    - priceValue
    - totalLabel
    - totalValue
    - remove
    - ___your currency___
    - ___your product's name___

  - _{name, value, localizedName, localizedValue,}_
    - productPropertyLabel
    - productPropertyValue
    - ___your product's property name___
    - ___your product's property value (if string of course)___

- __checkoutButton__
  - _{currency, total, localizedCurrency,}_
    - checkoutTotal
    - ___your currency___

- __product__
  - _{
      name,
      quantity,
      price,
      currency,
      localizedName,
      localizedCurrency,
    }_
    - price
    - quantityLabel
    - propertyLabel
    - addToCart
    - ___your product's name___
    - ___your product's currency___
  - _{
      name,
      currency,
      localizedName,
      localizedCurrency,
    }_
    - ___your product's name___
    - ___your product's property name___
    - _{(optional) cost}_
      - ___your product's property value (if string of course)___

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [Cart](#cart)
    -   [Props](#props)
-   [CartProduct](#cartproduct)
-   [ProductPropertyLabel](#productpropertylabel)
-   [CheckoutButton](#checkoutbutton)
    -   [Props](#props-1)
-   [Product](#product)
    -   [Props](#props-2)
-   [ProductPropertiesOptions](#productpropertiesoptions)
-   [ScrollPosition](#scrollposition)
-   [ScrollFunction](#scrollfunction)
-   [ProductPropertyInput](#productpropertyinput)
-   [OptionIndex](#optionindex)
-   [OptionObject](#optionobject)
-   [PropertyOption](#propertyoption)
-   [PropertyOptions](#propertyoptions)
-   [OnChange](#onchange)
-   [helpers](#helpers)
    -   [configure](#configure)
    -   [isNaturalNumber](#isnaturalnumber)
    -   [parseInteger](#parseinteger)
    -   [getAbsoluteOffsetTop](#getabsoluteoffsettop)
    -   [DefaultLinkComponent](#defaultlinkcomponent)
    -   [fixInputValueStartingWithZero](#fixinputvaluestartingwithzero)
    -   [scrollFunction](#scrollfunction-1)
-   [ReactStatelessComponent](#reactstatelesscomponent)
-   [ProductPropertyOption](#productpropertyoption)
-   [ProductProperties](#productproperties)
-   [Prices](#prices)
-   [ProductData](#productdata)
-   [Products](#products)
-   [GenerateProductKey](#generateproductkey)
-   [AddProduct](#addproduct)
-   [UpdateProduct](#updateproduct)
-   [RemoveProduct](#removeproduct)
-   [GetLocalization](#getlocalization)
-   [CartAddAction](#cartaddaction)
-   [CartUpdateAction](#cartupdateaction)
-   [CartRemoveAction](#cartremoveaction)
-   [CartEmptyAction](#cartemptyaction)
-   [CartSetCurrencyAction](#cartsetcurrencyaction)
-   [CartAction](#cartaction)
-   [LocalizationPattern](#localizationpattern)
-   [Localization](#localization)
-   [MultiLocalization](#multilocalization)
-   [CartState](#cartstate)
-   [DefaultLinkComponentProps](#defaultlinkcomponentprops)
-   [Link$Component](#linkcomponent)

## Cart

**Extends React.PureComponent**

Component which represents shopping cart.

**Meta**

-   **author**: Oleg Nosov &lt;olegnosov1@gmail.com>
-   **license**: MIT

### Props

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

**Properties**

-   `products` **[Products](#products)** Products map. Required.
-   `currency` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Current currency. Required.
-   `isCartEmpty` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Display cart or not. Required.
-   `onUpdateProduct` **[UpdateProduct](#updateproduct)** Function which will be called when product should be updated.
    First arg is product's key in products map, second - updated product. Required.
-   `onRemoveProduct` **[RemoveProduct](#removeproduct)** Function to call when product should be removed from cart.
    One argument - product's key. Required.
-   `getLocalization` **[GetLocalization](#getlocalization)** Required.
-   `hideHeader` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** Hide cart's header. Default is false.
-   `checkoutButton` **ReactElement?** Button to display in the bottom of cart. Default is null.
-   `iconTrashClassName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** ClassName for trash icon on remove button.
    Default is 'fa fa-trash mx-1'.
-   `altProductImageSrc` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Alt image src for products. Default is ''.
-   `cartCSSTransition` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Cart's config for react-transition-group/CSSTransition.
    Look at src/components/Cart/Cart.js for details.
-   `cartItemCSSTransition` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Cart item's config for react-transition-group/CSSTransition.
    Look at src/components/Cart/Cart.js for details.
-   `linkComponent` **[Link$Component](#linkcomponent)?** React Component, will receive prop `to="%your product's page%"`.
    I'd recommend you to take a look at react-router's Link.

## CartProduct

**Extends React.PureComponent**

React component to display product in cart.

**Meta**

-   **author**: Oleg Nosov &lt;olegnosov1@gmail.com>
-   **license**: MIT

## ProductPropertyLabel

**Extends React.PureComponent**

React component to display product's property value in cart.

**Meta**

-   **author**: Oleg Nosov &lt;olegnosov1@gmail.com>
-   **license**: MIT

## CheckoutButton

**Extends React.PureComponent**

Checkout button with grand total.

**Meta**

-   **author**: Oleg Nosov &lt;olegnosov1@gmail.com>
-   **license**: MIT

### Props

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

**Properties**

-   `grandTotal` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Required.
-   `currency` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Current currency. Required.
-   `hidden` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Show or hide button. Required.
-   `checkoutURL` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Link to checkout page. Required.
-   `getLocalization` **[GetLocalization](#getlocalization)** Required.
-   `iconCheckoutClassName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** ClassName for cart icon on checkout button. Default is 'fa fa-shopping-cart mx-1'.
-   `buttonCSSTransition` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Transition's config for react-transition-group/CSSTransition.
-   `linkComponent` **[Link$Component](#linkcomponent)?** React Component, will receive prop `to="%your product's page%"`.
    I'd recommend you to take a look at react-router's Link.

## Product

**Extends React.PureComponent**

React component - Product form with price.

**Meta**

-   **author**: Oleg Nosov &lt;olegnosov1@gmail.com>
-   **license**: MIT

### Props

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

**Properties**

-   `id` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Product's id. Required.
-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Name to display pattern. Required.
-   `path` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Path to product. Required.
-   `prices` **[Prices](#prices)** {currency: value}. Required
-   `imageSrc` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Path to main image. Required.
-   `currency` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Current price currency. Required.
-   `onAddProduct` **[AddProduct](#addproduct)** Function to call when user wants to add product in his cart. Required.
-   `generateProductKey` **[GenerateProductKey](#generateproductkey)** Required.
-   `getLocalization` **[GetLocalization](#getlocalization)** Required.
-   `properties` **[ProductPropertiesOptions](#productpropertiesoptions)?** Custom product properties. Each property option list consists of number,
    string or shape({ additionalCost(optional), onSelect(optional), value(required)})
-   `propertiesToShowInCart` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>?** Array of propery names to display in cart.
-   `scrollAnimationConfig` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Config for animateScroll (from react-scroll) scrollTo function.
-   `scrollPosition` **[ScrollPosition](#scrollposition)?** Position to scroll after product add. May be number or function returning number.
-   `scrollFunction` **[ScrollFunction](#scrollfunction)?** Function which will be called when product has been added.
-   `iconAddProductClassName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** ClassName for cart icon on add to button. Default is 'fa fa-cart-plus mx-1'.
-   `checkoutButton` **ReactElement?** 
-   `descriptionNode` **ReactNode?** Node to display before price element.
-   `afterPriceNode` **ReactNode?** Node to display after price element.

## ProductPropertiesOptions

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [PropertyOptions](#propertyoptions)>

## ScrollPosition

Type: ([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | function (currentTarget: [Element](https://developer.mozilla.org/docs/Web/API/Element)): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number))

## ScrollFunction

Type: function (currentTarget: EventTarget, scrollPosition: ([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | function (currentTarget: [Element](https://developer.mozilla.org/docs/Web/API/Element)): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)), scrollAnimationConfig: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)): void

## ProductPropertyInput

**Extends React.PureComponent**

React form for product property(options select only).

**Meta**

-   **author**: Oleg Nosov &lt;olegnosov1@gmail.com>
-   **license**: MIT

## OptionIndex

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>

## OptionObject

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

**Properties**

-   `onSelect` **function (option: [OptionObject](#optionobject)): void?** 
-   `additionalCost` **[Prices](#prices)?** 
-   `value` **[ProductPropertyOption](#productpropertyoption)** 

## PropertyOption

Type: ([ProductPropertyOption](#productpropertyoption) \| [OptionObject](#optionobject))

## PropertyOptions

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[PropertyOption](#propertyoption)>

## OnChange

Type: function (obj: {value: [OptionIndex](#optionindex)}): void

## helpers

**Meta**

-   **author**: Oleg Nosov &lt;olegnosov1@gmail.com>
-   **license**: MIT

### configure

**Parameters**

-   `Component` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** 
-   `configuration` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

Returns **[ReactStatelessComponent](#reactstatelesscomponent)** 

### isNaturalNumber

**Parameters**

-   `num` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

### parseInteger

**Parameters**

-   `num` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### 

### getAbsoluteOffsetTop

**Parameters**

-   `$0` **any**  (optional, default `{}`)
    -   `$0.offsetTop`  
    -   `$0.offsetParent`  

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### DefaultLinkComponent

**Parameters**

-   `$0` **any** 
    -   `$0.to`  
    -   `$0.otherProps` **...any** 

Returns **React$Element&lt;any>** 

### fixInputValueStartingWithZero

**Parameters**

-   `target` **[HTMLInputElement](https://developer.mozilla.org/docs/Web/API/HTMLInputElement)** 
-   `quantity` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### scrollFunction

**Parameters**

-   `target` **EventTarget** 
-   `scrollPosition` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | function (currentTarget: [Element](https://developer.mozilla.org/docs/Web/API/Element)): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number))** 
-   `scrollAnimationConfig` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

## ReactStatelessComponent

Type: function (props: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)): React$Element&lt;any>

## 

Shopping cart's data types

**Meta**

-   **author**: Oleg Nosov &lt;olegnosov1@gmail.com>
-   **license**: MIT

## ProductPropertyOption

Type: ([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number))

## ProductProperties

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), ([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number))>

## Prices

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>

## ProductData

Type: {id: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), quantity: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), properties: [ProductProperties](#productproperties), name: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), prices: [Prices](#prices), imageSrc: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), path: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), propertiesToShowInCart: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>}

**Properties**

-   `id` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `quantity` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `properties` **[ProductProperties](#productproperties)** 
-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `prices` **[Prices](#prices)** 
-   `imageSrc` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `path` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `propertiesToShowInCart` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** 

**Examples**

```javascript
{
   id: 'macbook-case',
   quantity: 3,
   properties: {
     color: 'red'
   },
   name: 'macbookCase',
   prices: {
    GBP: 50
   },
   path: '/shop/macbook-case/',
   imageSrc: '/shop/macbook-case/1-483x321.jpeg',
   propertiesToShowInCart: ['color']
 }
```

## Products

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [ProductData](#productdata)>

## GenerateProductKey

Type: function (id: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), properties: [ProductProperties](#productproperties)): [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## AddProduct

Type: function (key: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), product: [ProductData](#productdata), currency: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)): void

## UpdateProduct

Type: function (key: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), updatedProduct: [ProductData](#productdata)): void

## RemoveProduct

Type: function (key: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)): void

## GetLocalization

Type: function (id: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), params: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)): ([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | React$Element&lt;any>)

## CartAddAction

Type: {type: `"cart/ADD"`, key: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), product: [ProductData](#productdata), productCurrency: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)}

**Properties**

-   `type` **`"cart/ADD"`** 
-   `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `product` **[ProductData](#productdata)** 
-   `productCurrency` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

## CartUpdateAction

Type: {type: `"cart/UPDATE"`, key: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), updatedProduct: [ProductData](#productdata)}

**Properties**

-   `type` **`"cart/UPDATE"`** 
-   `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `updatedProduct` **[ProductData](#productdata)** 

## CartRemoveAction

Type: {type: `"cart/REMOVE"`, key: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)}

**Properties**

-   `type` **`"cart/REMOVE"`** 
-   `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

## CartEmptyAction

Type: {type: `"cart/EMPTY"`}

**Properties**

-   `type` **`"cart/EMPTY"`** 

## CartSetCurrencyAction

Type: {type: `"cart/SET_CURRENCY"`, currency: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)}

**Properties**

-   `type` **`"cart/SET_CURRENCY"`** 
-   `currency` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

## CartAction

Type: ([CartAddAction](#cartaddaction) \| [CartUpdateAction](#cartupdateaction) \| [CartRemoveAction](#cartremoveaction) \| [CartEmptyAction](#cartemptyaction) \| [CartSetCurrencyAction](#cartsetcurrencyaction))

## LocalizationPattern

Type: ([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | {component: ([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | function (): React$Element&lt;any>), props: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?, text: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)})

## Localization

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [LocalizationPattern](#localizationpattern)>

## MultiLocalization

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [Localization](#localization)>>

## CartState

Type: {cart: {currency: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), products: [Products](#products)}}

**Properties**

-   `cart` **{currency: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), products: [Products](#products)}** 
-   `cart.currency` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `cart.products` **[Products](#products)** 

## DefaultLinkComponentProps

Type: {to: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)}

**Properties**

-   `to` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

## Link$Component

Type: function ([DefaultLinkComponentProps](#defaultlinkcomponentprops)): React$Element&lt;any>


## Development

**Developer mode**

Run [webpack-dev-server](https://github.com/webpack/webpack-dev-server) for example1
```shell
yarn start
```
```shell
npm run start
```

**Build**

```shell
yarn build
```
```shell
npm run build
```
And then check dist folder

**Build Example**

```shell
yarn build_example
```
```shell
npm run build_example
```
And then check examples folder


**Testing**

[Jest](https://github.com/facebook/jest) is used for tests
```shell
yarn test
```
```shell
npm run test
```

**Linter**

[ESLint](https://github.com/eslint/eslint) is used as linter
```shell
yarn lint
```
```shell
npm run lint
```

**Flow Type**

Check types in project using [Flow](https://github.com/facebook/flow)
```shell
yarn flow
```
```shell
npm run flow
```

**Autodoc**

Generate doc using [documentation js](https://github.com/documentationjs/documentation)
```shell
yarn doc
```
```shell
npm run doc
```
And then look at README.md
