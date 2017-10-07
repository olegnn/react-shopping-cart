/**
 * @flow
 * @module ProductPropertyInput
 * @extends React.PureComponent
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * React form for product property(options select only).
 *
 */

import React, { PureComponent } from 'react';
import { isObject } from '../../../helpers';

import type {
  GetLocalization,
  InputEvent,
  ProductPropertyOption,
  Prices,
} from '../../../types';

/**
 * @typedef {Object.<string, number>} OptionIndex
 */
export type OptionIndex = {
  [propertyName: string]: number,
};

/**
 * @typedef {Object} OptionObject
 */
export type OptionObject = {|
  onSelect?: (option: OptionObject) => void,
  additionalCost?: Prices,
  value: ProductPropertyOption,
|};

/** @ */
export type PropertyOption = ProductPropertyOption | OptionObject;

/** @ */
export type PropertyOptions = Array<PropertyOption>;

/** @ */
export type OnChange = (obj: { value: OptionIndex }) => void;

export type Props = {|
  name: string,
  options: PropertyOptions,
  selectedOptionIndex?: number,
  currency: string,
  onChange: OnChange,
  getLocalization: GetLocalization,
|};

const defaultProps = {
  selectedOptionIndex: 0,
};

export default class ProductPropertyInput extends PureComponent<Props, void> {
  props: Props;

  static defaultProps = defaultProps;

  static displayName = 'ProductPropertyInput';

  /*
   * If option value is an object, we need to extract primitive value
   */
  static getOptionValue = (value: PropertyOption): ProductPropertyOption =>
    isObject(value) ? ProductPropertyInput.getOptionValue(value.value) : value;

  /*
   * Generate select input options based on options values
   */
  static generateOptionsSelectionList = (
    options: PropertyOptions,
    getLocalization: GetLocalization,
    currency: string,
    localizationScope: Object = {},
  ): Array<React$Element<*>> =>
    options
      .map(ProductPropertyInput.getOptionValue)
      .map((optionValue, index) => (
        <option key={optionValue} value={optionValue}>
          {typeof optionValue === 'string'
            ? getLocalization(optionValue, {
                ...localizationScope,
                ...(isObject(options[index])
                  ? {
                      cost:
                        (isObject(options[index].additionalCost) &&
                          options[index].additionalCost[currency]) ||
                        0,
                    }
                  : {}),
              })
            : optionValue}
        </option>
      ));

  handleSelectInputValueChange = ({ currentTarget, }: InputEvent) => {
    const { value: optionValue, } = currentTarget;
    const { name, options, onChange, } = this.props;

    const { getOptionValue, } = ProductPropertyInput;

    const selectedOptionIndex = options
      .map(getOptionValue)
      .indexOf(optionValue);

    const selectedOption = options[selectedOptionIndex];

    if (
      isObject(selectedOption) &&
      typeof selectedOption.onSelect === 'function'
    )
      selectedOption.onSelect(selectedOption);

    onChange({
      value: { [name]: selectedOptionIndex, },
    });
  };

  render() {
    const {
      name,
      options,
      selectedOptionIndex,
      currency,
      getLocalization,
    } = this.props;

    const { handleSelectInputValueChange, } = this;

    const {
      generateOptionsSelectionList,
      getOptionValue,
    } = ProductPropertyInput;

    const localizationScope = {
      name,
      currency,
      get localizedName() {
        return getLocalization(name, localizationScope);
      },
    };

    return (
      <div className="form-group row">
        <label
          htmlFor={name}
          className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label"
        >
          {getLocalization('propertyLabel', localizationScope)}
        </label>
        <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
          <select
            onChange={handleSelectInputValueChange}
            className="form-control"
            value={getOptionValue(options[selectedOptionIndex | 0])}
          >
            {
              generateOptionsSelectionList(
                options,
                getLocalization,
                currency,
                localizationScope,
              )
            }
          </select>
        </div>
      </div>
    );
  }
}
