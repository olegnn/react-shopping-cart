/**
 * @flow
 * @module CartProduct
 * @extends React.PureComponent
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * React component to display product in cart.
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';

import type {
  InputEvent,
  Link$Component,
  ProductData,
  ProductProperties,
  UpdateProduct,
  RemoveProduct,
  GetLocalization,
} from '../../../types';

import ProductPropertyLabel
  from './ProductPropertyLabel/ProductPropertyLabel';
import {
  fixInputValueStartingWithZero,
  isNaturalNumber,
  parseInteger,
} from '../../../helpers';

export type Props = {|
  product: ProductData,
  productKey: string,
  quantity: number,
  name: string,
  price: number,
  currency: string,
  properties?: ProductProperties,
  propertiesToShow?: Array<string>,
  imageSrc: string,
  altImageSrc: string,
  path: string,
  iconTrashClassName: string,
  onRemoveProduct: RemoveProduct,
  onUpdateProduct: UpdateProduct,
  getLocalization: GetLocalization,
  linkComponent: Link$Component,
|};

const defaultProps = {
  properties: {},
  propertiesToShow: [],
};

export default class CartProduct
  extends PureComponent<Props, void> {
  props: Props;

  static defaultProps = defaultProps;

  static displayName = 'CartProduct';

  /*
   * Create form-group for each of properties which is in propertiesToShow
   * array
   */
  static generateProductDescription = (
    properties: ProductProperties,
    propertiesToShow: Array<string>,
    getLocalization: GetLocalization,
  ): Array<React$Element<*>> =>
    Object
      .entries(properties)
      .reduce(
        (acc, [ name, value, ]) => {
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

          return [
            ...acc,
            ...(
              propertiesToShow.includes(name)
                ? [
                  <ProductPropertyLabel
                    key={name}
                    name={
                      getLocalization('productPropertyLabel', localizationScope)
                    }
                    value={
                      getLocalization('productPropertyValue', localizationScope)
                    }
                  />,
                ]
                : []
            ),
          ];
        }
        , [],
      );

  handleRemoveProductClick = () =>
    void this.props.onRemoveProduct(this.props.productKey);

  handleQuantityValueChange = ({ currentTarget, }: InputEvent) => {
    const quantity = parseInteger(currentTarget.value);
    const natural = isNaturalNumber(quantity);
    const {
      onUpdateProduct,
      productKey,
      product,
      quantity: currentQuantity,
    } = this.props;

    if (natural) {
      fixInputValueStartingWithZero(currentTarget, quantity);
      if (quantity !== currentQuantity)
        onUpdateProduct(productKey, { ...product, quantity, });
    }
  };

  render() {
    const {
      handleQuantityValueChange,
      handleRemoveProductClick,
      props,
    } = this;

    const {
      name,
      imageSrc,
      altImageSrc,
      path,
      quantity,
      currency,
      price,
      properties,
      propertiesToShow,
      iconTrashClassName,
      getLocalization,
      linkComponent: LinkComponent,
    } = props;

    const {
      generateProductDescription,
    } = CartProduct;

    const total = price * quantity;

    const localizationScope = {
      quantity,
      price,
      total,
      currency,
      name,
      get localizedName() {
        return getLocalization(name, localizationScope);
      },
      get localizedCurrency() {
        return getLocalization(currency, localizationScope);
      },
    };

    return (
      <div
        className={
          classNames(
            'list-group-item', 'list-group-item-action',
            'align-items-start', 'animated',
          )
        }
      >
        <div className="row align-items-start">
          <div className={
            classNames(
              'col-12', 'col-sm-12', 'col-md-4',
              'col-lg-4', 'col-xl-3', 'my-1',
            )
          }
          >
            <LinkComponent to={path}>
              <div className="list-group-item-heading">
                { getLocalization('productName', localizationScope) }
              </div>
              <img className="img-fluid" src={imageSrc} alt={altImageSrc} />
            </LinkComponent>
          </div>
          <div className={
            classNames(
              'col-12', 'col-sm-12', 'col-md-5',
              'col-lg-5', 'col-xl-7',
            )
          }
          >
            <div className="form-group row">
              <label
                htmlFor="quantity"
                className="col-6 col-md-5 col-lg-4 col-form-label"
              >
                { getLocalization('quantityLabel', localizationScope) }
              </label>
              <div className="col-6 col-md-7 col-lg-8">
                <input
                  type="number"
                  className="form-control"
                  value={quantity}
                  onChange={handleQuantityValueChange}
                />
              </div>
            </div>
            {
              generateProductDescription(
                properties,
                propertiesToShow,
                getLocalization,
              )
            }
            <ProductPropertyLabel
              name={
                getLocalization('priceLabel', localizationScope)
              }
              value={
                getLocalization('priceValue', localizationScope)
              }
            />
            <ProductPropertyLabel
              name={
                getLocalization('totalLabel', localizationScope)
              }
              value={
                getLocalization('totalValue', localizationScope)
              }
            />
          </div>
          <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-2">
            <div className="form-group row">
              <div className="col-12 text-center">
                <button
                  className="btn btn-danger form-control"
                  role="button"
                  type="button"
                  onClick={handleRemoveProductClick}
                >
                  <i className={iconTrashClassName} />
                  <span>
                    { getLocalization('remove', localizationScope) }
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
