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

Pay attention! All components are [**Pure**](https://reactjs.org/docs/react-api.html#reactpurecomponent).

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
  yellow: "Yellow (+{cost, number, CUR})"
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
  yellow: "Yellow (+{cost, number, CUR})"
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

-   [Cart][1]
    -   [Props][2]
        -   [Properties][3]
-   [CartProduct][4]
-   [ProductPropertyLabel][5]
-   [CheckoutButton][6]
    -   [Props][7]
        -   [Properties][8]
-   [helpers][9]
    -   [configure][10]
        -   [Parameters][11]
    -   [isNaturalNumber][12]
        -   [Parameters][13]
    -   [parseInteger][14]
        -   [Parameters][15]
    -   [isObject][16]
        -   [Parameters][17]
    -   [getAbsoluteOffsetTop][18]
        -   [Parameters][19]
    -   [DefaultLinkComponent][20]
        -   [Parameters][21]
    -   [fixInputValueStartingWithZero][22]
        -   [Parameters][23]
    -   [scrollFunction][24]
        -   [Parameters][25]
-   [Product][26]
    -   [Props][27]
        -   [Properties][28]
-   [ProductPropertiesOptions][29]
-   [ScrollPosition][30]
-   [ScrollFunction][31]
-   [ProductPropertyInput][32]
-   [OptionIndex][33]
-   [OptionObject][34]
-   [PropertyOption][35]
-   [PropertyOptions][36]
-   [OnChange][37]
-   [ProductPropertyOption][38]
-   [ProductProperties][39]
-   [Prices][40]
-   [ProductData][41]
    -   [Properties][42]
    -   [Examples][43]
-   [Products][44]
-   [GenerateProductKey][45]
-   [AddProduct][46]
-   [UpdateProduct][47]
-   [RemoveProduct][48]
-   [GetLocalization][49]
-   [CartAddAction][50]
    -   [Properties][51]
-   [CartUpdateAction][52]
    -   [Properties][53]
-   [CartRemoveAction][54]
    -   [Properties][55]
-   [CartEmptyAction][56]
    -   [Properties][57]
-   [CartSetCurrencyAction][58]
    -   [Properties][59]
-   [CartAction][60]
-   [LocalizationPattern][61]
-   [Localization][62]
-   [MultiLocalization][63]
-   [CartState][64]
    -   [Properties][65]
-   [DefaultLinkComponentProps][66]
    -   [Properties][67]
-   [Link$Component][68]

## Cart

**Extends React.PureComponent**

Component which represents shopping cart.

**Meta**

-   **author**: Oleg Nosov &lt;olegnosov1@gmail.com>
-   **license**: MIT

### Props

Type: [Object][69]

#### Properties

-   `products` **[Products][70]** Products map. Required.
-   `currency` **[string][71]** Current currency. Required.
-   `isCartEmpty` **[boolean][72]** Display cart or not. Required.
-   `onUpdateProduct` **[UpdateProduct][73]** Function which will be called when product should be updated.
    First arg is product's key in products map, second - updated product. Required.
-   `onRemoveProduct` **[RemoveProduct][74]** Function to call when product should be removed from cart.
    One argument - product's key. Required.
-   `getLocalization` **[GetLocalization][75]** Required.
-   `hideHeader` **[boolean][72]?** Hide cart's header. Default is false.
-   `checkoutButton` **ReactElement?** Button to display in the bottom of cart. Default is null.
-   `iconTrashClassName` **[string][71]?** ClassName for trash icon on remove button.
    Default is 'fa fa-trash mx-1'.
-   `altProductImageSrc` **[string][71]?** Alt image src for products. Default is ''.
-   `cartCSSTransition` **[Object][69]?** Cart's config for react-transition-group/CSSTransition.
    Look at src/components/Cart/Cart.js for details.
-   `cartItemCSSTransition` **[Object][69]?** Cart item's config for react-transition-group/CSSTransition.
    Look at src/components/Cart/Cart.js for details.
-   `linkComponent` **[Link$Component][76]?** React Component, will receive prop `to="%your product's page%"`.
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

Type: [Object][69]

#### Properties

-   `grandTotal` **[number][77]** Required.
-   `currency` **[string][71]** Current currency. Required.
-   `hidden` **[boolean][72]** Show or hide button. Required.
-   `checkoutURL` **[string][71]** Link to checkout page. Required.
-   `getLocalization` **[GetLocalization][75]** Required.
-   `iconCheckoutClassName` **[string][71]?** ClassName for cart icon on checkout button. Default is 'fa fa-shopping-cart mx-1'.
-   `buttonCSSTransition` **[Object][69]?** Transition's config for react-transition-group/CSSTransition.
-   `linkComponent` **[Link$Component][76]?** React Component, will receive prop `to="%your product's page%"`.
    I'd recommend you to take a look at react-router's Link.

## helpers

**Meta**

-   **author**: Oleg Nosov &lt;olegnosov1@gmail.com>
-   **license**: MIT

### configure

#### Parameters

-   `Component` **React$ComponentType&lt;Props>** 
-   `configuration` **[Object][69]** 

Returns **React$ComponentType&lt;Props>** 

### isNaturalNumber

#### Parameters

-   `num` **[number][77]** 

Returns **[boolean][72]** 

### parseInteger

#### Parameters

-   `num` **[string][71]** 

Returns **[number][77]** 

### isObject

#### Parameters

-   `value` **any** 

Returns **[boolean][72]** 

### getAbsoluteOffsetTop

#### Parameters

-   `$0` **[HTMLElement][78]**  (optional, default `{}`)
    -   `$0.offsetTop`  
    -   `$0.offsetParent`  

Returns **[number][77]** 

### DefaultLinkComponent

#### Parameters

-   `$0` **[DefaultLinkComponentProps][79]** 
    -   `$0.to`  
    -   `$0.otherProps` **...any** 

Returns **React$Element&lt;any>** 

### fixInputValueStartingWithZero

#### Parameters

-   `target` **[HTMLInputElement][80]** 
-   `quantity` **[number][77]** 

### scrollFunction

#### Parameters

-   `target` **[EventTarget][81]** 
-   `scrollPosition` **([number][77] | function (currentTarget: [Element][82]): [number][77])** 
-   `scrollAnimationConfig` **[Object][69]** 

## Product

**Extends React.PureComponent**

React component - Product form with price.

**Meta**

-   **author**: Oleg Nosov &lt;olegnosov1@gmail.com>
-   **license**: MIT

### Props

Type: [Object][69]

#### Properties

-   `id` **[string][71]** Product's id. Required.
-   `name` **[string][71]** Name to display pattern. Required.
-   `path` **[string][71]** Path to product. Required.
-   `prices` **[Prices][83]** {currency: value}. Required
-   `imageSrc` **[string][71]** Path to main image. Required.
-   `currency` **[string][71]** Current price currency. Required.
-   `onAddProduct` **[AddProduct][84]** Function to call when user wants to add product in his cart. Required.
-   `generateProductKey` **[GenerateProductKey][85]** Required.
-   `getLocalization` **[GetLocalization][75]** Required.
-   `properties` **[ProductPropertiesOptions][86]?** Custom product properties. Each property option list consists of number,
    string or shape({ additionalCost(optional), onSelect(optional), value(required)})
-   `propertiesToShowInCart` **[Array][87]&lt;[string][71]>?** Array of propery names to display in cart.
-   `scrollAnimationConfig` **[Object][69]?** Config for animateScroll (from react-scroll) scrollTo function.
-   `scrollPosition` **[ScrollPosition][88]?** Position to scroll after product add. May be number or function returning number.
-   `scrollFunction` **[ScrollFunction][89]?** Function which will be called when product has been added.
-   `iconAddProductClassName` **[string][71]?** ClassName for cart icon on add to button. Default is 'fa fa-cart-plus mx-1'.
-   `checkoutButton` **ReactElement?** 
-   `descriptionNode` **ReactNode?** Node to display before price element.
-   `afterPriceNode` **ReactNode?** Node to display after price element.

## ProductPropertiesOptions

Type: [Object][69]&lt;[string][71], [PropertyOptions][90]>

## ScrollPosition

Type: ([number][77] | function (currentTarget: [Element][82]): [number][77])

## ScrollFunction

Type: function (currentTarget: [EventTarget][81], scrollPosition: ([number][77] | function (currentTarget: [Element][82]): [number][77]), scrollAnimationConfig: [Object][69]): void

## ProductPropertyInput

**Extends React.PureComponent**

React form for product property(options select only).

**Meta**

-   **author**: Oleg Nosov &lt;olegnosov1@gmail.com>
-   **license**: MIT

## OptionIndex

Type: [Object][69]&lt;[string][71], [number][77]>

## OptionObject

Type: [Object][69]

## PropertyOption

Type: ([ProductPropertyOption][91] \| [OptionObject][92])

## PropertyOptions

Type: [Array][87]&lt;[PropertyOption][93]>

## OnChange

Type: function (obj: {value: [OptionIndex][94]}): void

## 

Shopping cart's data types

**Meta**

-   **author**: Oleg Nosov &lt;olegnosov1@gmail.com>
-   **license**: MIT

## ProductPropertyOption

Type: ([string][71] \| [number][77])

## ProductProperties

Type: [Object][69]&lt;[string][71], ([string][71] \| [number][77])>

## Prices

Type: [Object][69]&lt;[string][71], [number][77]>

## ProductData

### Properties

-   `id` **[string][71]** 
-   `quantity` **[number][77]** 
-   `properties` **[ProductProperties][95]** 
-   `name` **[string][71]** 
-   `prices` **[Prices][83]** 
-   `imageSrc` **[string][71]** 
-   `path` **[string][71]** 
-   `propertiesToShowInCart` **[Array][87]&lt;[string][71]>** 

### Examples

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

Type: [Object][69]&lt;[string][71], [ProductData][96]>

## GenerateProductKey

Type: function (id: [string][71], properties: [ProductProperties][95]): [string][71]

## AddProduct

Type: function (key: [string][71], product: [ProductData][96], currency: [string][71]): void

## UpdateProduct

Type: function (key: [string][71], updatedProduct: [ProductData][96]): void

## RemoveProduct

Type: function (key: [string][71]): void

## GetLocalization

Type: function (id: [string][71], params: [Object][69]): ([string][71] | React$Element&lt;any>)

## CartAddAction

### Properties

-   `type` **`"cart/ADD"`** 
-   `key` **[string][71]** 
-   `product` **[ProductData][96]** 
-   `productCurrency` **[string][71]** 

## CartUpdateAction

### Properties

-   `type` **`"cart/UPDATE"`** 
-   `key` **[string][71]** 
-   `updatedProduct` **[ProductData][96]** 

## CartRemoveAction

### Properties

-   `type` **`"cart/REMOVE"`** 
-   `key` **[string][71]** 

## CartEmptyAction

### Properties

-   `type` **`"cart/EMPTY"`** 

## CartSetCurrencyAction

### Properties

-   `type` **`"cart/SET_CURRENCY"`** 
-   `currency` **[string][71]** 

## CartAction

Type: ([CartAddAction][97] \| [CartUpdateAction][98] \| [CartRemoveAction][99] \| [CartEmptyAction][100] \| [CartSetCurrencyAction][101])

## LocalizationPattern

Type: ([string][71] | {component: ([string][71] | React$ComponentType&lt;any>), props: [Object][69]?, text: [string][71]})

## Localization

Type: [Object][69]&lt;[string][71], [LocalizationPattern][102]>

## MultiLocalization

Type: [Object][69]&lt;[string][71], [Object][69]&lt;[string][71], [Localization][103]>>

## CartState

### Properties

-   `cart` **{currency: [string][71], products: [Products][70]}** 

## DefaultLinkComponentProps

### Properties

-   `to` **[string][71]** 

## Link$Component

Type: function ([DefaultLinkComponentProps][79]): React$Element&lt;any>

[1]: #cart

[2]: #props

[3]: #properties

[4]: #cartproduct

[5]: #productpropertylabel

[6]: #checkoutbutton

[7]: #props-1

[8]: #properties-1

[9]: #helpers

[10]: #configure

[11]: #parameters

[12]: #isnaturalnumber

[13]: #parameters-1

[14]: #parseinteger

[15]: #parameters-2

[16]: #isobject

[17]: #parameters-3

[18]: #getabsoluteoffsettop

[19]: #parameters-4

[20]: #defaultlinkcomponent

[21]: #parameters-5

[22]: #fixinputvaluestartingwithzero

[23]: #parameters-6

[24]: #scrollfunction

[25]: #parameters-7

[26]: #product

[27]: #props-2

[28]: #properties-2

[29]: #productpropertiesoptions

[30]: #scrollposition

[31]: #scrollfunction-1

[32]: #productpropertyinput

[33]: #optionindex

[34]: #optionobject

[35]: #propertyoption

[36]: #propertyoptions

[37]: #onchange

[38]: #productpropertyoption

[39]: #productproperties

[40]: #prices

[41]: #productdata

[42]: #properties-3

[43]: #examples

[44]: #products

[45]: #generateproductkey

[46]: #addproduct

[47]: #updateproduct

[48]: #removeproduct

[49]: #getlocalization

[50]: #cartaddaction

[51]: #properties-4

[52]: #cartupdateaction

[53]: #properties-5

[54]: #cartremoveaction

[55]: #properties-6

[56]: #cartemptyaction

[57]: #properties-7

[58]: #cartsetcurrencyaction

[59]: #properties-8

[60]: #cartaction

[61]: #localizationpattern

[62]: #localization

[63]: #multilocalization

[64]: #cartstate

[65]: #properties-9

[66]: #defaultlinkcomponentprops

[67]: #properties-10

[68]: #linkcomponent

[69]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[70]: #products

[71]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[72]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[73]: #updateproduct

[74]: #removeproduct

[75]: #getlocalization

[76]: #linkcomponent

[77]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[78]: https://developer.mozilla.org/docs/Web/HTML/Element

[79]: #defaultlinkcomponentprops

[80]: https://developer.mozilla.org/docs/Web/API/HTMLInputElement

[81]: https://developer.mozilla.org/docs/Web/API/EventTarget

[82]: https://developer.mozilla.org/docs/Web/API/Element

[83]: #prices

[84]: #addproduct

[85]: #generateproductkey

[86]: #productpropertiesoptions

[87]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[88]: #scrollposition

[89]: #scrollfunction

[90]: #propertyoptions

[91]: #productpropertyoption

[92]: #optionobject

[93]: #propertyoption

[94]: #optionindex

[95]: #productproperties

[96]: #productdata

[97]: #cartaddaction

[98]: #cartupdateaction

[99]: #cartremoveaction

[100]: #cartemptyaction

[101]: #cartsetcurrencyaction

[102]: #localizationpattern

[103]: #localization


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

[ESLint](https://github.com/eslint/eslint) is used as a linter
```shell
yarn lint
```
```shell
npm run lint
```

**Formatter**

[prettier-eslint](https://github.com/prettier/prettier-eslint) is used as a formatter
```shell
yarn fmt
```
```shell
npm run fmt
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
