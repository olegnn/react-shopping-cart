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
import React, { PureComponent, PropTypes } from 'react';

import ProductPropertyDescription
  from './ProductPropertyDescription/ProductPropertyDescription';
import { isNaturalNumber } from '../../../helpers';

const
  propTypes = {
    product: PropTypes.object.isRequired,
    productKey: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    properties: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    ),
    propertiesToShow: PropTypes.arrayOf(
      PropTypes.string,
    ),
    imagePath: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    iconTrashClassName: PropTypes.string.isRequired,
    onRemoveProduct: PropTypes.func.isRequired,
    onUpdateProduct: PropTypes.func.isRequired,
    getLocalization: PropTypes.func.isRequired,
    linkComponent: PropTypes.func,
  },
  defaultProps = {
    properties: {},
    propertiesToShow: [],
  };

export default class CartProduct extends PureComponent {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  /*
   * Create form-group for each of properties which is in propertiesToShow
   * array
   */
  static generateProductDescription = (
    properties : {
      [propName : string]: number|string
    },
    propertiesToShow: Array<string>,
    getLocalization: Function,
  ) : Array<React$Element<any>> =>
    Object
      .entries(properties)
      .reduce(
        (acc, [propName, propValue]) => [
          ...acc, ...(
          propertiesToShow.indexOf(propName) + 1
          ? [
            <ProductPropertyDescription
              key={propName}
              name={propName}
              value={propValue}
              getLocalization={getLocalization}
            />,
          ]
          : []
        )]
    , []);

  handleRemoveProductClick = () =>
    void this.props.onRemoveProduct(
        this.props.productKey,
    );

  handleQuantityValueChange = (
    { target: { value } } : { target : HTMLInputElement },
  ) => {
    const quantity = +value;
    const {
      onUpdateProduct,
      productKey,
      product,
    } = this.props;
    /*
     * Check if quantity value is correct
     * and then update product
     */
    if (isNaturalNumber(quantity))
      onUpdateProduct(
        productKey, { ...product, quantity },
      );
  };

  render() {
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
    } = this.props;

    const {
      handleQuantityValueChange,
      handleRemoveProductClick,
    } = this;

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
            <div className="col-md-12 text-xs-center">
              <button
                className="btn btn-danger active form-control"
                role="button"
                onClick={handleRemoveProductClick}
              >
                <i className={iconTrashClassName} />
                { getLocalization('remove', localizationScope) }
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
