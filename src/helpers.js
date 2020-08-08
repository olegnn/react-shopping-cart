/**
 * @flow
 * @namespace helpers
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 */

import React from "react";
import { animateScroll } from "react-scroll";

import type { GenerateProductKey, DefaultLinkComponentProps } from "./types";

/**
 * @memberof helpers
 */
export const configure = <Props>(
  Component: React$ComponentType<Props>,
  configuration: Object,
): React$ComponentType<Props> => {
  const Configured: React$ComponentType<Props> = (props) => (
    <Component {...configuration} {...props} />
  );
  const name = Component.name || Component.displayName;
  if (name) Configured.displayName = `Configured(${name})`;

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
  if (/^\d*$/.test(num)) return Number.parseInt(num, 10) || 0;
  else return NaN;
};

/**
 * @memberof helpers
 */
export function isObject(value: mixed): boolean %checks {
  return value != null && typeof value === "object";
}

/**
 * @memberof helpers
 */
export const getAbsoluteOffsetTop = ({
  offsetTop,
  offsetParent,
}: HTMLElement = {}): number =>
  offsetTop +
  (offsetParent &&
    offsetParent instanceof HTMLElement &&
    getAbsoluteOffsetTop(offsetParent));

/*
 * key in format id/_property1-valueOfProperty1 etc
 */
export const generateProductKey: GenerateProductKey = (id, properties) =>
  Object.entries(properties).reduce(
    (acc: string, [propName, propValue]) =>
      `${acc}_${propName}-${String(propValue)}`,
    `${id}/`,
  );

/**
 * @memberof helpers
 */
export const DefaultLinkComponent = ({
  to,
  ...otherProps
}: DefaultLinkComponentProps): React$Element<*> => (
  <a {...otherProps} href={to} />
);

/**
 * @memberof helpers
 */
export const fixInputValueStartingWithZero = (
  target: HTMLInputElement,
  quantity: number,
) => {
  if (/^0+\d+$/.test(target.value)) target.value = String(quantity);
};

/**
 * @memberof helpers
 */
export const scrollFunction = (
  target: EventTarget,
  scrollPosition: number | ((currentTarget: Element) => number),
  scrollAnimationConfig: Object,
) =>
  void (
    target instanceof Element &&
    animateScroll.scrollTo(
      typeof scrollPosition === "function"
        ? scrollPosition(target)
        : scrollPosition,
      scrollAnimationConfig,
    )
  );
