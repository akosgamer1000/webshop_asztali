[**WebShop Asztali Documentation v0.0.0**](../../../../README.md)

***

[WebShop Asztali Documentation](../../../../modules.md) / [UI/Hooks/Product](../README-1.md) / useProducts

# Function: useProducts()

> **useProducts**(): `object`

Defined in: [src/ui/hooks/prod/useProducts.tsx:78](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/hooks/prod/useProducts.tsx#L78)

Custom hook for fetching and managing products

 useProducts

## Returns

`object`

Object containing products data and management functions

### products

> **products**: `ProductData`[]

### loading

> **loading**: `boolean`

### error

> **error**: `null` \| `string`

### refetch()

> **refetch**: () => `Promise`\<`void`\> = `fetchProducts`

#### Returns

`Promise`\<`void`\>

## Example

```ts
const { products, loading, error, refetch } = useProducts();

if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>{error}</div>;
}

return (
  <ProductList 
    products={products} 
    onRefresh={refetch} 
  />
);
```
