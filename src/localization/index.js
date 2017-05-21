/**
 * @flow
 * @module localization
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * Default localization and API functions
 *
 */

import React from 'react';
import IntlMessageFormat from 'intl-messageformat';

import type {
  Localization,
  LocalizationPattern,
  MultiLocalization,
  GetLocalization,
} from '../types';

/**
 * @memberof localization
 */
export const defaultLocalization: MultiLocalization = {
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
      priceValue: '{localizedCurrency}{price, number}',
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
  localization: Localization,
  language: string,
  id: string,
  params: Object = {},
): string | React$Element<*> => {
  const localizationPattern: LocalizationPattern = localization[id];

  if (typeof localizationPattern === 'undefined') {
    if (!process || process && process.env && process.env.NODE_ENV !== 'production') {
      console.error(
        `Missing localization for ${id}, language: ${language}`,
      );
    }
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
    componentName: string,
    language: string = 'en',
    localization: Localization = {},
  ): GetLocalization =>
    (...args: Array<any>) =>
      getLocalization(
        {
          ...(
            defaultLocalization[language]
            ? defaultLocalization[language][componentName]
            : {}
          ),
          ...localization,
        },
        language,
        ...args,
      );
