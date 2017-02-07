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
import React, { PureComponent, PropTypes } from 'react';

const
  propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({
          additionalCost: PropTypes.objectOf(
            PropTypes.number,
          ),
          onSelect: PropTypes.func,
          value: PropTypes.oneOfType(
            [
              PropTypes.string,
              PropTypes.number,
            ],
          ).isRequired,
        }),
      ]),
    ).isRequired,
    selectedOptionIndex: PropTypes.number,
    currency: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    getLocalization: PropTypes.func.isRequired,
  },
  defaultProps = {
    selectedOptionIndex: 0,
  };

export default class ProductPropertyInput extends PureComponent {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  /*
   * If option value is an object, we need to extract primitive value
   */
  static getOptionValue = (
    value : number | string | Object,
  ) : number | string =>
    typeof value === 'object'
      ? ProductPropertyInput.getOptionValue(value.value)
      : value;

  /*
   * Generate select input options based on options values
   */
  static generateOptionsSelectionList = (
    options : Array<ProductPropertyOptionType>,
    getLocalization : getLocalizationType,
    currency : string,
    localizationScope : Object = {},
  ) : Array<React$Element<any>> =>
    options
      .map(ProductPropertyInput.getOptionValue)
      .map(
        (optionValue, index) =>
          <option key={optionValue} value={optionValue}>
            {
              typeof optionValue === 'string'
              ? getLocalization(
                  optionValue,
                {
                  ...localizationScope,
                  ...(
                    typeof options[index] === 'object'
                    ? {
                      cost: options[index].additionalCost
                            && options[index].additionalCost[currency]
                            || 0,
                    }
                    : {}
                  ),
                },
              )
              : optionValue
            }
          </option>,
      );

  handleSelectInputValueChange = (
    { target: { value: optionValue } } : { target : HTMLInputElement, },
  ) => {
    const {
      name,
      options,
      onChange,
    } = this.props;

    const {
      getOptionValue,
    } = ProductPropertyInput;

    const selectedOptionIndex =
      options
        .map(getOptionValue)
        .indexOf(optionValue);

    const selectedOption = options[selectedOptionIndex];

    if (typeof selectedOption.onSelect === 'function')
      selectedOption.onSelect(selectedOption);

    onChange({
      value: { [name]: selectedOptionIndex },
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

    const {
      handleSelectInputValueChange,
    } = this;

    const {
      generateOptionsSelectionList,
      getOptionValue,
    } = ProductPropertyInput;

    const localizationScope = {
      name,
      currency,
      get localizedCurrency() {
        return getLocalization(currency, localizationScope);
      },
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
          {
            getLocalization('propertyLabel', localizationScope)
          }
        </label>
        <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
          <select
            onChange={handleSelectInputValueChange}
            className="form-control"
            value={getOptionValue(options[selectedOptionIndex])}
          >
            {
              generateOptionsSelectionList(
                options, getLocalization, currency, localizationScope,
              )
            }
          </select>
        </div>
      </div>
    );
  }
}
