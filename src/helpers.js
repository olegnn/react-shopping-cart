/**
 * @flow weak
 * @namespace helpers
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 */
import React from 'react';

/*-----------------------------------------------------------------
 * Animate Utility
 *
 * Copyright © Roman Nosov 2016
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

function style({ enabled = true, duration = 1000, ...rest } = {}) {
  return enabled ? {
    WebkitAnimationDuration: `${duration / 1000}s`,
    animationDuration: `${duration / 1000}s`,
    WebkitAnimationFillMode: 'both',
    animationFillMode: 'both',
    ...rest,
  }
  : {}
  ;
}

/**
 * @memberof helpers
 */
export function animate(options : Object) : Object {
  return style(isNaN(options) ? options : { duration: options });
}
//-------------------------------------------------------------------

/**
 * @memberof helpers
 */
export const configure = (
  Component : Function,
  configuration : Object
) : Function =>
    (props : Object) : React$Element<any> =>
      <Component { ...configuration } { ...props } />;
