/**
 * @flow
 * @module Product
 * @extends React.PureComponent
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * React component - Product form with price.
 */

import React, { PureComponent } from 'react';

import type {
  Prices,
  InputEvent,
  ProductData,
  AddProduct,
  GetLocalization,
  GenerateProductKey,
} from '../../types';

import type {
  OnChange,
  PropertyOptions,
  OptionIndex,
} from './ProductPropertyInput/ProductPropertyInput';

import ProductPropertyInput from './ProductPropertyInput/ProductPropertyInput';
import {
  isObject,
  parseInteger,
  scrollFunction,
  isNaturalNumber,
  generateProductKey,
  getAbsoluteOffsetTop,
  fixInputValueStartingWithZero,
} from '../../helpers';

/**
 * @typedef {Object.<string, PropertyOptions>} ProductPropertiesOptions
 */
export type ProductPropertiesOptions = {
  [key: string]: PropertyOptions
};

/** @ */
export type ScrollPosition = number | (currentTarget: Element) => number;

/** @ */
export type ScrollFunction = (
  currentTarget: EventTarget,
  scrollPosition: number | (currentTarget: Element) => number,
  scrollAnimationConfig: Object,
) => void;

/**
 * @memberof Product
 * @typedef {Object} Props
 * @prop {string} id - Product's id. Required.
 * @prop {string} name - Name to display pattern. Required.
 * @prop {string} path - Path to product. Required.
 * @prop {Prices} prices - {currency: value}. Required
 * @prop {string} imageSrc - Path to main image. Required.
 * @prop {string} currency - Current price currency. Required.
 * @prop {AddProduct} onAddProduct - Function to call when user wants to add product in his cart. Required.
 * @prop {GenerateProductKey} generateProductKey - Required.
 * @prop {GetLocalization} getLocalization - Required.
 * @prop {?ProductPropertiesOptions} properties - Custom product properties. Each property option list consists of number,
 * string or shape({ additionalCost(optional), onSelect(optional), value(required)})
 * @prop {?Array<string>} propertiesToShowInCart - Array of propery names to display in cart.
 * @prop {?Object} scrollAnimationConfig - Config for animateScroll (from react-scroll) scrollTo function.
 * @prop {?ScrollPosition} scrollPosition - Position to scroll after product add. May be number or function returning number.
 * @prop {?ScrollFunction} scrollFunction - Function which will be called when product has been added.
 * @prop {?string} iconAddProductClassName - ClassName for cart icon on add to button. Default is 'fa fa-cart-plus mx-1'.
 * @prop {?ReactElement} checkoutButton
 * @prop {?ReactNode} descriptionNode - Node to display before price element.
 * @prop {?ReactNode} afterPriceNode - Node to display after price element.
 *
 */
void null;

export type Props = {|
  /*
   * Product's id.
   */
  id: string,
  /*
   * Name to display pattern.
   */
  name: string,
  /*
   * Path to product.
   */
  path: string,
  /*
   * Prices (currency-value).
   */
  prices: Prices,
  /*
   * Path to main image.
   */
  imageSrc: string,
  /*
   * Current price currency.
   */
  currency: string,
  /*
   * Function to call when user wants to add product in his cart.
   */
  onAddProduct: AddProduct,
  getLocalization: GetLocalization,
  /*
   * Function which generates product's key based on id and properties.
   */
  generateProductKey?: GenerateProductKey,
  /*
   * Custom product properties. Each property option list consists of number,
   * string or shape({ additionalCost(optional), onSelect(optional), value(required)})
   */
  properties?: ProductPropertiesOptions,
  /*
   * Array of propery names to display in cart.
   */
  propertiesToShowInCart?: Array<string>,
  /*
   * Config for animateScroll (from react-scroll) scrollTo function.
   */
  scrollAnimationConfig?: Object,
  /*
   * Position to scroll after product add.
   */
  scrollPosition?: ScrollPosition,
  scrollFunction?: ScrollFunction,
  /*
   *  ClassName for cart icon on add to button.
   */
  iconAddProductClassName?: string,
  checkoutButton?: React$Element<*>,
  /*
   * Node to display before price element.
   */
  descriptionNode?: React$Element<*>,
  /*
   * Node to display after price element.
   */
  afterPriceNode?: React$Element<*>,
|};

const scrollPosition: ScrollPosition =
  ({ children, }) =>
    getAbsoluteOffsetTop(children[children.length - 2]) - 5;

const defaultProps = {
  properties: {},
  propertiesToShowInCart: [],
  iconAddProductClassName: 'fa fa-cart-plus mx-1',
  scrollAnimationConfig: {
    duration: 1250,
    delay: 0,
    smooth: true,
  },
  scrollPosition,
  scrollFunction,
  generateProductKey,
  checkoutButton: null,
  afterPriceNode: null,
  descriptionNode: null,
};

export type State = {|
  quantity: number,
|} & OptionIndex;

export default class Product
  extends PureComponent<Props, State> {
  props: Props;

  static defaultProps = defaultProps;

  static displayName = 'Product';

  static createPropertiesInputList = (
    properties: ProductPropertiesOptions,
    propertiesSelectedIndexes: OptionIndex,
    currency: string,
    handlePropertyValueChange: OnChange,
    getLocalization: GetLocalization,
  ): Array<React$Element<*>> =>
    Object
      .entries(properties)
      .map(([ name, options, ]) =>
        (<ProductPropertyInput
          key={name}
          name={name}
          options={options}
          selectedOptionIndex={propertiesSelectedIndexes[name]}
          currency={currency}
          onChange={handlePropertyValueChange}
          getLocalization={getLocalization}
        />));

  static calculateAdditionalCost = (
    properties: ProductPropertiesOptions,
    selectedPropertyIndexes: OptionIndex,
    currency: string,
  ): number =>
    Object
      .entries(properties)
      .reduce(
        (sum, [ propertyName, propertyOptions, ]) => {
          const selectedOption
            = propertyOptions[selectedPropertyIndexes[propertyName]||0];
          return sum + (
            isObject(selectedOption)
            && (
              isObject(selectedOption.additionalCost)
              && selectedOption.additionalCost[currency]
            ) || 0
          );
        }
        , 0,
      );

  static generateCartProduct = (
    {
      properties,
      propertiesToShowInCart,
      prices,
      name,
      imageSrc,
      path,
      id,
    }: {
      properties: ProductPropertiesOptions,
      propertiesToShowInCart: Array<string>,
      prices: Prices,
      name: string,
      imageSrc: string,
      path: string,
      id: string,
    },
    quantity: number,
    selectedPropertyIndexes: OptionIndex,
  ): ProductData => ({
    id,
    quantity,
    properties:
      Object
        .entries(properties)
        .reduce(
          (obj, [ propName, options, ]) =>
            ({
              ...obj,
              [propName]:
            ProductPropertyInput
              .getOptionValue(options[selectedPropertyIndexes[propName]|0]),
            })
          , {},
        ),
    name,
    prices:
      Object
        .entries(prices)
        .reduce(
          (acc, [ currency, price, ]) => ({
            ...acc,
            [currency]: price +
              Product.calculateAdditionalCost(
                properties,
                selectedPropertyIndexes,
                currency,
              ),
          })
          , {},
        ),
    path,
    imageSrc,
    propertiesToShowInCart,
  });

  state: State = {
    quantity: 1,
  };

  handleQuantityValueChange = ({ currentTarget, }: InputEvent) => {
    const quantity = parseInteger(currentTarget.value);
    if (isNaturalNumber(quantity)) {
      fixInputValueStartingWithZero(currentTarget, quantity);
      this.setState({ quantity, });
    }
  }

  hanglePropertyValueChange: OnChange =
    ({ value, }) => void this.setState(value);

  addProductFormSubmit = (event: Event) => {
    const { props, state, } = this;
    const {
      id,
      currency,
      onAddProduct,
      generateProductKey,
      scrollAnimationConfig,
      scrollPosition,
      scrollFunction,
    } = props;
    const { quantity, ...selectedPropertyIndexes } = state;
    const { generateCartProduct, } = Product;
    const { currentTarget, } = event;
    /*
     * Prevent form submission
     */
    event.preventDefault();

    if (quantity) {
      const product =
        generateCartProduct(props, quantity, selectedPropertyIndexes);
      onAddProduct(
        generateProductKey(
          id,
          product.properties,
        ),
        product,
        currency,
      );
      scrollFunction(currentTarget, scrollPosition, scrollAnimationConfig);
    }
  }

  render() {
    const {
      addProductFormSubmit,
      handleQuantityValueChange,
      hanglePropertyValueChange,
      state,
      props,
    } = this;

    const {
      name,
      prices,
      currency,
      properties,
      iconAddProductClassName,
      afterPriceNode,
      descriptionNode,
      checkoutButton,
      getLocalization,
    } = props;

    const {
      quantity,
      ...selectedPropertyIndexes
    } = state;

    const {
      createPropertiesInputList,
      calculateAdditionalCost,
    } = Product;

    const price =
      prices[currency]
      + calculateAdditionalCost(
        properties,
        selectedPropertyIndexes,
        currency,
      );

    const localizationScope = {
      name,
      quantity,
      price,
      currency,
      get localizedCurrency() {
        return getLocalization(currency, localizationScope);
      },
      get localizedName() {
        return getLocalization(name, localizationScope);
      },
    };

    return (
      <div>
        { descriptionNode }
        <p>
          { getLocalization('price', localizationScope) }
        </p>
        { afterPriceNode }
        <form className="my-1" onSubmit={addProductFormSubmit}>
          {
            createPropertiesInputList(
              properties,
              selectedPropertyIndexes,
              currency,
              hanglePropertyValueChange,
              getLocalization,
            )
          }
          <div className="form-group row">
            <label
              htmlFor="product-quantity"
              className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label"
            >
              { getLocalization('quantityLabel', localizationScope) }
            </label>
            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
              <input
                onChange={handleQuantityValueChange}
                className="form-control"
                type="number"
                value={quantity}
              />
            </div>
          </div>
          <div className="form-group row">
            <div
              className={
                'col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-6 ' +
                'm-auto'
              }
            >
              <button
                type="submit"
                role="button"
                className="btn btn-success btn-block"
                disabled={!quantity}
              >
                <i className={iconAddProductClassName} />
                {
                  getLocalization('addToCart', localizationScope)
                }
              </button>
              { checkoutButton }
            </div>
          </div>
        </form>
      </div>
    );
  }
}
