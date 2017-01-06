import React, { PropTypes } from 'react';
import capitalize from 'underscore.string/capitalize';

const
  propTypes = {
    propName: PropTypes.string.isRequired,
    propValue: PropTypes.oneOfType(
      [
        PropTypes.string,
        PropTypes.number,
      ],
    ).isRequired,
  },
  defaultProps = {

  };

export default function CartProductDescription({
  propName,
  propValue,
}) {
  return (
    <div className="form-group row">
      <label
        htmlFor={propName}
        className="col-xs-6 col-md-5 col-lg-4 col-form-label"
      >
        { capitalize(propName) }:
      </label>
      <div className="col-xs-6 col-md-7 col-lg-8 col-form-label">
        { capitalize(propValue) }
      </div>
    </div>
  );
}

Object.assign(CartProductDescription, { propTypes, defaultProps });
