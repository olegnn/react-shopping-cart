/**
 * @flow
 * @module Product
 * @extends React.Component
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * React component - Product form with price
 *
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
    iconAddProductClassName: PropTypes.string,
  },
  /**
  * @static containerPropTypes
  * @memberof Product
  *
  * @prop {Function<string>} onAddProduct - Callback to call when
  * user want to add product in his cart
  * Example: onAddProduct('macbook-case', { quantity: 30, properties: { colour: 'red' } });
  * Required.
  * @prop {ReactElement} CheckoutButton - Button in the bottom of product.
  * Default is 'icon-cart-plus'
  */
  containerPropTypes = {
    onAddProduct: PropTypes.func.isRequired,
    CheckoutButton: PropTypes.element.isRequired,
    getLocalization: PropTypes.func.isRequired,
  },
  defaultProps = {
    properties: {},
    propertiesToShowInCart: [],
    iconAddProductClassName: 'icon-cart-plus',
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
      path
    } = this.props;
    const { quantity } = this.state;
    return (
    {
      quantity,
      properties:
        Object
          .entries(properties)
          .reduce((obj, [propName, options]) =>
            ({
              ...obj,
              [propName]: options[this.state[propName] || 0],
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
    const { path, onAddProduct } = this.props;
    const { quantity } = this.state;
    const { target } = event;
    event.preventDefault();
    setTimeout(() =>
      animateScroll.scrollTo(
        getAbsoluteOffsetTop(
          target.children[target.children.length - 2]) - 5, {
            duration: 750,
            delay: 0,
            smooth: true,
          })
    , 50);
    return quantity
           &&
           onAddProduct(
             path,
             this.generateProductProps(),
           );
  }

  render() {
    const {
      name,
      prices,
      currency,
      properties,
      CheckoutButton,
      iconAddProductClassName,
      getLocalization,
    } = this.props;

    const {
      quantity,
    } = this.state;

    const {
      addProductFormSubmit,
      handleQuantityValueChange,
      hanglePropertyValueChange,
    } = this;

    const price = prices[currency];

    return (
      <div>
        <p>
          { getLocalization('price', { price, currency }) }
        </p>
        <form className="m-t-1" onSubmit={addProductFormSubmit}>
          {
            Product.createPropertiesInputList(
              properties,
              this.state,
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
