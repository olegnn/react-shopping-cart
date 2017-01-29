/**
 * @flow
 * @module Product
 * @extends React.Component
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * React component - Product form with price.
 */
import React, { Component, PropTypes } from 'react';
import animateScroll from 'react-scroll/lib/mixins/animate-scroll';

import ProductPropertyInput from './ProductPropertyInput/ProductPropertyInput';
import {
  isNaturalNumber,
  getAbsoluteOffsetTop,
} from '../../helpers';

const
  /**
   * @static propTypes
   * @memberof Product
   *
   * @prop {string} name - Name to display. Required
   * @prop {id} id - Product's id. Required
   * @prop {string} path - Path to product. Required
   * @prop {Object.<string, number>} prices - Prices (currency-value). Required
   * @prop {string} imagePath - Path to main image. Required
   * @prop {string} currency - Price currency. Required
   * @prop {Object.<string, Array<(ProductPropertyOptionType)>>}
   * properties - Custom product properties. May be array of number, string or
   * shape({ additionalCost(optional), onSelect(optional), value(required)})
   * Default is {}
   * @prop {string} iconAddProductClassName - ClassName for cart icon
   * on add to button.
   * Default is 'icon-cart-plus'
   */
  propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    prices: PropTypes.objectOf(
      PropTypes.number,
    ).isRequired,
    imagePath: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    properties: PropTypes.objectOf(
      PropTypes.arrayOf(
        PropTypes.oneOfType(
          [
            PropTypes.string,
            PropTypes.number,
            PropTypes.shape({
              additionalCost: PropTypes.objectOf(
                PropTypes.number,
              ),
              onSelect: PropTypes.func,
              value: PropTypes.oneOfType(
                [
                  PropTypes.string,
                  PropTypes.number,
                ],
              ).isRequired,
            }),
          ],
        ),
      ),
    ),
    propertiesToShowInCart: PropTypes.arrayOf(
      PropTypes.string,
    ),
    scrollAnimationConfig: PropTypes.object,
    iconAddProductClassName: PropTypes.string,
    afterPriceNode: PropTypes.node,
  },
  /**
  * @static containerPropTypes
  * @memberof Product
  * @prop {ReactElement} CheckoutButton - Button in the bottom of product.
  * Required.
  * @prop {Function<string>} onAddProduct - Callback to call when
  * user want to add product in his cart
  * Example:
  * onAddProduct(
  *   'macbook-case',
  *   { quantity: 30, properties: { colour: 'red' } },
  *   'GBP'
  * );
  * Required.
  * @prop {getLocalizationType} getLocalization - Required.
  * @prop {generateProductKey} generateProductKey - Function which generates
  * product's key based on id and properties. Example:
  * generateProductKey('macbook-case', { colour: 'red'} ).
  */
  containerPropTypes = {
    CheckoutButton: PropTypes.element.isRequired,
    onAddProduct: PropTypes.func.isRequired,
    getLocalization: PropTypes.func.isRequired,
    generateProductKey: PropTypes.func.isRequired,
  },
  defaultProps = {
    properties: {},
    propertiesToShowInCart: [],
    iconAddProductClassName: 'icon-cart-plus',
    scrollAnimationConfig: {
      duration: 750,
      delay: 0,
      smooth: true,
    },
    afterPriceNode: null,
  };

export default class Product extends Component {

  static propTypes = { ...propTypes, ...containerPropTypes };
  static defaultProps = defaultProps;

  static createPropertiesInputList = (
    properties: {
      [propertyName: string]: Array<ProductPropertyOptionType>
    },
    propertiesSelectedIndexes,
    currency,
    handlePropertyValueChange,
    getLocalization,
  ) : Array<React$Element<any>> =>
    Object
      .entries(properties)
      .map(([name, options]) =>
        <ProductPropertyInput
          key={name}
          name={name}
          options={options}
          selectedOptionIndex={propertiesSelectedIndexes[name]}
          currency={currency}
          onChange={handlePropertyValueChange}
          getLocalization={getLocalization}
        />,
    );

  static calculateAdditionalCost(
    properties : { [propName : string] : ProductPropertyOptionType },
    selectedPropertyIndexes : {[propName: string] : number},
    currency : string,
  ) : number {
    return Object.entries(properties).reduce(
      (sum, [propertyName, propertyOptions]) => {
        const selectedOption
          = propertyOptions[selectedPropertyIndexes[propertyName]|0];
        return sum + (
          typeof selectedOption === 'object'
          && (
            selectedOption.additionalCost
            && selectedOption.additionalCost[currency]
          ) || 0
        );
      }
    , 0);
  }

  static generateCartProduct(
    {
      properties,
      propertiesToShowInCart,
      prices,
      name,
      imagePath,
      path,
      id,
    } : {
      properties : { [propName : string] : ProductPropertyOptionType },
      propertiesToShowInCart : Array<string>,
      prices : { [currency : string] : number },
      name : string,
      imagePath : string,
      path : string,
      id : string,
    },
    quantity,
    selectedPropertyIndexes : {[propName: string] : number},
  ) : ProductType {
    const { calculateAdditionalCost } = Product;
    return {
      id,
      quantity,
      properties:
        Object
          .entries(properties)
          .reduce((obj, [propName, options]) =>
            ({
              ...obj,
              [propName]:
                ProductPropertyInput
                  .getOptionValue(
                    options[selectedPropertyIndexes[propName]|0],
                  ),
            })
          , {}),
      productInfo: {
        name,
        prices:
          Object
            .entries(prices)
            .reduce(
              (acc, [currency, price]) => ({
                ...acc,
                [currency]: price + calculateAdditionalCost(
                  properties,
                  selectedPropertyIndexes,
                  currency,
                ),
              }), {},
            ),
        path,
        imagePath,
        propertiesToShowInCart,
      },
    };
  }

  state = {
    quantity: 1,
  };

  componentWillUnmount() {
    this.clearScrollTimeout();
  }

  // Explicit define property for flow
  scrollTimeout = void 0;

  clearScrollTimeout = () => {
    if (typeof this.scrollTimeout !== 'undefined') {
      clearTimeout(this.scrollTimeout);
      delete this.scrollTimeout;
    }
  };

  handleQuantityValueChange = (
    { target: { value } } : { target : HTMLInputElement, },
  ) => {
    const quantity = +value;
    if (isNaturalNumber(quantity))
      this.setState({ quantity });
  }

  hanglePropertyValueChange = (
    { value }: { value: { [propName: string]: ProductPropertyOptionType }},
  ) => void this.setState(value);

  addProductFormSubmit = (event : Event) => {
    const { props } = this;
    const {
      id,
      path,
      currency,
      scrollAnimationConfig,
      onAddProduct,
      generateProductKey,
    } = props;
    const { quantity, ...selectedPropertyIndexes } = this.state;
    const { generateCartProduct } = Product;
    const { target: { children } } = event;
    event.preventDefault();

    if (quantity) {
      this.clearScrollTimeout();
      this.scrollTimeout = setTimeout(() =>
        void animateScroll.scrollTo(
          getAbsoluteOffsetTop(
            children[children.length - 2],
          ) - 5, scrollAnimationConfig,
        )
      , 50);
      const product = generateCartProduct(
        props, quantity, selectedPropertyIndexes,
      );
      onAddProduct(
         generateProductKey(
           id,
           product.properties,
         ),
         product,
         currency,
      );
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
      CheckoutButton,
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
        <p>
          { getLocalization('price', localizationScope) }
        </p>
        { afterPriceNode }
        <form className="m-t-1" onSubmit={addProductFormSubmit}>
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
          <button
            type="submit"
            className="btn btn-success btn-block"
            disabled={!quantity}
          >
            <i className={iconAddProductClassName} />
            {
              getLocalization('addToCart', localizationScope)
            }
          </button>
          { CheckoutButton }
        </form>
      </div>
    );
  }
}
