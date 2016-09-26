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
 * @prop {number} price - Price (only value)
 * @prop {string} currency - Price currency
 * @prop {string} imagePath - Path to main image
 *
 */
 declare type ProductInfoType = {
  name : string,
  price : number,
  currency : string,
  imagePath : string,
}

/**
* @namespace ProductType
* @memberof Types
* @prop {string} id - MUST BE PATH TO PRODUCT'S PAGE (!!!)
* @prop {number} quantity
* @prop {Object.<string, string | number>} properties -
* Custom product properties.
* In order to make prop visible in cart, add its name
* to productPropsToShow array
* @prop {ProductInfoType} productInfo
* @example
*  {
*    id: '/shop/macbook-case/',
*    quantity: 3,
*    properties: {
*      colour: 'red'
*    },
*    productInfo: {
*      name: 'Macbook case',
*      price: 80,
*      currency: '£',
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
};

// TO DO
 declare type CartActionType = {
  type : 'cart/ADD' | 'cart/REMOVE' | 'cart/UPDATE' | 'cart/EMPTY',
  id : string,
  key : string | void,
  quantity : number,
  properties? : {
    [propName : string] : string | number,
  },
  productInfo? : ProductInfoType,
  updateProps? : Object,
};
