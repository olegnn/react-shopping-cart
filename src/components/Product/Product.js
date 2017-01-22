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
   * @prop {Object.<string, Array<(string | number)>>} properties - Custom
   * product properties.
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
  * @prop {getBoundLocalizationType} getLocalization - Required.
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
      [propertyName: string]: Array<string|number>
    },
    propertiesSelectedIndexes,
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
          onChange={handlePropertyValueChange}
          getLocalization={getLocalization}
        />,
    );

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
      properties : { [propName : string] : string|number },
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
    return {
      id,
      quantity,
      properties:
        Object
          .entries(properties)
          .reduce((obj, [propName, options]) =>
            ({
              ...obj,
              [propName]: options[selectedPropertyIndexes[propName]|0],
            })
          , {}),
      productInfo: {
        name,
        prices,
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
    { value }: { value: { [propName: string]: string|number }},
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
      name,
      prices,
      currency,
      properties,
      iconAddProductClassName,
      afterPriceNode,
      CheckoutButton,
      getLocalization,
    } = this.props;

    const {
      quantity,
    } = this.state;

    const {
      addProductFormSubmit,
      handleQuantityValueChange,
      hanglePropertyValueChange,
      state,
    } = this;

    const {
      createPropertiesInputList,
    } = Product;

    const price = prices[currency];

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
              state,
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
