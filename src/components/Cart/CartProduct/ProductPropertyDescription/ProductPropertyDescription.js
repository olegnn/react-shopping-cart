/**
 * @flow
 * @module ProductPropertyDescription
 * @extends React.PureComponent
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * Component to display product property's description in cart.
 */

import React, { PureComponent } from 'react';

import type {
  GetLocalization,
  ProductPropertyOption,
} from '../../../../types';

export type Props = {|
  name: string,
  value: ProductPropertyOption,
  getLocalization: GetLocalization,
|};

const defaultProps = {};

export default class
  ProductPropertyDescription extends
    PureComponent<typeof defaultProps, Props, void> {

  props: Props;

  static defaultProps = defaultProps;

  static displayName = 'ProductPropertyDescription';

  render() {
    const {
      name,
      value,
      getLocalization,
    } = this.props;

    const localizationScope = {
      name,
      value,
      get localizedName() {
        return getLocalization(name, localizationScope);
      },
      get localizedValue() {
        return typeof value === 'string'
             ? getLocalization(value, localizationScope)
             : value;
      },
    };

    return (
      <div className="form-group row">
        <div
          className="col-xs-6 col-md-5 col-lg-4"
        >
          {
            getLocalization(
              'productPropertyLabel', localizationScope,
            )
          }
        </div>
        <div className="col-xs-6 col-md-7 col-lg-8">
          {
            getLocalization(
              'productPropertyValue', localizationScope,
            )
          }
        </div>
      </div>
    );
  }
}
