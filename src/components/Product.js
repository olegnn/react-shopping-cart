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
   * @prop {Object.<string, Array<(string | number)>>} options - Custom product properties.
   * Default is {}
   * @prop {string} iconAddProductClassName - ClassName for cart icon on add to button.
   * Default is 'icon-cart-plus'
   */
  propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imagePath: PropTypes.string.isRequired,
    currency: PropTypes.string,
    options: PropTypes.objectOf(
      PropTypes.arrayOf(
        PropTypes.oneOfType(
          [
            PropTypes.string,
            PropTypes.number,
          ]
        )
      )
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
  * @prop {React Element} CheckoutButton - Button in the bottom of product.
  * Default is 'icon-cart-plus'
  */
  containerPropTypes = {
    onAddProduct: PropTypes.func.isRequired,
    CheckoutButton: PropTypes.element.isRequired,
  },
  defaultProps = {
    currency: '£',
    options: {},
    iconAddProductClassName: 'icon-cart-plus',
  };

function getAbsoluteOffsetTop({ offsetTop, offsetParent } : HTMLElement | Object = {}) : number {
  return offsetTop + (offsetParent && getAbsoluteOffsetTop(offsetParent));
}

export default class Product extends Component {

  static propTypes = { ...propTypes, ...containerPropTypes };
  static defaultProps = defaultProps;

  state = {
    quantity: 1,
  };

  handleQuantityValueChange = (
    { target: { value } } : { target : HTMLInputElement, }
  ) => {
    +value > -1 ? this.setState({ quantity: +value }) : 0;
  }

  handleSelectInputValueChange = (
    name : string,                 // product property name
    list : Array<string | number>, // product property options list
    { target: { value: listOptionName } } : { target : HTMLInputElement, }
  ) => {
    this.setState({ [name]: list.indexOf(listOptionName) });
  }

  /*
   * Return form-group consits of select input element
   * label value will be capitalized name
   * options - the list array
   */
  createSelectInputFromArray(name : string, list : Array<string | number>) : React$Element<any> {
    return (
      <div key={ name } className="form-group row">
        <label htmlFor={ name } className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label">
          { capitalize(name) + ':' }
        </label>
        <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
          <select
            onChange={ this.handleSelectInputValueChange.bind(this, name, list) }
            className="form-control"
            value={ list[this.state[name] || 0] }
          >
            {
              /*
               * Generate select input options based on list values
               */
              list.map((v, k) =>
                <option key={ v + k } value={ v }>
                  { capitalize(v) }
                </option>
              )
            }
          </select>
        </div>
      </div>
    );
  }

  generateProductProps() : Object {
    const { options, price, name, imagePath, currency } = this.props;
    const { quantity } = this.state;
    return (
      {
        quantity,
        properties: Object.entries(options).reduce((obj, [propName, list]) =>
        ({
          ...obj,
          [propName]: list[this.state[propName] || 0],
        })
      , {}),
        productInfo: {
          name,
          price,
          currency,
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
             this.generateProductProps()
           );
  }

  render() {
    const { price, currency, options, CheckoutButton, iconAddProductClassName } = this.props;

    return (
      <div>
        <p>
          <strong>
            Price: { currency + price.toFixed(2) }
          </strong>
        </p>
        <form className="m-t-1" onSubmit={ this.addProductFormSubmit }>
          {
            Object.entries(options).map(
              option => this.createSelectInputFromArray(...option)
            )
          }
          <div className="form-group row">
            <label htmlFor="product-quantity" className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label">
              Quantity:
            </label>
            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
              <input onChange={ this.handleQuantityValueChange } className="form-control" type="number" value={ this.state.quantity } />
            </div>
          </div>
          <button type="submit" className="btn btn-success btn-block" disabled={ !this.state.quantity }>
            <i className={ iconAddProductClassName } />
            Add to cart
          </button>
          { CheckoutButton }
        </form>
      </div>
    );
  }
}
