import React, { Component, PropTypes } from 'react';


/*
 * Return form-group consits of select input element
 * label value will be capitalized name
 * options - the options array
 */
export default class ProductPropertyInput extends Component {

  /*
   * Generate select input options based on options values
   */
  static generateOptionsSelectionList(options, getLocalization) {
    return options.map(optionValue =>
      <option key={optionValue} value={optionValue}>
        {
          typeof optionValue === 'string'
          ? getLocalization(
              optionValue,
            )
          : optionValue
        }
      </option>,
    );
  }

  handleSelectInputValueChange = (
    { target: { value: optionName } } : { target : HTMLInputElement, },
  ) => {
    const {
      name,
      options,
      onChange
    } = this.props;
    onChange({
      value: { [name]: options.indexOf(optionName) },
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

    const localizedName = getLocalization(name);

    return (
      <div className="form-group row">
        <label
          htmlFor={name}
          className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label"
        >
          {
            getLocalization('propertyLabel', {
              name: localizedName,
            })
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
                options, getLocalization,
              )
            }
          </select>
        </div>
      </div>
    );
  }
}
