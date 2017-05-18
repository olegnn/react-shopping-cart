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

import React, { PureComponent } from 'react';
import { Transition } from 'react-overlays';

import type {
  GetLocalization,
  Link$Component,
} from '../../types';

import { animate, DefaultLinkComponent } from '../../helpers';

/**
 * @memberof CheckoutButton
 * @typedef {Object} Props
 * @prop {number} grandTotal - Required.
 * @prop {string} currency - Current currency. Required.
 * @prop {boolean} hidden - Show or hide button. Required.
 * @prop {string} checkoutURL - Link to checkout page. Required.
 * @prop {GetLocalization} getLocalization - Required.
 * @prop {?string} iconCheckoutClassName - ClassName for cart icon on checkout button.
 * @prop {?Object} transitionConfig - Transition's config for react-overlays Transition.
 * @prop {?Link$Component} linkComponent - React Component, will receive prop `to="%your product's page%"`.
 * I'd recommend you to take a look at react-router's Link.
 */

void null;

export type Props = {|
  grandTotal: number,
  currency: string,
  hidden: boolean,
  /*
   * Link to checkout page.
   */
  checkoutURL: string,
  getLocalization: GetLocalization,
  /*
   * ClassName for cart icon on checkout button.
   */
  iconCheckoutClassName: string,
  /*
   * Transition's config for react-overlays Transition.
   */
  transitionConfig: Object,
  /*
   * React Component, will receive prop `to="%your product's page%"`.
   * I'd recommend you to take a look at react-router's Link.
   */
  linkComponent: Link$Component,
|};

const defaultProps = {
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

export default class
  CheckoutButton extends PureComponent<typeof defaultProps, Props, void> {

  props: Props;

  static defaultProps = defaultProps;

  static displayName = 'CheckoutButton';

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

    return !hidden
    ? <Transition
      in={!hidden}
      {...transitionConfig}
    >
      <LinkComponent
        to={checkoutURL}
        className={
            `btn btn-primary btn-block ${
              !grandTotal ? 'disabled' : 'active'
            }`
        }
        role="button"
      >
        <i className={iconCheckoutClassName} />
        {
          getLocalization('checkoutTotal', localizationScope)
        }
      </LinkComponent>
    </Transition>
    : null;
  }
}
