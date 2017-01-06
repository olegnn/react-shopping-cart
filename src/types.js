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

 declare function onUpdateProductType(key : string, updateProps : Object): void;

 declare function onRemoveProductType(key : string): void;

 /**
 * @namespace ProductInfoType
 * @memberof Types
 * @prop {string} name - Display name
 * @prop {Object.<string, number>} prices -
 * Object contains { [currency]: price } pairs
 * @prop {string} imagePath - Path to main image
 * @prop {string} path - Link to product's page
 *
 */
 declare type ProductInfoType = {
  name : string,
  prices: {
    [currency: string]: number,
  },
  imagePath : string,
  path: string,
}

/**
* @namespace ProductType
* @memberof Types
* @prop {string} id
* @prop {number} quantity
* @prop {Object.<string, string|number>} properties -
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
*      imagePath: '/shop/macbook-case/1-483x321.jpeg'
*    }
*  }
*/
 declare type ProductType = {
  id : string,
  quantity : number,
  properties : {
    [propName : string] : string | number,
  },
  productInfo : ProductInfoType,
};

/**
* @namespace ProductsMapType
* @memberof Types
* @prop {ProductType} productKey - Pair (productKey: product)
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
  total : number,
  summary : string,
  products : ProductsMapType,
  currency: string,
};

// TODO
 declare type CartActionType = {
  type :
    'cart/ADD'
  | 'cart/REMOVE'
  | 'cart/UPDATE'
  | 'cart/EMPTY'
  | 'cart/SET_CURRENCY',
  id : string,
  key : string | void,
  quantity : number,
  properties? : {
    [propName : string] : string | number,
  },
  productInfo? : ProductInfoType,
  updateProps? : Object,
};
