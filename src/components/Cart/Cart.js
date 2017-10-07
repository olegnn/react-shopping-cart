/**
 * @flow
 * @module Cart
 * @extends React.PureComponent
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * Component which represents shopping cart.
 */

import React, { PureComponent } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import classNames from 'classnames';

import type {
  Link$Component,
  Products,
  UpdateProduct,
  RemoveProduct,
  GetLocalization,
} from '../../types';

import CartProduct from './CartProduct/CartProduct';
import { DefaultLinkComponent } from '../../helpers';

/**
 * @memberof Cart
 * @typedef {Object} Props
 * @prop {Products} products - Products map. Required.
 * @prop {string} currency - Current currency. Required.
 * @prop {boolean} isCartEmpty Display cart or not. Required.
 * @prop {UpdateProduct} onUpdateProduct - Function which will be called when product should be updated.
 * First arg is product's key in products map, second - updated product. Required.
 * @prop {RemoveProduct} onRemoveProduct - Function to call when product should be removed from cart.
 * One argument - product's key. Required.
 * @prop {GetLocalization} getLocalization - Required.
 * @prop {?boolean} hideHeader - Hide cart's header. Default is false.
 * @prop {?ReactElement} checkoutButton - Button to display in the bottom of cart. Default is null.
 * @prop {?string} iconTrashClassName - ClassName for trash icon on remove button.
 * Default is 'fa fa-trash mx-1'.
 * @prop {?string} altProductImageSrc - Alt image src for products. Default is ''.
 * @prop {?Object} cartCSSTransition - Cart's config for react-transition-group/CSSTransition.
 * Look at src/components/Cart/Cart.js for details.
 * @prop {?Object} cartItemCSSTransition - Cart item's config for react-transition-group/CSSTransition.
 * Look at src/components/Cart/Cart.js for details.
 * @prop {?Link$Component} linkComponent - React Component, will receive prop `to="%your product's page%"`.
 * I'd recommend you to take a look at react-router's Link.
 */
void null;

export type Props = {|
  /*
   * Products map.
   */
  products: Products,
  /*
   * Current currency.
   */
  currency: string,
  /*
   * Display cart or not
   */
  isCartEmpty: boolean,
  /*
   * Function which will be called when product should be updated.
   * First arg is product's key in products map, second - updated product.
   */
  onUpdateProduct: UpdateProduct,
  /*
   * Function to call when product should be removed from cart.
   * One argument - product's key.
   */
  onRemoveProduct: RemoveProduct,
  getLocalization: GetLocalization,
  /*
   * Hide cart's header.
   */
  hideHeader?: boolean,
  /*
   * Button to display in the bottom of cart.
   */
  checkoutButton?: React$Element<*>,
  /*
   * ClassName for trash icon on remove button.
   */
  iconTrashClassName?: string,
  /*
   * Alt image src for products
   */
  altProductImageSrc?: string,
  /*
   * Cart's config for react-transition-group/CSSTransition.
   * Look at src/components/Cart/Cart.js for details.
   */
  cartCSSTransition?: Object,
  /*
   * Cart item's config for react-transition-group/CSSTransition.
   * Look at src/components/Cart/Cart.js for details.
   */
  cartItemCSSTransition?: Object,
  /*
   * React Component, will receive prop `to="%your product's page%"`.
   * I'd recommend you to take a look at react-router's Link.
   */
  linkComponent?: Link$Component,
|};

const defaultProps = {
  checkoutButton: null,
  hideHeader: false,
  iconTrashClassName: 'fa fa-trash mx-1',
  altProductImageSrc: '',
  cartCSSTransition: {
    classNames: {
      enter: 'zoomIn',
      exit: 'fadeOut',
    },
    mountOnEnter: true,
    unmountOnExit: true,
    enter: true,
    exit: true,
    timeout: {
      enter: 1e3,
      exit: 5e2,
    },
  },
  cartItemCSSTransition: {
    classNames: {
      enter: 'bounceInLeft',
      exit: 'bounceOutRight',
    },
    enter: true,
    exit: true,
    timeout: {
      enter: 1e3,
      exit: 5e2,
    },
  },
  linkComponent: DefaultLinkComponent,
};


export default class Cart
  extends PureComponent<Props, void> {
  props: Props;

  static defaultProps = defaultProps;

  static displayName = 'Cart';

  render() {
    const {
      hideHeader,
      products,
      isCartEmpty,
      iconTrashClassName,
      currency,
      altProductImageSrc,
      cartCSSTransition,
      cartItemCSSTransition,
      onUpdateProduct,
      onRemoveProduct,
      getLocalization,
      checkoutButton,
      linkComponent,
    } = this.props;


    return (
      <CSSTransition
        in={!isCartEmpty}
        {...cartCSSTransition}
      >
        <div className="my-1 w-100 list-group animated">
          { !hideHeader ? getLocalization('shoppingCartTitle') : null }
          <TransitionGroup>
            {
              Object
                .entries(products)
                .map(([
                    productKey: string,
                    {
                      prices,
                      path,
                      name,
                      imageSrc,
                      propertiesToShowInCart,
                      quantity,
                      properties,
                    },
                  ]) => (
                    <CSSTransition
                      {...cartItemCSSTransition}
                      key={productKey}
                    >
                      <CartProduct
                        product={products[productKey]}
                        productKey={productKey}
                        quantity={quantity}
                        properties={properties}
                        price={prices[currency]}
                        currency={currency}
                        path={path}
                        name={name}
                        imageSrc={imageSrc}
                        altImageSrc={altProductImageSrc}
                        propertiesToShow={propertiesToShowInCart}
                        iconTrashClassName={iconTrashClassName}
                        onUpdateProduct={onUpdateProduct}
                        onRemoveProduct={onRemoveProduct}
                        getLocalization={getLocalization}
                        linkComponent={linkComponent}
                      />
                    </CSSTransition>
                  ))
            }
          </TransitionGroup>
          <div className="row my-1">
            <div
              className={
                classNames(
                  'col-xs-12', 'col-sm-12', 'col-md-8', 'col-lg-6',
                  'col-xl-6', 'm-auto',
                )
              }
            >
              { checkoutButton }
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  }
}
