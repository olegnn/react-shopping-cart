/**
 * @flow
 * @file Types
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * Shopping cart's data types
 */

void null;

/** @ */
export type ProductPropertyOption = string | number;

/**
 * @typedef {Object.<string, string|number>} ProductProperties
 */
export type ProductProperties = { [key: string]: ProductPropertyOption };

/**
 * @typedef {Object.<string, number>} Prices
 */
export type Prices = { [currency: string]: number };

/**
 * @example
 *  {
 *    id: 'macbook-case',
 *    quantity: 3,
 *    properties: {
 *      color: 'red'
 *    },
 *    name: 'macbookCase',
 *    prices: {
 *     GBP: 50
 *    },
 *    path: '/shop/macbook-case/',
 *    imageSrc: '/shop/macbook-case/1-483x321.jpeg',
 *    propertiesToShowInCart: ['color']
 *  }
 */
export type ProductData = {|
  id: string,
  quantity: number,
  properties: ProductProperties,
  name: string,
  prices: Prices,
  imageSrc: string,
  path: string,
  propertiesToShowInCart: Array<string>,
|};

/**
 * @typedef {Object.<string, ProductData>} Products
 */
export type Products = {
  [productKey: string]: ProductData,
};

/** @ */
export type GenerateProductKey = (
  id: string,
  properties: ProductProperties,
) => string;

/** @ */
export type AddProduct = (
  key: string,
  product: ProductData,
  currency: string,
) => void;

/** @ */
export type UpdateProduct = (key: string, updatedProduct: ProductData) => void;

/** @ */
export type RemoveProduct = (key: string) => void;

/** @ */
export type GetLocalization = (
  id: string,
  params?: Object,
) => string | React$Element<*>;

/** @ */
export type CartAddAction = {|
  type: 'cart/ADD',
  key: string,
  product: ProductData,
  productCurrency: string,
|};

/** @ */
export type CartUpdateAction = {|
  type: 'cart/UPDATE',
  key: string,
  updatedProduct: ProductData,
|};

/** @ */
export type CartRemoveAction = {|
  type: 'cart/REMOVE',
  key: string,
|};

/** @ */
export type CartEmptyAction = {|
  type: 'cart/EMPTY',
|};

/** @ */
export type CartSetCurrencyAction = {|
  type: 'cart/SET_CURRENCY',
  currency: string,
|};

/** @ */
export type CartAction =
  | CartAddAction
  | CartUpdateAction
  | CartRemoveAction
  | CartEmptyAction
  | CartSetCurrencyAction;

/** @ */
export type LocalizationPattern =
  | string
  | {
      component: string | (() => React$Element<*>),
      props?: Object,
      text: string,
    };

/**
 * @typedef {Object.<string, LocalizationPattern>} Localization
 */
export type Localization = {
  [id: string]: LocalizationPattern,
};

/**
 * @typedef {Object.<string, Object.<string, Localization>>} MultiLocalization
 */
export type MultiLocalization = {
  [languageName: string]: {
    [componentName: string]: Localization,
  },
};

type ElementEventTemplate<E> = {
  currentTarget: E,
} & Event;

export type InputEvent = ElementEventTemplate<HTMLInputElement>;

/** @ */
export type CartState = {
  cart: { currency: string, products: Products },
};

/** @ */
export type DefaultLinkComponentProps = {
  to: string,
};

/** @ */
export type Link$Component = DefaultLinkComponentProps => React$Element<*>;
