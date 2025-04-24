[**WebShop Asztali Documentation v0.0.0**](../../../../../README.md)

***

[WebShop Asztali Documentation](../../../../../modules.md) / [ui/hooks/prod/useGetProductById](../README.md) / default

# Function: default()

> **default**\<`T`\>(`productId`): `object`

Defined in: [src/ui/hooks/prod/useGetProductById.tsx:55](https://github.com/akosgamer1000/webshop_asztali/blob/694dfb5919995863486557fe9c75abb7edf40a6c/src/ui/hooks/prod/useGetProductById.tsx#L55)

## Type Parameters

### T

`T` *extends* `Product`

Type that extends the base Product interface

## Parameters

### productId

`number`

ID of the product to fetch

## Returns

Object containing product data and state

### error

> **error**: `null` \| `string`

### loading

> **loading**: `boolean`

### product

> **product**: `null` \| `T`

### refetch()

> **refetch**: () => `Promise`\<`void`\> = `fetchProduct`

Fetch product details from the server

This function handles the API call to fetch a single product and manages
loading states and error handling. It automatically logs out
the user if an authentication error occurs.

Error handling includes:
- Network errors
- Authentication errors (401)
- Not found errors (404)
- Server errors (500)
- Other unexpected errors

#### Returns

`Promise`\<`void`\>
