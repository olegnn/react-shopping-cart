/**
 * @flow
 * @module ProductPropertyDescription
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * React stateless component to display product's description in cart.
 */
import React, { PropTypes } from 'react';

const
  propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType(
      [
        PropTypes.string,
        PropTypes.number,
      ],
    ).isRequired,
    getLocalization: PropTypes.func.isRequired,
  },
  defaultProps = {

  };

export default function ProductPropertyDescription({
  name,
  value,
  getLocalization,
} : {
  name : string,
  value : string | number,
  getLocalization : getLocalizationType,
}) {
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
      <label
        htmlFor={name}
        className="col-xs-6 col-md-5 col-lg-4 col-form-label"
      >
        {
          getLocalization(
            'productPropertyLabel', localizationScope,
          )
        }
      </label>
      <div className="col-xs-6 col-md-7 col-lg-8 col-form-label">
        {
          getLocalization(
            'productPropertyValue', localizationScope,
          )
        }
      </div>
    </div>
  );
}

ProductPropertyDescription.propTypes = propTypes;
ProductPropertyDescription.defaultProps = defaultProps;
