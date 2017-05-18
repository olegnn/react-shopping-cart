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
