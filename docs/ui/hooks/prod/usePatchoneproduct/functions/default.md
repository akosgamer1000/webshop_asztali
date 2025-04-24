[**WebShop Asztali Documentation v0.0.0**](../../../../../README.md)

***

[WebShop Asztali Documentation](../../../../../modules.md) / [ui/hooks/prod/usePatchoneproduct](../README.md) / default

# Function: default()

> **default**(): `object`

Defined in: [src/ui/hooks/prod/usePatchoneproduct.tsx:31](https://github.com/akosgamer1000/webshop_asztali/blob/694dfb5919995863486557fe9c75abb7edf40a6c/src/ui/hooks/prod/usePatchoneproduct.tsx#L31)

```

@returns {Object} Object containing update function and state
@property {(productId: number, newPrice: number) => Promise<any>} updateProductPrice - Function to update product price
@property {boolean} loading - Loading state indicator
@property {string | null} error - Error message if any
@property {boolean} success - Success state indicator

## Returns

### error

> **error**: `null` \| `string`

### loading

> **loading**: `boolean`

### success

> **success**: `boolean`

### updateProductPrice()

> **updateProductPrice**: (`productId`, `newPrice?`, `newCouantity?`) => `Promise`\<`any`\>

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

##### newCouantity?

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
