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
import CSSTransition from 'react-transition-group/CSSTransition';
import classNames from 'classnames';

import type {
  GetLocalization,
  Link$Component,
} from '../../types';

import { DefaultLinkComponent } from '../../helpers';

/**
 * @memberof CheckoutButton
 * @typedef {Object} Props
 * @prop {number} grandTotal - Required.
 * @prop {string} currency - Current currency. Required.
 * @prop {boolean} hidden - Show or hide button. Required.
 * @prop {string} checkoutURL - Link to checkout page. Required.
 * @prop {GetLocalization} getLocalization - Required.
 * @prop {?string} iconCheckoutClassName - ClassName for cart icon on checkout button. Default is 'fa fa-shopping-cart mx-1'.
 * @prop {?Object} buttonCSSTransition - Transition's config for react-transition-group/CSSTransition.
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
  iconCheckoutClassName?: string,
  /*
   * Transition's config for react-transition-group/CSSTransition.
   */
  buttonCSSTransition?: Object,
  /*
   * React Component, will receive prop `to="%your product's page%"`.
   * I'd recommend you to take a look at react-router's Link.
   */
  linkComponent?: Link$Component,
|};

const defaultProps = {
  iconCheckoutClassName: 'fa fa-shopping-cart mx-1',
  buttonCSSTransition: {
    classNames: {
      enter: 'fadeInUp',
      exit: 'fadeOut',
    },
    enter: true,
    exit: true,
    timeout: {
      enter: 0,
      exit: 5e2,
    },
    mountOnEnter: true,
    unmountOnExit: true,
  },
  linkComponent: DefaultLinkComponent,
};

export default class CheckoutButton
  extends PureComponent<Props, void> {
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
      buttonCSSTransition,
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

    return (
      <CSSTransition
        in={!hidden}
        {...buttonCSSTransition}
      >
        <LinkComponent
          to={checkoutURL}
          className={
            classNames(
              'btn', 'btn-primary', 'btn-block',
              'animated',
              {
                disabled: !grandTotal,
              },
            )
          }
          role="button"
        >
          <i className={iconCheckoutClassName} />
          <span>
            { getLocalization('checkoutTotal', localizationScope) }
          </span>
        </LinkComponent>
      </CSSTransition>
    );
  }
}
