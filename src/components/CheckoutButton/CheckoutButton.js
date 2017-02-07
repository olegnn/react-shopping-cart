/**
 * @flow
 * @module CheckoutButton
 * @extends React.PureComponent
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * Checkout button with grand total.
 *
 */
import React, { PureComponent, PropTypes } from 'react';
import Transition from 'react-overlays/lib/Transition';

import { animate, DefaultLinkComponent } from '../../helpers';

const
/**
  * @static propTypes
  * @memberof CheckoutButton
  *
  * @prop {string} checkoutURL - Link to checkout page.
  * Required.
  * @prop {string} iconCheckoutClassName - ClassName
  * for cart icon on checkout button.
  * Default is 'icon-basket'.
  * @prop {Object} transitionConfig - CheckoutButton's transition config
  * for react-overlays Transition.
  * Default is {
  *   style: animate(500),
  *   enteringClassName: 'fadeInUp',
  *   exitingClassName: 'fadeOut',
  *   timeout: 500,
  *   unmountOnExit: true,
  * }.
  * @prop {Function} linkComponent - React Component(stateful or not,
  * as you wish), which represents a Link. It will receive props:
  * role="button",
  * to="%your checkout%",
  * className-"%bs4's className for button%".
  * I'd recommend you to take a look at react-router's Link.
  * Wrapped <a/> by default.
  */
  propTypes = {
    checkoutURL: PropTypes.string.isRequired,
    iconCheckoutClassName: PropTypes.string,
    transitionConfig: PropTypes.object,
    linkComponent: PropTypes.func,
  },
/**
  * @static containerPropTypes
  * @memberof CheckoutButton
  *
  * @prop {number} grandTotal - Amount of money to pay. Required.
  * @prop {boolean} hidden - Show or hide button. Required.
  * @prop {string} currency - Current cart currency. Required.
  * @prop {getLocalizationType} getLocalization - Required.
  */
  containerPropTypes = {
    grandTotal: PropTypes.number.isRequired,
    hidden: PropTypes.bool.isRequired,
    currency: PropTypes.string.isRequired,
    getLocalization: PropTypes.func.isRequired,
  },
  defaultProps = {
    iconCheckoutClassName: 'icon-basket',
    transitionConfig: {
      style: animate(500),
      enteringClassName: 'fadeInUp',
      exitingClassName: 'fadeOut',
      timeout: 500,
      unmountOnExit: true,
    },
    linkComponent: DefaultLinkComponent,
  };

export default class CheckoutButton extends PureComponent {

  render() {
    const {
      grandTotal,
      hidden,
      checkoutURL,
      currency,
      iconCheckoutClassName,
      transitionConfig,
      linkComponent: LinkComponent,
      getLocalization,
    } = this.props;

    const localizationScope = {
      currency,
      total: grandTotal,
      get localizedCurrency() {
        return getLocalization(currency, localizationScope);
      },
    };

    return !hidden && (
      <Transition
        in={!hidden}
        {...transitionConfig}
      >
        <LinkComponent
          to={checkoutURL}
          className={
            `btn btn-primary btn-block ${!grandTotal ? 'disabled' : 'active'}`
          }
          role="button"
        >
          <i className={iconCheckoutClassName} />
          {
            getLocalization('checkoutTotal', localizationScope)
          }
        </LinkComponent>
      </Transition>
    );
  }
}

CheckoutButton.propTypes = { ...propTypes, ...containerPropTypes };
CheckoutButton.defaultProps = defaultProps;
