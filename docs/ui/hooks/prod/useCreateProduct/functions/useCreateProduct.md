[**WebShop Asztali Documentation v0.0.0**](../../../../../README.md)

***

[WebShop Asztali Documentation](../../../../../modules.md) / [ui/hooks/prod/useCreateProduct](../README.md) / useCreateProduct

# Function: useCreateProduct()

> **useCreateProduct**(): `object`

Defined in: [src/ui/hooks/prod/useCreateProduct.tsx:203](https://github.com/yourusername/webshop_asztali/blob/966ac422304bbbe6308f4e6c123a88355a82fe82/src/ui/hooks/prod/useCreateProduct.tsx#L203)

Hook for creating new products

## Returns

Object containing creation function and state

### createProduct()

> **createProduct**: (`productData`) => `Promise`\<`any`\>

Create a new product

This function handles the API call to create a new product and manages
loading states and error handling. It automatically logs out
the user if an authentication error occurs.

#### Parameters

##### productData

`ProductType`

The product data to create

#### Returns

`Promise`\<`any`\>

Created product data

#### Throws

If product creation fails

Error handling includes:
- Network errors
- Authentication errors (401)
- Invalid data errors (400)
- Server errors (500)
- Other unexpected errors

### loading

> **loading**: `boolean`

### error

> **error**: `null` \| `string`
