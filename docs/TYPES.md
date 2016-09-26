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
