/**
 * @flow
 * @module localization
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * Default localization and API funcs
 *
 */
import React from 'react';
import IntlMessageFormat from 'intl-messageformat';

export const defaultLocalization = {
  en: {
    cart: {
      shoppingCartTitle: {
        text: 'Shopping cart',
        component: 'h4',
      },
      productName: '{name}',
      quantityLabel: 'Quantity:',
      priceLabel: 'Price:',
      priceValue: '{currency}{price}',
      totalLabel: 'Total:',
      totalValue: '{currency}{total, plural, ' +
                  '=0 {0}' +
                  'other {#}}',
      remove: 'Remove',
      productPropertyLabel: '{name}:',
      productPropertyValue: '{value}',
    },
    checkoutButton: {
      checkoutTotal: 'Checkout (Grand total {currency}{total, plural, ' +
                      '=0 {0}' +
                      'other {#}})',
    },
    product: {
      price: 'Price: {currency}{price}',
      quantityLabel: 'Quantity:',
      propertyLabel: '{name}:',
      addToCart: 'Add to cart',
    },
  },
};

export const getLocalization = (
  localization : LocalizationObjectType,
  language : string,
  id : string,
  params : Object = {},
) => {
  const localizationPattern = localization[id];

  if (typeof localizationPattern === 'undefined') {
    console.error(
      `Missing localization for ${id}, language: ${language}`,
    );
    return id;
  } else if (
    typeof localizationPattern === 'object'
    && typeof localizationPattern.text === 'string'
    && ['string', 'function'].includes(
      typeof localizationPattern.component,
    )
  )
    return (
      React.createElement(
        localizationPattern.component,
        localizationPattern.props || {},
        new IntlMessageFormat(
          localizationPattern.text, language,
        ).format(params),
      )
    );
  else if (typeof localizationPattern === 'string')
    return (
      new IntlMessageFormat(localizationPattern, language).format(params)
    );
  else throw new Error(
    `Localization pattern error for ${id}, language: ${language}`,
  );
};

export const getDefaultLocalization =
  (
    componentName : string,
    language : string = 'en',
    localization : LocalizationObjectType = defaultLocalization,
  ) =>
    (...args : Array<any>) =>
      getLocalization(
        localization[language][componentName], language, ...args,
      );
