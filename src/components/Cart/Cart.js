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
import React, { PureComponent, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import Transition from 'react-overlays/lib/Transition';

import CartProduct from './CartProduct/CartProduct';
import { animate } from '../../helpers';

const
  /**
   * @static propTypes
   * @memberof Cart
   *
   * @prop {boolean} showHeader - Show or hide header 'Shopping cart'.
   * Default is true
   * @prop {string} iconTrashClassName - ClassName for
   * trash icon on remove button.
   * Default is 'icon-trash'
   * @prop {Object} cartTransition - Cart's config for Transition.
   * Default is
   *   {
   *     style: animate(500),
   *     enteringClassName: 'fadeInUp',
   *     exitingClassName: 'fadeOut',
   *     timeout: 500,
   *   }.
   * Look at src/components/Cart/Cart.js for details
   * @prop {Object} cartItemTransition - Cart item's config
   * for ReactCSSTransitionGroup.
   * Default is
   *   {
   *     transitionName: {
   *       enter: 'bounceInLeft',
   *       leave: 'bounceOutRight',
   *     },
   *     transitionEnterTimeout: 500,
   *     transitionLeaveTimeout: 500,
   *   }.
   * Look at src/components/Cart/Cart.js for details
   */
  propTypes = {
    showHeader: PropTypes.bool,
    iconTrashClassName: PropTypes.string,
    cartTransition: PropTypes.object,
    cartItemTransition: PropTypes.object,
  },
  /**
   * @static containerPropTypes
   * @memberof Cart
   *
   * @prop {Object.<string, ProductType>} products - Products map. Required.
   *
   * @prop {ReactElement} CheckoutButton - Button in the bottom of cart.
   * Required.
   * @prop {Function<string, Object>} onUpdateProduct - Callback
   * function which will be called when product should be updated.
   * First arg is product's key in products, second - props to update.
   * For instance, it may be called like:
   * onUpdateProduct('macbook-case/_red', { quantity : 50 });
   * Required.
   *
   * @prop {Function<string>} onRemoveProduct - Callback to call
   * when need to remove product from products.
   * Accept product's key in products.
   * For example: onRemoveProduct('/shop/macbook-case/_red');
   * Required.
   *
   * @prop {getLocalizationType} getLocalization - Required.
   */
  containerPropTypes = {
    products: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      properties: PropTypes.object,
      productInfo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        prices: PropTypes.objectOf(
          PropTypes.number,
        ).isRequired,
        imagePath: PropTypes.string.isRequired,
        propertiesToShowInCart: PropTypes.arrayOf(
          PropTypes.string,
        ),
      }).isRequired,
    })).isRequired,
    currency: PropTypes.string.isRequired,
    isCartEmpty: PropTypes.bool.isRequired,
    CheckoutButton: PropTypes.element.isRequired,
    onUpdateProduct: PropTypes.func.isRequired,
    onRemoveProduct: PropTypes.func.isRequired,
    getLocalization: PropTypes.func.isRequired,
  },
  defaultProps = {
    showHeader: true,
    iconTrashClassName: 'icon-trash',
    cartTransition: {
      style: animate(500),
      enteringClassName: 'fadeInUp',
      exitingClassName: 'fadeOut',
      timeout: 500,
    },
    cartItemTransition: {
      transitionName: {
        enter: 'bounceInLeft',
        leave: 'bounceOutRight',
      },
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 500,
    },
  };


export default class Cart extends PureComponent {
  static propTypes = { ...propTypes, ...containerPropTypes };
  static defaultProps = defaultProps;

  render() {
    const {
      showHeader,
      products,
      isCartEmpty,
      iconTrashClassName,
      currency,
      cartTransition,
      cartItemTransition,
      onUpdateProduct,
      onRemoveProduct,
      getLocalization,
      CheckoutButton,
    } = this.props;

    return (
      <div className="row m-t-1">
        <Transition
          in={!isCartEmpty}
          unmountOnExit
          {...cartTransition}
        >
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            { showHeader ? getLocalization('shoppingCartTitle') : null }
            <div className="list-group">
              <ReactCSSTransitionGroup
                {...cartItemTransition}
              >
                {
                  Object
                    .entries(products)
                    .map((
                      [productKey,
                        {
                          productInfo: {
                            prices,
                            path,
                            name,
                            imagePath,
                            propertiesToShowInCart,
                          },
                          quantity,
                          properties,
                        },
                      ],
                    ) => (
                      <CartProduct
                        key={productKey}
                        productKey={productKey}
                        quantity={quantity}
                        properties={properties}
                        price={prices[currency]}
                        currency={currency}
                        path={path}
                        name={name}
                        imagePath={imagePath}
                        propertiesToShow={propertiesToShowInCart}
                        iconTrashClassName={iconTrashClassName}
                        onUpdateProduct={onUpdateProduct}
                        onRemoveProduct={onRemoveProduct}
                        getLocalization={getLocalization}
                      />
                    ),
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
}
