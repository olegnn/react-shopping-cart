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
    propName: PropTypes.string.isRequired,
    propValue: PropTypes.oneOfType(
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
  propName,
  propValue,
  getLocalization,
} : {
  propName : string,
  propValue : string | number,
  getLocalization : getBoundLocalizationType,
}) {
  const localizedPropName = getLocalization(propName, { value: propValue }),
    localizedPropValue =
      typeof propValue === 'string'
             ? getLocalization(propValue)
             : propValue;
  return (
    <div className="form-group row">
      <label
        htmlFor={propName}
        className="col-xs-6 col-md-5 col-lg-4 col-form-label"
      >
        {
          getLocalization(
            'productPropertyLabel', {
              name: localizedPropName,
              value: localizedPropValue,
            },
          )
        }
      </label>
      <div className="col-xs-6 col-md-7 col-lg-8 col-form-label">
        {
          getLocalization(
            'productPropertyValue', {
              name: localizedPropName,
              value: localizedPropValue,
            },
          )
        }
      </div>
    </div>
  );
}

ProductPropertyDescription.propTypes = propTypes;
ProductPropertyDescription.defaultProps = defaultProps;
