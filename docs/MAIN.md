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
