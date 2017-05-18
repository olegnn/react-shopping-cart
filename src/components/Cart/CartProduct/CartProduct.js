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

import React, { Component } from 'react';

import type {
  InputEvent,
  Link$Component,
  ProductData,
  ProductProperties,
  UpdateProduct,
  RemoveProduct,
  GetLocalization,
} from '../../../types';

import ProductPropertyDescription
  from './ProductPropertyDescription/ProductPropertyDescription';
import {
  isNaturalNumber,
  parseInteger,
} from '../../../helpers';

/**
 * @memberof CartProduct
 * @typedef {Object} Props
 */
export type Props = {
  product: ProductData,
  productKey: string,
  quantity: number,
  name: string,
  price: number,
  currency: string,
  properties: ProductProperties,
  propertiesToShow: Array<string>,
  imagePath: string,
  path: string,
  iconTrashClassName: string,
  onRemoveProduct: RemoveProduct,
  onUpdateProduct: UpdateProduct,
  getLocalization: GetLocalization,
  linkComponent: Link$Component,
};

const defaultProps = {
  properties: {},
  propertiesToShow: [],
};

export default class
  CartProduct extends Component<typeof defaultProps, Props, void> {

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
        (acc, [ propName, propValue, ]) => [
          ...acc, ...(
          propertiesToShow.includes(propName)
          ? [
            <ProductPropertyDescription
              key={propName}
              name={propName}
              value={propValue}
              getLocalization={getLocalization}
            />,
          ]
          : []
        ), ]
    , []);

  handleRemoveProductClick = () =>
    void this.props.onRemoveProduct(
        this.props.productKey,
    );

  handleQuantityValueChange = (
    { currentTarget, }: InputEvent,
  ) => {
    const quantity = parseInteger(currentTarget.value);
    const {
      onUpdateProduct,
      productKey,
      product,
      quantity: currentQuantity,
    } = this.props;
    if (isNaturalNumber(quantity) && quantity !== currentQuantity)
      onUpdateProduct(
        productKey, { ...product, quantity, },
      );
  };

  render() {
    const {
      handleQuantityValueChange,
      handleRemoveProductClick,
      props,
    } = this;

    const {
      name,
      imagePath,
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
          'list-group-item list-group-item-action ' +
          'align-items-start animated'
        }
      >
        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-3">
          <LinkComponent to={path}>
            <div className="list-group-item-heading">
              { getLocalization('productName', localizationScope) }
            </div>
            <img className="img-fluid" src={imagePath} />
          </LinkComponent>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-7">
          <div className="form-group row">
            <label
              htmlFor="quantity"
              className="col-xs-6 col-md-5 col-lg-4 col-form-label"
            >
              { getLocalization('quantityLabel', localizationScope) }
            </label>
            <div className="col-xs-6 col-md-7 col-lg-8">
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
          <div className="form-group row">
            <label
              htmlFor="price"
              className="col-xs-6 col-md-5 col-lg-4 col-form-label"
            >
              {
                getLocalization(
                  'priceLabel', localizationScope,
                )
              }
            </label>
            <div className="col-xs-6 col-md-7 col-lg-8 col-form-label">
              {
                getLocalization(
                  'priceValue', localizationScope,
                )
              }
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="total"
              className="col-xs-6 col-md-5 col-lg-4 col-form-label"
            >
              {
                getLocalization(
                  'totalLabel', localizationScope,
                )
              }
            </label>
            <div className="col-xs-6 col-md-7 col-lg-8 col-form-label">
              {
                getLocalization(
                  'totalValue', localizationScope,
                )
              }
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-2">
          <div className="form-group row">
            <div className="col-12 text-center">
              <button
                className="btn btn-danger active form-control"
                role="button"
                onClick={handleRemoveProductClick}
              >
                <i className={iconTrashClassName} />
                {
                  getLocalization(
                    'remove', localizationScope,
                  )
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
