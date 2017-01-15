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
import { isNaturalNumber } from '../../helpers';

const
  /**
   * @static propTypes
   * @memberof Product
   *
   * @prop {string} name - Name to display. Required
   * @prop {string} path - Path to product. Required
   * @prop {number} price - Price (value only). Required
   * @prop {string} imagePath - Path to main image. Required
   * @prop {string} currency - Price currency. Default is £
   * @prop {Object.<string, Array<(string | number)>>} options - Custom
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
  */
  containerPropTypes = {
    CheckoutButton: PropTypes.element.isRequired,
    onAddProduct: PropTypes.func.isRequired,
    getLocalization: PropTypes.func.isRequired,
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

const getAbsoluteOffsetTop = (
  { offsetTop, offsetParent } : HTMLElement | Object = {},
) : number =>
  offsetTop + (offsetParent && getAbsoluteOffsetTop(offsetParent));

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
  ): Array<React$Element<any>> =>
    Object.entries(properties).map(
      ([name, options]) =>
        <ProductPropertyInput
          key={name}
          name={name}
          options={options}
          selectedOptionIndex={propertiesSelectedIndexes[name]}
          onChange={handlePropertyValueChange}
          getLocalization={getLocalization}
        />,
    );

  state = {
    quantity: 1,
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

  generateProductProps = () : Object => {
    const {
      properties,
      propertiesToShowInCart,
      prices,
      name,
      imagePath,
      path,
    } : {
      properties: { [propName: string]: string|number },
      propertiesToShowInCart: Array<string>,
      prices: { [currency: string]: number },
      name: string,
      imagePath: string,
      path: string,
    } = this.props;

    const { state } = this;

    const { quantity } = state;

    return (
    {
      quantity,
      properties:
        Object
          .entries(properties)
          .reduce((obj, [propName, options]) =>
            ({
              ...obj,
              [propName]: options[state[propName] || 0],
            })
          , {}),
      productInfo: {
        name,
        prices,
        path,
        imagePath,
        propertiesToShowInCart,
      },
    }
    );
  }

  addProductFormSubmit = (event : Event) => {
    const {
      id,
      path,
      currency,
      scrollAnimationConfig,
      onAddProduct,
    } = this.props;
    const { quantity } = this.state;
    const { generateProductProps } = this;
    const { target } = event;
    event.preventDefault();
    setTimeout(() =>
      animateScroll.scrollTo(
        getAbsoluteOffsetTop(
          target.children[target.children.length - 2],
        ) - 5, scrollAnimationConfig,
      )
    , 50);
    if (quantity) {
      onAddProduct(
         id,
         generateProductProps(),
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

    const localizedCurrency = getLocalization(currency);

    return (
      <div>
        <p>
          { getLocalization('price', { price, currency: localizedCurrency }) }
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
              { getLocalization('quantityLabel', { quantity }) }
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
              getLocalization('addToCart', {
                quantity,
                price,
                currency,
                name,
              })
            }
          </button>
          { CheckoutButton }
        </form>
      </div>
    );
  }
}
