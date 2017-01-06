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
      totalLabel: 'Total:',
      priceValue: '{currency}{price}',
      totalValue: '{currency}{total, plural, ' +
                  '=0 {0}' +
                  'other {#}}',
      remove: 'Remove',
    },
    checkoutButton: {
      checkoutTotal: 'Checkout ({total, plural, ' +
                     '=0 {Your cart is empty :C}' +
                     'other {Grand total {currency}# }})',
    },
    product: {
      price: 'Price: {currency}{price}',
      quantityLabel: 'Quantity:',
      addToCart: 'Add to cart',
    },
  },
};

export const getLocalization = (
  localization,
  language,
  id,
  params = {},
) => {
  const localizationPattern = localization[id];

  if (typeof localizationPattern === 'undefined')
    throw new Error(
      'Check your localization, you ' +
      `didn't add pattern for ${id}`,
    );
  else if (typeof localizationPattern === 'object')
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
  else throw new Error('You put some strange thing in localization object.');
};

export const getDefaultLocalization =
  (componentName, language = 'en') =>
    (...args) =>
      getLocalization(
        defaultLocalization[language][componentName], language, ...args,
      );
