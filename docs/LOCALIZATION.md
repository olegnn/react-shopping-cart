## Localization

The default localization library is [intl-messageformat](https://github.com/yahoo/intl-messageformat).
In order to localize your cart, you can chose one of the possible ways:
- Create your own __getLocalization__ func and pass it as props to the cart's components
- Create getLocalization func with bound localization using
__getLocalization__, __defaultLocalization__ and __getDefaultLocalization__ funcs from _cartLocalization_ module
and pass it as props to the cart's components
- Don't do anything and see only default language in your cart :C

The first one should be look like that if you're also using intl-messageformat

```javascript
  import { Cart } from 'react-shopping-cart';

  const localization = {
    en: {
      cart : {
        GBP: '£',
      },
    },
  };

  const getLocalization = (localization, language, id, params = {}) =>  
    new IntlMessageFormat(localization[id], language).format(params);

  <Cart
    getLocalization={(...args) => getLocalization(localization.en.cart, 'en', ...args)}
  />
```
Or you could use __getDefaultLocalization__ func from _cartLocalization_:
```javascript
  import { cartLocalization } from 'react-shopping-cart';

  const { getDefaultLocalization } = cartLocalization;

  const localization = {
    GBP: '£',
    USD: {
      props: { className: 'BIG_PRICE' }, // Optional props object for component
      component: 'h1', // String or react component
      text: '$',
    },
  };

  <Cart
    getLocalization={getDefaultLocalization('cart', 'en', localization)}
  />
```
Example usage of __getLocalization__ func from _cartLocalization__:
```javascript
  import { cartLocalization } from 'react-shopping-cart';

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
Generally, getLocalization is just a function which accepts id and params(optional) and returns string,
based on received arguments.
For built-in getLocalization func you may write your translation for default statements as a string or object in format { component : Function | string, text : string, props? : object }

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

  - _{name, value, localizedName, localizedValue}_
    - productPropertyLabel
    - productPropertyValue
    - ___your product's property name___
    - ___your product's property value (if string ofc)___

- __checkoutButton__
  - _{currency, total, localizedCurrency}_
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
    ___your product's name___
    ___your product's currency___
  - _{
      name,
      currency,
      localizedName,
      localizedCurrency,
    }_
    - ___your product's name___
    - ___your product's property name___
    - _{(optional) cost}_
      - ___your product's property value (if string ofc)___
