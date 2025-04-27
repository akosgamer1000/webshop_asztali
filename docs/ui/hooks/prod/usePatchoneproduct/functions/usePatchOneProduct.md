[**WebShop Asztali Documentation v0.0.0**](../../../../../README.md)

***

[WebShop Asztali Documentation](../../../../../modules.md) / [ui/hooks/prod/usePatchoneproduct](../README.md) / usePatchOneProduct

# Function: usePatchOneProduct()

> **usePatchOneProduct**(): `object`

Defined in: [src/ui/hooks/prod/usePatchoneproduct.tsx:51](https://github.com/yourusername/webshop_asztali/blob/db527a672c3f1c86910ae6dbab32f3919e7d7093/src/ui/hooks/prod/usePatchoneproduct.tsx#L51)

Hook for updating product prices

## Returns

Object containing update function and state

### updateProductPrice()

> **updateProductPrice**: (`productId`, `newPrice?`, `newQuantity?`) => `Promise`\<`any`\>

Update product price

This function handles the API call to update a product's price and manages
loading states and error handling. It automatically logs out
the user if an authentication error occurs.

#### Parameters

##### productId

`number`

ID of the product to update

##### newPrice?

`number`

New price for the product

##### newQuantity?

`number`

#### Returns

`Promise`\<`any`\>

Updated product data or null if update failed

Error handling includes:
- Network errors
- Authentication errors (401)
- Not found errors (404)
- Invalid data errors (400)
- Server errors (500)
- Other unexpected errors

### loading

> **loading**: `boolean`

### error

> **error**: `null` \| `string`

### success

> **success**: `boolean`
