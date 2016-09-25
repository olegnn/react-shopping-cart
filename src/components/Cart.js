/**
 * @flow weak
 * @module Cart
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * React stateless component which represents shopping cart
 */
import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import capitalize from 'underscore.string/capitalize';
import Transition from 'react-overlays/lib/Transition';

import { animate } from '../helpers';

const
  /**
   * @static propTypes
   * @memberof Cart
   *
   * @prop {Array<string>} productPropsToShow - Array of product's
   * props which need to be shown in cart.
   * Default is ['colour', 'size']
   *
   * @prop {boolean} showHeader - Show or hide header 'Shopping cart'.
   * Default is true
   * @prop {string} iconTrashClassName - ClassName for trash icon on remove button.
   * Default is 'icon-trash'
   */
  propTypes = {
    productPropsToShow: PropTypes.arrayOf(PropTypes.string),
    showHeader: PropTypes.bool,
    iconTrashClassName: PropTypes.string,
  },
  /**
   * @static containerPropTypes
   * @memberof Cart
   *
   * @prop {Object.<string, ProductType>} products - Products map. Required
   * @prop {Function<string, Object>} onUpdateProduct - Callback
   * function which will be called when product should be updated.
   * First arg is product's key in products, second - props to update.
   * For instance, it may be called like:
   * onUpdateProduct('/shop/macbook-case/_red', { quantity : 50});
   * Required.
   *
   * @prop {Function<string>} onRemoveProduct - Callback to call
   * when need to remove product from products. Accept product's key in products.
   * For example: onRemoveProduct('/shop/macbook-case/_red');
   * Required.
   *
   * @prop {React Element} CheckoutButton - Button in the bottom of cart.
   * Required.
   */
  containerPropTypes = {
    products: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      properties: PropTypes.object,
      productInfo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
        imagePath: PropTypes.string.isRequired,
      }).isRequired,
    })).isRequired,
    isCartEmpty: PropTypes.bool.isRequired,
    onUpdateProduct: PropTypes.func.isRequired,
    onRemoveProduct: PropTypes.func.isRequired,
    CheckoutButton: PropTypes.element.isRequired,
  },
  defaultProps = {
    productPropsToShow: ['colour', 'size'],
    showHeader: true,
    iconTrashClassName: 'icon-trash',
  };

/*
 * Create form-group for each of properties which is in productPropsToShow
 * array
 * Returning array may contain false values (when prop is in properties, but not visible)
 */
function createProductDescription(
  { properties } : Object,
  productPropsToShow : Array<string>
) : Array<React$Element<any> | false> {
  return Object.entries(properties).map(([k, v]) =>
  !!(productPropsToShow.indexOf(k) + 1) &&
  (
    <div key={ k + v } className="form-group row">
      <label htmlFor={ k } className="col-xs-6 col-md-5 col-lg-4 col-form-label" >
        { capitalize(k) }:
      </label>
      <div className="col-xs-6 col-md-7 col-lg-8 col-form-label">
        { capitalize(v) }
      </div>
    </div>)
  );
}

/*
 * Create product's list item
 */
function createProductGroup(
  products : ProductsMapType,
  productPropsToShow : Array<string>,
  onUpdateProduct : onUpdateProductType,
  onRemoveProduct : onRemoveProductType,
  iconTrashClassName : string) : Array<React$Element<any>> {
  return Object.entries(products).map(([productKey, { id, ...product, productInfo }]) => (
    <div key={ productKey } className="list-group-item list-group-item-action animated">
      <Link to={ id }>
        <div className="list-group-item-heading">
          <h5>{ productInfo.name }</h5>
        </div>
      </Link>
      <div className="list-group-item-text row">
        <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 m-b-1">
          <Link to={ id }>
            <img className="img-fluid" src={ productInfo.imagePath } />
          </Link>
        </div>
        <div className="col-xs-12 col-sm-4 col-md-4 col-lg-5">
          <div className="form-group row">
            <label htmlFor="quantity" className="col-xs-6 col-md-5 col-lg-4 col-form-label" >Quantity:</label>
            <div className="col-xs-6 col-md-7 col-lg-8">
              <input
                type="number"
                className="form-control"
                value={ product.quantity }
                onChange={
                  ({ target: { value } }) =>
                    /*
                     * Check if quantity value is correct and then update product
                     */
                    +value > -1 ?
                    onUpdateProduct(productKey, { quantity: +value })
                    : 0
                }
              />
            </div>

          </div>
          { createProductDescription(product, productPropsToShow) }
          <div className="form-group row">
            <label htmlFor="price" className="col-xs-6 col-md-5 col-lg-4 col-form-label" >
              Price:
            </label>
            <div className="col-xs-6 col-md-7 col-lg-8 col-form-label">
              { productInfo.currency + (+productInfo.price).toFixed(2) }
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="total" className="col-xs-6 col-md-5 col-lg-4 col-form-label" >
              Total:
            </label>
            <div className="col-xs-6 col-md-7 col-lg-8 col-form-label">
              { productInfo.currency + (productInfo.price * product.quantity).toFixed(2) }
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3">
          <div className="form-group row">
            <div className="col-md-12 text-xs-center">
              <button
                className="btn btn-danger form-control"
                onClick={
                  () => onRemoveProduct(productKey)
                }
              >
                <i className={ iconTrashClassName } />
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  );
}

function Cart (
  /*
   * Look at the propTypes
   */
  {
    productPropsToShow,
    showHeader,
    products,
    isCartEmpty,
    onUpdateProduct,
    onRemoveProduct,
    CheckoutButton,
    iconTrashClassName,
  } : Object) : React$Element<any> {
  return (
    <div className="row m-t-1">
      <Transition
        style={ animate(500) }
        in={ !isCartEmpty }
        enteringClassName="fadeInUp"
        exitingClassName="fadeOut"
        timeout={ 500 }
        unmountOnExit
      >
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          { showHeader ? <h4>Shopping cart</h4> : void 0 }
          <div className="list-group">
            <ReactCSSTransitionGroup
              transitionName={ {
                enter: 'bounceInLeft',
                leave: 'bounceOutRight',
              } }
              transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 500 }
            >
              {
                createProductGroup(
                  products,
                  productPropsToShow,
                  onUpdateProduct,
                  onRemoveProduct,
                  iconTrashClassName
                )
              }
            </ReactCSSTransitionGroup>
          </div>
          <div className="row m-t-1">
            <div className="col-xs-0 col-sm-2 col-md-2 col-lg-3 col-xl-3" />
            <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6 col-xl-6">
              { CheckoutButton }
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}

Cart.propTypes = { ...propTypes, ...containerPropTypes };
Cart.defaultProps = defaultProps;

export default Cart;
