
#React shopping cart

Shopping cart package provides several components:
- __Cart__
- __Product__
- __CheckoutButton__

which can be used separately or in union.
By default [__Redux__](https://github.com/reactjs/redux) is the framework to operate data.

So, it's your choice to use Redux or not, but its reducers, actions and actionTypes are already included.

**Meta**

-   **author**: Oleg Nosov &lt;olegnosov1@gmail.com>
-   **license**: MIT

##Demo

Live demo: [`https://www.solarleague.org/shop/macbook-case/`](https://www.solarleague.org/shop/macbook-case/)

**Usage**
```shell
npm install --save react-shopping-cart
```

**Examples**

In all cases you must include bootstrap_v4.css in your project
```javascript
import 'bootstrap/dist/css/bootstrap.css';
```
And if you want to see animation, also include animate.css
```javascript
import 'animate.css/animate.min.css';
```

__And create your data structures according to types in cart:__

__Look at TYPES.md or types.js in src folder__


With Redux
```javascript
// App.js
import { Cart, Product, CheckoutButton } from 'react-shopping-cart';

<Product
  options={{
    colour: ['red', 'green'],
  }}
  name="iPad / Tablet case"
  price={70}
  path="/shop/ipad-case/"
  imagePath="1-483x321.jpeg"
/>

<Cart productPropsToShow={['colour']} />;

// In reducers.js
import { combineReducers } from 'redux';
import { cartReducer } from 'react-shopping-cart';

export default combineReducers(
  {
    cart: cartReducer,
    // your own reducers here
  }
);

// You also may import actions and actionTypes

import { cartActions, cartActionTypes } from 'react-shopping-cart';

// And do some cool things with them
```

Without redux
```javascript
import { CartComponent, ProductComponent, CheckoutButtonComponent } from 'react-shopping-cart';

<ProductComponent
  options={{
    colour: ['red', 'green'],
  }}
  name="iPad / Tablet case"
  price={70}
  path="/shop/ipad-case/"
  imagePath="1-483x321.jpeg"
  onAddProduct={
    (id, { quantity, productInfo, properties }) => // Hmm, product wants to be in cart
  }
  CheckoutButton={ <a /> }
/>

<CartComponent
  products={ products }
  onUpdateProduct={
    (key, updateProps) => // Update something
  }
  onRemoveProduct={
    (key) => // Remove something
  }
  CheckoutButton={
    <a />
  }
  isCartEmpty={
    false
  }
/>

<CheckoutButtonComponent
  grandTotal={500}
  hidden={false}
  checkoutURL="/to/my/checkout"
/>

```

# Cart

## containerPropTypes

**Properties**

-   `products` **Object&lt;string, ProductType&gt;** Products map. Required
-   `onUpdateProduct` **Function&lt;string, Object&gt;** Callback
    function which will be called when product should be updated.
    First arg is product's key in products, second - props to update.
    For instance, it may be called like:
    onUpdateProduct('/shop/macbook-case/_red', { quantity : 50});
    Required.
-   `onRemoveProduct` **Function&lt;string&gt;** Callback to call
    when need to remove product from products. Accept product's key in products.
    For example: onRemoveProduct('/shop/macbook-case/_red');
    Required.

## propTypes

**Properties**

-   `productPropsToShow` **Array&lt;string&gt;** Array of product's
    props which need to be shown in cart.
    Default is ['colour', 'size']
-   `showHeader` **boolean** Show or hide header 'Shopping cart'.
    Default is true
-   `iconTrashClassName` **string** ClassName for trash icon on remove button.
    Default is 'icon-trash'

# CheckoutButton

## containerPropTypes

**Properties**

-   `grandTotal` **number** Amount of money to pay. Required
-   `hidden` **boolean** Show or hide button. Required

## propTypes

**Properties**

-   `checkoutURL` **string** Link to checkout page.
    Default is '/shop/checkout/'
-   `iconCheckoutClassName` **string** ClassName for cart icon on checkout button.
    Default is 'icon-basket'

# Product

## containerPropTypes

**Properties**

-   `onAddProduct` **Function&lt;string&gt;** Callback to call when
    user want to add product in his cart
    Example: onAddProduct('macbook-case', { quantity: 30, properties: { colour: 'red' } });
    Required.

## propTypes

**Properties**

-   `name` **string** Name to display. Required
-   `path` **string** Path to product. Required
-   `price` **number** Price (value only). Required
-   `imagePath` **string** Path to main image. Required
-   `currency` **string** Price currency. Default is £
-   `options` **Object&lt;string, Array&lt;string or number&gt;&gt;** Custom product properties.
    Default is {}
-   `iconAddProductClassName` **string** ClassName for cart icon on add to button.
    Default is 'icon-cart-plus'

# Types

## CartType

**Properties**

-   `total` **number** Grand total
-   `summary` **string** Readable stringified cart
-   `products` **Object&lt;string, ProductType&gt;** Products map

## ProductInfoType

**Properties**

-   `name` **string** Display name
-   `price` **number** Price (only value)
-   `currency` **string** Price currency
-   `imagePath` **string** Path to main image

## ProductsMapType

**Properties**

-   `productKey` **ProductType** Pair (productKey: product)

## ProductType

**Properties**

-   `id` **string** MUST BE PATH TO PRODUCT'S PAGE (!!!)
-   `quantity` **number** 
-   `properties` **Object&lt;string, string or number&gt;** Custom product properties.
    In order to make prop visible in cart, add its name
    to productPropsToShow array
-   `productInfo` **ProductInfoType** 

**Examples**

```javascript
{
   id: '/shop/macbook-case/',
   quantity: 3,
   properties: {
     colour: 'red'
   },
   productInfo: {
     name: 'Macbook case',
     price: 80,
     currency: '£',
     imagePath: '/shop/macbook-case/1-483x321.jpeg'
   }
 }
```


##Development

**Build**

```shell
npm run build
```
And then check dist folder


**Testing**

[Jest](https://github.com/facebook/jest) is used for tests
```shell
npm run test
```

**Linter**

[ESLint](https://github.com/eslint/eslint) is used as linter
```shell
npm run lint
```

**Flow Type**

Check types in project using [Flow](https://github.com/facebook/flow)
```shell
npm run flow
```

**Autodoc**

Generate doc using [documentation js](https://github.com/documentationjs/documentation)
```shell
npm run doc
```
And then look at README.md
