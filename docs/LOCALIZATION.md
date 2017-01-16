## Localization

In order to localize your cart, you can chose one of the possible ways:
-Create your own __getLocalization__ func and pass it as props to the cart's components
-Use __getLocalization__ or __getDefaultLocalization__ funcs from _localization_ module
-Don't do anything and see only default language in your cart

The first one should be look like that if you use intl-messageformat (or something like it)

```
  const localization = {
    hey: 'Hey, {name}!'
  };
  getLocalization = (id, params = {}) =>  
    new IntlMessageFormat(localization[id], language).format(params);
```
__getLocalization__ API:
id - templateID. Default localization includes:
-_cart:_
  -shoppingCartTitle
  -productName {name}
  -quantityLabel {quantity}
  -priceLabel {price}
  -priceValue {price}
  -totalLabel {total}
  -totalValue {total}
  -remove
  -productPropertyLabel {name, value}
  -productPropertyValue {name, value}
-_checkoutButton_
  -checkoutTotal
-_product_  
  -price
  -quantityLabel
  -propertyLabel
  -addToCart
Components also will try to get localization for all of property names and values (string type only), which you passed to products,
