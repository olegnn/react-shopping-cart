/**
 * @flow weak
 * @namespace helpers
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 */
import React from 'react';

/**
 * @memberof helpers
 */
const generateStyle = (
  {
    enabled = true,
    duration = 1000,
    ...rest
  } = {},
) : Object =>
  enabled
    ? {
      WebkitAnimationDuration: `${duration / 1000}s`,
      animationDuration: `${duration / 1000}s`,
      WebkitAnimationFillMode: 'both',
      animationFillMode: 'both',
      ...rest,
    }
    : {};

/**
 * @memberof helpers
 */
export const animate = (options : Object | number) : Object =>
  generateStyle(typeof options === 'object' ? options : { duration: options });

/**
 * @memberof helpers
 */
export const configure = (
  Component : Function,
  configuration : Object,
) : Function =>
    (props : Object) : React$Element<any> =>
      <Component {...configuration} {...props} />;

/**
 * @memberof helpers
 */
export const isNaturalNumber = (num : number) : boolean =>
  Number.isSafeInteger(num) && num > -1;

/**
 * @memberof helpers
 */
export const getAbsoluteOffsetTop = (
    { offsetTop, offsetParent } : HTMLElement | Object = {},
  ) : number =>
    offsetTop + (offsetParent && getAbsoluteOffsetTop(offsetParent));

/**
 * @memberof helpers
 * key in format id/_property1-valueOfProperty1 etc
 */
export const generateProductKey = (
  id : string,
  properties : {
    [propertyName : string] : string | number,
  },
) : string =>
  Object
    .entries(properties)
    .reduce((acc : string, [propName, propValue]) =>
      `${acc}_${propName}-${propValue}`
    , `${id}/`);
