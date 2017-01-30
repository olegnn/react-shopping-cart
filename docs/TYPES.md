# Types

Redux cart data types file

**Meta**

-   **author**: Oleg Nosov &lt;olegnosov1@gmail.com>
-   **license**: MIT

## ProductInfoType

**Properties**

-   `name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Display name
-   `prices` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** Object contains { [currency]&#x3A; price } pairs
-   `imagePath` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path to main image
-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Link to product's page
-   `propertiesToShowInCart` **\[[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>]** Array
    of names of properties which need to be shown in cart

## ProductType

**Properties**

-   `id` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `quantity` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `properties` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [ProductPropertyOptionType](#productpropertyoptiontype)>** Custom product properties.
    In order to make prop visible in cart, add its name
    to productPropsToShow array
-   `productInfo` **ProductInfoType** 

**Examples**

```javascript
{
   id: 'macbook-case',
   quantity: 3,
   properties: {
     colour: 'red'
   },
   productInfo: {
     name: 'Macbook case',
     prices: {
      GBP: 50
     },
     path: '/shop/macbook-case/',
     imagePath: '/shop/macbook-case/1-483x321.jpeg',
     propertiesToShowInCart: ['colour']
   }
 }
```

## ProductsMapType

**Properties**

-   `productKey` **ProductType** Pair (productKey: product)

## CartType

**Properties**

-   `total` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Grand total
-   `summary` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Readable stringified cart
-   `products` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), ProductType>** Products map

# ProductPropertyOptionType
