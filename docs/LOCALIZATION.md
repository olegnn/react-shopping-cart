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
__getLocalization__:
id - templateID. Default localization includes:
-_cart:_
  -shoppingCartTitle (no params)

  -productName
  -quantityLabel
  -priceLabel
  -priceValue
  -totalLabel
  -totalValue
  -remove
  with params     
  {
    quantity,
    price,
    total,
    currency,
    name,
    localizedName
    localizedCurrency
  }


  -productPropertyLabel
  -productPropertyValue
  with params {name, value, localizedName, localizedValue}
-_checkoutButton_
  -checkoutTotal with params {currency, total, localizedCurrency}
-_product_  
  -price
  -quantityLabel
  -propertyLabel
  -addToCart
  with params
  {
    name,
    quantity,
    price,
    currency,
    localizedCurrency
    localizedName
  }
Also you must provide localization for each product's name, product's property name, its' value(if string), currency
