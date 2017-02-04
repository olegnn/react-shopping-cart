/**
  * @flow
  * @module Types
  *
  * @author Oleg Nosov <olegnosov1@gmail.com>
  * @license MIT
  *
  * @description
  * Redux cart data types file
  *
  */

/**
 * @param {string} id - Product's id.
 * @param {Object} properties - Product's properties
 * @return {string}
 */
declare function
  generateProductKeyType(
    id : string,
    properties : { [name : string] : string | number }
  ): string;

/**
 * @param {string} key - Product's key.
 * @param {ProductType} product - Product to add
 * @param {string} currency - Current product's currency.
 */
declare function
  onAddProductType(
    key : string, product : PorductType, currency : string
  ): void;

/**
 * @param {string} key - Product's key.
 * @param {Object} updatedProduct - Product's fields
 * with values to update.
 */
declare function
  onUpdateProductType(key : string, updatedProduct : Object): void;


/**
 * @param {string} key - Product's key.
 */
declare function onRemoveProductType(key : string): void;

/**
 * @param {string} id - Template id.
 * @param {Object=} [params={}] - Params.
 * @return {string|ReactElement}
 */
declare function
  getLocalizationType(id : string, params? : Object) : string | ReactElement;

  /**
  * @namespace PricesType
  * @memberof Types
  * @prop {number} currency - Pair (currency: price)
  */
declare type PricesType = { [currency : string] : number};

/**
 * @namespace ProductPropertyOptionType
 * @description
 * (also may be string or number)
 * @prop {PricesType=} additionalCost
 * @prop {Function=} onSelect
 * @prop {number|string} value
 */
 declare type ProductPropertyOptionType = number | string | Object;

 /**
 * @namespace ProductInfoType
 * @memberof Types
 * @prop {string} name - Display name
 * @prop {Object.<string, number>} prices -
 * Object contains { [currency]: price } pairs
 * @prop {string} imagePath - Path to main image
 * @prop {string} path - Link to product's page
 * @prop {Array<string>=} propertiesToShowInCart - Array
 * of names of properties which need to be shown in cart
 *
 */
 declare type ProductInfoType = {
  name : string,
  prices: {
    [currency: string]: number,
  },
  imagePath : string,
  path: string,
  propertiesToShowInCart?: Array<string>,
}

/**
* @namespace ProductType
* @memberof Types
* @prop {string} id
* @prop {number} quantity
* @prop {Object.<string, ProductPropertyOptionType>} properties -
* Custom product properties.
* In order to make prop visible in cart, add its name
* to productPropsToShow array
* @prop {ProductInfoType} productInfo
* @example
*  {
*    id: 'macbook-case',
*    quantity: 3,
*    properties: {
*      colour: 'red'
*    },
*    productInfo: {
*      name: 'Macbook case',
*      prices: {
*       GBP: 50
*      },
*      path: '/shop/macbook-case/',
*      imagePath: '/shop/macbook-case/1-483x321.jpeg',
*      propertiesToShowInCart: ['colour']
*    }
*  }
*/
 declare type ProductType = {
  id : string,
  quantity : number,
  properties : {
    [propName : string] : ProductPropertyOptionType,
  },
  productInfo : ProductInfoType,
};

/**
* @namespace ProductsMapType
* @memberof Types
* @prop {ProductType} {productKey} - Pair (productKey: product)
*/
 declare type ProductsMapType = {
  [productKey: string] : ProductType,
};

/**
* @namespace CartType
* @memberof Types
* @prop {number} total - Grand total
* @prop {string} summary - Readable stringified cart
* @prop {Object.<string, ProductType>} products - Products map
*/
 declare type CartType = {
  products : ProductsMapType,
  currency: string,
};

 declare type CartAddActionType = {
  type : 'cart/ADD',
  key : string,
  id : string,
  quantity : number,
  properties : {
    [propName : string] : ProductPropertyOptionType,
  },
  productInfo : ProductInfoType,
  productCurrency : string,
};

 declare type CartUpdateActionType = {
  type : 'cart/UPDATE',
  key : string,
  quantity: number,
  updatedProduct: Object,
};

 declare type CartRemoveActionType = {
  type : 'cart/REMOVE',
  key : string,
};

 declare type CartSetCurrencyActionType = {
  type : 'cart/SET_CURRENCY',
  currency : string,
};

 declare type CartEmptyActionType = {
  type : 'cart/EMPTY',
};

declare type CartActionType =
  CartAddActionType
  | CartUpdateActionType
  | CartRemoveActionType
  | CartEmptyActionType
  | CartSetCurrencyActionType;

declare type LocalizationObjectType = {
  [languageName : string] : {
    [componentName : string ] : {
      [id : string] : string | {
        component : string | Function,
        props? : Object,
        text : string,
      },
    },
  },
};
