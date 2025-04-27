[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Hooks/Product](../README.md) / useGetProductById

# Function: useGetProductById()

> **useGetProductById**\<`T`\>(`productId`): `object`

Defined in: [src/ui/hooks/prod/useGetProductById.tsx:78](https://github.com/yourusername/webshop_asztali/blob/db527a672c3f1c86910ae6dbab32f3919e7d7093/src/ui/hooks/prod/useGetProductById.tsx#L78)

Custom hook for fetching a product by ID

 useGetProductById

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

### product

> **product**: `null` \| `T`

### loading

> **loading**: `boolean`

### error

> **error**: `null` \| `string`

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

## Example

```ts
const { product, loading, error, refetch } = useGetProductById<Processor>(123);

if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>{error}</div>;
}

return <ProductDetails product={product} />;
```
