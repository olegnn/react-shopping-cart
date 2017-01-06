/**
 * @flow weak
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
import capitalize from 'underscore.string/capitalize';

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
    currency: PropTypes.string,
    options: PropTypes.objectOf(
      PropTypes.arrayOf(
        PropTypes.oneOfType(
          [
            PropTypes.string,
            PropTypes.number,
          ],
        ),
      ),
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
    currency: '£',
    options: {},
    iconAddProductClassName: 'icon-cart-plus',
  };

const getAbsoluteOffsetTop = (
  { offsetTop, offsetParent } : HTMLElement | Object = {},
) : number =>
  offsetTop + (offsetParent && getAbsoluteOffsetTop(offsetParent));

export default class Product extends Component {

  static propTypes = { ...propTypes, ...containerPropTypes };
  static defaultProps = defaultProps;

  state = {
    quantity: 1,
  };

  handleQuantityValueChange = (
    { target: { value } } : { target : HTMLInputElement, },
  ) => {
    const quantity = Number.parseInt(value, 10);
    if (isNaturalNumber(quantity))
      this.setState({ quantity });
  }

  handleSelectInputValueChange = (
    name : string,                 // product property name
    list : Array<string | number>, // product property options list
    { target: { value: listOptionName } } : { target : HTMLInputElement, },
  ) => void this.setState({ [name]: list.indexOf(listOptionName) });

  /*
   * Return form-group consits of select input element
   * label value will be capitalized name
   * options - the list array
   */
  createSelectInputFromArray(
    name : string,
    list : Array<string | number>,
  ) : React$Element<any> {
    return (
      <div key={name} className="form-group row">
        <label
          htmlFor={name}
          className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label"
        >
          { `${capitalize(name)}:` }
        </label>
        <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
          <select
            onChange={this.handleSelectInputValueChange.bind(this, name, list)}
            className="form-control"
            value={list[this.state[name] || 0]}
          >
            {
              /*
               * Generate select input options based on list values
               */
              list.map((v, k) =>
                <option key={v + k} value={v}>
                  { capitalize(v) }
                </option>,
              )
            }
          </select>
        </div>
      </div>
    );
  }

  generateProductProps = () : Object => {
    const { options, prices, name, imagePath, path } = this.props;
    const { quantity } = this.state;
    return (
    {
      quantity,
      properties:
        Object
          .entries(options)
          .reduce((obj, [propName, list]) =>
            ({
              ...obj,
              [propName]: list[this.state[propName] || 0],
            })
          , {}),
      productInfo: {
        name,
        prices,
        path,
        imagePath,
      },
    }
    );
  }

  addProductFormSubmit = (event : Event) => {
    event.preventDefault();
    const { path, onAddProduct } = this.props;
    const { quantity } = this.state;
    setTimeout(target =>
      animateScroll.scrollTo(
        getAbsoluteOffsetTop(
          target.children[target.children.length - 2]) - 5, {
            duration: 750,
            delay: 0,
            smooth: true,
          })
    , 50, event.target);
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
      options,
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
    } = this;

    const price = prices[currency];

    return (
      <div>
        <p>
          { getLocalization('price', { price, currency }) }
        </p>
        <form className="m-t-1" onSubmit={addProductFormSubmit}>
          {
            Object.entries(options).map(
              option => this.createSelectInputFromArray(...option),
            )
          }
          <div className="form-group row">
            <label
              htmlFor="product-quantity"
              className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label"
            >
              { getLocalization('quantityLabel') }
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
