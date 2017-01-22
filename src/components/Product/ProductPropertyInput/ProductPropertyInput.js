/**
 * @flow
 * @module ProductPropertyInput
 * @extends React.Component
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * React form for product property(options select only).
 *
 */
import React, { Component, PropTypes } from 'react';

const
  propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    ).isRequired,
    selectedOptionIndex: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    getLocalization: PropTypes.func.isRequired,
  },
  defaultProps = {
    selectedOptionIndex: 0,
  };

export default class ProductPropertyInput extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  /*
   * Generate select input options based on options values
   */
  static generateOptionsSelectionList(
    options : Array<string | number>,
    getLocalization : getLocalizationType,
    localizationScope: Object = {},
  ) : Array<React$Element<any>> {
    return options.map(optionValue =>
      <option key={optionValue} value={optionValue}>
        {
          typeof optionValue === 'string'
          ? getLocalization(
              optionValue,
              localizationScope,
            )
          : optionValue
        }
      </option>,
    );
  }

  handleSelectInputValueChange = (
    value, params,
  ) => {
    const {
      name,
      options,
      onChange,
    } = this.props;

    onChange({
      value: { [name]: options.indexOf(value) },
    });
  };

  render() {
    const {
      name,
      options,
      selectedOptionIndex,
      getLocalization,
    } = this.props;

    const {
      handleSelectInputValueChange,
    } = this;

    const {
      generateOptionsSelectionList,
    } = ProductPropertyInput;

    const localizationScope = {
      name,
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
            value={options[selectedOptionIndex]}
          >
            {
              generateOptionsSelectionList(
                options, getLocalization, localizationScope,
              )
            }
          </select>
        </div>
      </div>
    );
  }
}
