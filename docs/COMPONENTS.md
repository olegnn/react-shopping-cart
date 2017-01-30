# Cart

**Extends React.PureComponent**

Component which represents shopping cart.

**Meta**

-   **author**: Oleg Nosov &lt;olegnosov1@gmail.com>
-   **license**: MIT

## propTypes

**Properties**

-   `showHeader` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Show or hide header 'Shopping cart'.
    Default is true
-   `iconTrashClassName` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** ClassName for
    trash icon on remove button.
    Default is 'icon-trash'
-   `cartTransition` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Cart's config for Transition.
    Default is
      {
        style: animate(500),
        enteringClassName: 'fadeInUp',
        exitingClassName: 'fadeOut',
        timeout: 500,
      }.
    Look at src/components/Cart/Cart.js for details
-   `cartItemTransition` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Cart item's config
    for ReactCSSTransitionGroup.
    Default is
      {
        transitionName: {
          enter: 'bounceInLeft',
          leave: 'bounceOutRight',
        },
        transitionEnterTimeout: 500,
        transitionLeaveTimeout: 500,
      }.
    Look at src/components/Cart/Cart.js for details

## containerPropTypes

**Properties**

-   `products` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), ProductType>** Products map. Required.
-   `CheckoutButton` **ReactElement** Button in the bottom of cart.
    Required.
-   `onUpdateProduct` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>** Callback
    function which will be called when product should be updated.
    First arg is product's key in products, second - props to update.
    For instance, it may be called like:
    onUpdateProduct('macbook-case/\_red', { quantity : 50 });
    Required.
-   `onRemoveProduct` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** Callback to call
    when need to remove product from products.
    Accept product's key in products.
    For example: onRemoveProduct('/shop/macbook-case/\_red');
    Required.
-   `getLocalization` **getLocalizationType** Required.

# Product

**Extends React.PureComponent**

React component - Product form with price.

**Meta**

-   **author**: Oleg Nosov &lt;olegnosov1@gmail.com>
-   **license**: MIT

## propTypes

**Properties**

-   `name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Name to display. Required
-   `id` **id** Product's id. Required
-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path to product. Required
-   `prices` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** Prices (currency-value). Required
-   `imagePath` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path to main image. Required
-   `currency` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Price currency. Required
-   `properties` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;(ProductPropertyOptionType)>>** Custom product properties. May be array of number, string or
    shape({ additionalCost(optional), onSelect(optional), value(required)})
    Default is {}
-   `iconAddProductClassName` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** ClassName for cart icon
    on add to button.
    Default is 'icon-cart-plus'

## containerPropTypes

**Properties**

-   `CheckoutButton` **ReactElement** Button in the bottom of product.
    Required.
-   `onAddProduct` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** Callback to call when
    user want to add product in his cart
    Example:
    onAddProduct(
      'macbook-case',
      { quantity: 30, properties: { colour: 'red' } },
      'GBP'
    );
    Required.
-   `getLocalization` **getLocalizationType** Required.
-   `generateProductKey` **generateProductKey** Function which generates
    product's key based on id and properties. Example:
    generateProductKey('macbook-case', { colour: 'red'} ).

# CheckoutButton

**Extends React.PureComponent**

Checkout button with grand total.

**Meta**

-   **author**: Oleg Nosov &lt;olegnosov1@gmail.com>
-   **license**: MIT

## propTypes

**Properties**

-   `checkoutURL` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Link to checkout page.
    Required
-   `iconCheckoutClassName` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** ClassName
    for cart icon on checkout button.
    Default is 'icon-basket'
-   `transitionConfig` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** CheckoutButton's transition config
    for react-overlays Transition.
    Default is {
      style: animate(500),
      enteringClassName: 'fadeInUp',
      exitingClassName: 'fadeOut',
      timeout: 500,
      unmountOnExit: true,
    }

## containerPropTypes

**Properties**

-   `grandTotal` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Amount of money to pay. Required.
-   `hidden` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Show or hide button. Required.
-   `currency` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Current cart currency. Required.
-   `getLocalization` **getLocalizationType** Required.
