/**
 * @flow
 * @module ProductPropertyLabel
 * @extends React.PureComponent
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * React component to display product's property value in cart.
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';

export type Props = {|
  name: string | React$Element<*>,
  value: string | number | React$Element<*>,
|};

const defaultProps = {};

export default class ProductPropertyLabel
  extends PureComponent<Props, void> {
  props: Props;

  static defaultProps = defaultProps;

  static displayName = 'ProductPropertyLabel';

  render() {
    const { name, value, } = this.props;
    return (
      <div className="form-group row">
        <div
          className={
            classNames('col-xs-6', 'col-md-5', 'col-lg-4')
          }
        > { name }
        </div>
        <div
          className={
            classNames('col-xs-6', 'col-md-7', 'col-lg-8')
          }
        > { value }
        </div>
      </div>
    );
  }
}
