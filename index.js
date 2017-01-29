module.exports = {
  Cart: require('./dist/containers/Cart'),
  Product: require('./dist/containers/Product'),
  CheckoutButton: require('./dist/containers/CheckoutButton'),
  CartComponent: require('./dist/components/Cart/Cart'),
  ProductComponent: require('./dist/components/Product/Product'),
  CheckoutButtonComponent:
    require('./dist/components/CheckoutButton/CheckoutButton'),
  cartActions: require('./dist/actions'),
  cartActionTypes: require('./dist/actionTypes'),
  cartReducer: require('./dist/reducers/cart'),
  cartSelectors: require('./dist/selectors'),
  cartHelpers: require('./dist/helpers'),
  cartLocalization: require('./dist/localization'),
  setCartCurrency: require('./dist/actions').setCartCurrency,
};
