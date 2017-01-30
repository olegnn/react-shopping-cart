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
      productName: {
        text: '{localizedName}',
        component: 'h5',
      },
      quantityLabel: 'Quantity:',
      priceLabel: 'Price:',
      priceValue: '{localizedCurrency}{price}',
      totalLabel: 'Total:',
      totalValue: '{localizedCurrency}{total, plural, ' +
                  '=0 {0}' +
                  'other {#}}',
      remove: 'Remove',
      productPropertyLabel: '{localizedName}:',
      productPropertyValue: '{localizedValue}',
    },
    checkoutButton: {
      checkoutTotal:
        'Checkout (Grand total {localizedCurrency}{total, plural, ' +
        '=0 {0}' +
        'other {#}})',
    },
    product: {
      price: {
        text: 'Price: {localizedCurrency}{price}',
        component: 'strong',
      },
      quantityLabel: 'Quantity:',
      propertyLabel: '{localizedName}:',
      addToCart: 'Add to cart',
    },
  },
};

/**
 * @memberof localization
 */
export const getLocalization = (
  localization : LocalizationObjectType,
  language : string,
  id : string,
  params : Object = {},
) : string => {
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
  ) return (
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

/**
 * @memberof localization
 */
export const getDefaultLocalization =
  (
    componentName : string,
    language : string = 'en',
    localization : Object = {},
  ) =>
    (...args : Array<any>) =>
      getLocalization(
        {
          ...defaultLocalization[language][componentName],
          ...localization,
        },
        language,
        ...args,
      );
