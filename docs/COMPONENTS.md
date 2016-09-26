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
