/**
 * @flow
 * @namespace helpers
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 */

import React from 'react';
import { animateScroll } from 'react-scroll';

import type {
  DefaultLinkComponentProps,
} from './types';

/**
 * @typedef {Object} StyleConfig
 */
export type StyleConfig = {
  enabled?: boolean,
  duration?: number,
};

/** @ */
export type ReactStatelessComponent = (props: Object) => React$Element<*>;

/**
 * @memberof helpers
 */
export const generateStyle = (
  {
    enabled = true,
    duration = 1000,
    ...rest
  }: StyleConfig = {},
): Object =>
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
export const animate = (options: StyleConfig | number): Object =>
  generateStyle(
    typeof options === 'object'
    ? options
    : { duration: options, },
  );

/**
 * @memberof helpers
 */
export const configure = (
  Component: Function,
  configuration: Object,
): ReactStatelessComponent => {
  const Configured: ReactStatelessComponent =
    props =>
      <Component {...configuration} {...props} />;
  Configured.displayName = 'Configured';
  return Configured;
};

/**
 * @memberof helpers
 */
export const isNaturalNumber = (num: number): boolean =>
  Number.isSafeInteger(num) && num > -1;

/**
 * @memberof helpers
 */
export const parseInteger = (num: string): number => {
  if (/^\d*$/.test(num))
    return Number.parseInt(num, 10) || 0;
  else return NaN;
};

/**
 * @memberof helpers
 */
export const getAbsoluteOffsetTop = (
  { offsetTop, offsetParent, }: HTMLElement = {},
): number =>
  offsetTop + (
    offsetParent
    && offsetParent instanceof HTMLElement
    && getAbsoluteOffsetTop(offsetParent)
  );

/**
 * @memberof helpers
 * key in format id/_property1-valueOfProperty1 etc
 */
export const generateProductKey = (
  id: string,
  properties: {
    [propertyName: string]: string | number,
  },
): string =>
  Object
    .entries(properties)
    .reduce((acc: string, [ propName, propValue, ]) =>
      `${acc}_${propName}-${String(propValue)}`
    , `${id}/`);

/**
 * @memberof helpers
 */
export const DefaultLinkComponent = (
  { to, ...otherProps }: DefaultLinkComponentProps,
): React$Element<*> =>
  <a {...otherProps} href={to} />;

export const scrollFunction = (
  target: EventTarget,
  scrollPosition: number | (currentTarget: Element) => number,
  scrollAnimationConfig: Object,
) => void (
  target instanceof Element
  && animateScroll.scrollTo(
    typeof scrollPosition === 'function'
    ? scrollPosition(target)
    : scrollPosition,
    scrollAnimationConfig,
  )
);
