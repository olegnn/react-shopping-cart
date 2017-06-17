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
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Transition } from 'react-overlays';
import classNames from 'classnames';

import type {
  Link$Component,
  Products,
  UpdateProduct,
  RemoveProduct,
  GetLocalization,
} from '../../types';

import CartProduct from './CartProduct/CartProduct';
import { animate, DefaultLinkComponent } from '../../helpers';

/**
 * @memberof Cart
 * @typedef {Object} Props
 * @prop {Products} products - Required.
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
 * @prop {?Object} cartTransition - Cart's config for Transition.
 * Look at src/components/Cart/Cart.js for details.
 * @prop {?Object} cartItemTransition - Cart item's config for react-transition-group.
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
  hideHeader: boolean,
  /*
   * Button to display in the bottom of cart.
   */
  checkoutButton: React$Element<*>,
  /*
   * ClassName for trash icon on remove button.
   */
  iconTrashClassName: string,
  /*
   * Alt image src for products
   */
  altProductImageSrc: string,
  /*
   * Cart's config for Transition.
   * Look at src/components/Cart/Cart.js for details.
   */
  cartTransition: Object,
  /*
   * Cart item's config for react-transition-group.
   * Look at src/components/Cart/Cart.js for details.
   */
  cartItemTransition: Object,
  /*
   * React Component, will receive prop `to="%your product's page%"`.
   * I'd recommend you to take a look at react-router's Link.
   */
  linkComponent: Link$Component,
|};

const defaultProps = {
  checkoutButton: null,
  hideHeader: false,
  iconTrashClassName: 'fa fa-trash mx-1',
  altProductImageSrc: '',
  cartTransition: {
    style: animate(500),
    enteringClassName: 'fadeInUp',
    exitingClassName: 'fadeOut',
    exitedClassName: 'invisible',
    timeout: 0,
  },
  cartItemTransition: {
    transitionName: {
      enter: 'bounceInLeft',
      leave: 'bounceOutRight',
    },
    transitionEnterTimeout: 500,
    transitionLeaveTimeout: 500,
  },
  linkComponent: DefaultLinkComponent,
};


export default class Cart
  extends PureComponent<typeof defaultProps, Props, void> {

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
      cartTransition,
      cartItemTransition,
      onUpdateProduct,
      onRemoveProduct,
      getLocalization,
      checkoutButton,
      linkComponent,
    } = this.props;

    return (
      <div className="my-1">
        <Transition
          in={!isCartEmpty}
          {...cartTransition}
        >
          <div className="w-100">
            { !hideHeader ? getLocalization('shoppingCartTitle') : null }
            <div className="list-group">
              <CSSTransitionGroup
                {...cartItemTransition}
              >
                {
                  Object
                    .entries(products)
                    .map(
                      ([
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
                        <CartProduct
                          product={products[productKey]}
                          key={productKey}
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
                      ),
                    )
                }
              </CSSTransitionGroup>
            </div>
            <div className="row my-1">
              <div
                className={
                  classNames(
                    'col-xs-12', 'col-sm-12', 'col-md-8', 'col-lg-6',
                    'col-xl-6', 'offset-xs-0', 'offset-sm-0', 'offset-md-2',
                    'offset-lg-3', 'offset-xl-3',
                  )
                }
              >
                { checkoutButton }
              </div>
            </div>
          </div>
        </Transition>
      </div>
    );
  }
}
